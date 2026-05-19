import React, { useEffect, useState, useRef } from 'react';
import {
  Send,
  AlertTriangle,
  Phone,
  ExternalLink,
  Info,
  Lock,
  FileText,
  Shield,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AthenaAvatar } from '../components/AthenaAvatar';
import { AthenaMessageBubble } from '../components/AthenaMessageBubble';
import { chatWithGroq, type ChatTurn } from '../data/groqClient';
import { evaluatePassword } from '../data/passwordStrength';
import { trackEvent } from '../lib/analytics';
import { detectLanguage, isOffTopicMessage } from '../services/athena/classifier';
import {
  looksLikePasswordCheck,
  shouldRunVerification
} from '../services/athena/routing';
import {
  formatPasswordReply,
  formatVerificationReport
} from '../services/athena/formatters';
import { knowledgeSources } from '../services/athena/knowledge';
import {
  parseAthenaReply,
  polishAthenaText,
  ATHENA_OFFLINE_EN,
  ATHENA_OFFLINE_TL,
  OFF_TOPIC_EN,
  OFF_TOPIC_TL
} from '../services/athena/geminiAthena';
import {
  runVerification,
  verificationContextForGroq
} from '../services/athena/verification';

type Message = {
  role: 'user' | 'athena';
  text: string;
  citations?: { title: string; url: string }[];
};

const EMERGENCY_RE =
  /(scammed|naloko|nabiktima|urgent|emergency|nawala.{0,20}pera|pera.{0,20}nawala|money.{0,20}(lost|stolen)|help.{0,30}scam|being scammed)/i;

export function Athena() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages, isTyping]);

  const quickActions = [
    {
      icon: AlertTriangle,
      label: 'Report Scam',
      prompt: 'How do I report a scam to PNP-ACG? Where do I file and what do I bring?'
    },
    {
      icon: Shield,
      label: 'Find Authorities',
      prompt: 'Who do I contact for cybercrime in Surigao del Sur?'
    },
    {
      icon: Phone,
      label: 'Emergency Help',
      prompt: 'This is urgent — I am being scammed right now. What do I do?'
    }
  ];

  const suggestedPrompts = [
    {
      icon: AlertTriangle,
      title: 'Check a suspicious SMS',
      prompt:
        'I received a text saying my bank account will be locked unless I verify my details. Is this a scam?'
    },
    {
      icon: Phone,
      title: 'I need urgent help',
      prompt: 'I think I am being scammed right now. What are the first steps?'
    },
    {
      icon: Lock,
      title: 'Protect my account',
      prompt: 'What are the best ways to secure my GCash account from hackers?'
    },
    {
      icon: FileText,
      title: 'Report a scam',
      prompt:
        'How do I report an online scam to the PNP Anti-Cybercrime Group?'
    }
  ];

  const handleSend = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isTyping) return;

    setMessages((prev) => [...prev, { role: 'user', text: content }]);
    setInput('');
    setIsTyping(true);

    const lang = detectLanguage(content);

    const finish = (reply: { text: string; citations?: Message['citations'] }) => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: 'athena',
          text: reply.text,
          ...(reply.citations?.length ? { citations: reply.citations } : {})
        }
      ]);
    };

    const pwCheck = looksLikePasswordCheck(content);
    if (pwCheck.triggered && pwCheck.password) {
      const pwResult = evaluatePassword(pwCheck.password);
      trackEvent('athena_message', { mode: 'password', lang });
      finish({ text: formatPasswordReply(pwResult, lang) });
      return;
    }

    if (isOffTopicMessage(content)) {
      trackEvent('athena_fallback', { reason: 'off_topic', lang });
      finish({ text: lang === 'tl' ? OFF_TOPIC_TL : OFF_TOPIC_EN });
      return;
    }

    const isEmergency = EMERGENCY_RE.test(content);

    if (shouldRunVerification(content)) {
      const report = runVerification(content);
      const reportText = polishAthenaText(
        formatVerificationReport(report, lang)
      );
      trackEvent('athena_message', {
        mode: 'verify',
        band: report.rubric.band,
        lang
      });

      const history: ChatTurn[] = messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        text: m.text
      }));

      chatWithGroq(history, content, {
        lang,
        rubricContext: verificationContextForGroq(report)
      })
        .then((raw) => {
          const { text, citations } = parseAthenaReply(raw);
          const brief = polishAthenaText(text);
          finish({
            text: `${reportText}\n\n----------------------------------------\n${lang === 'tl' ? 'ANALYST NOTE (Groq):' : 'ANALYST NOTE (Groq):'}\n\n${brief}`,
            citations:
              citations.length > 0
                ? [...report.citations, ...citations].filter(
                    (c, i, arr) => arr.findIndex((x) => x.url === c.url) === i
                  )
                : report.citations
          });
        })
        .catch(() => {
          finish({
            text: reportText,
            citations: report.citations
          });
        });
      return;
    }

    if (isEmergency) {
      trackEvent('athena_emergency', { lang });
    }

    const history: ChatTurn[] = messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      text: m.text
    }));

    chatWithGroq(history, content, { lang, isEmergency })
      .then((raw) => {
        const { text, citations } = parseAthenaReply(raw);
        trackEvent('athena_message', { mode: 'groq', lang });
        finish({
          text: polishAthenaText(text),
          citations: citations.length > 0 ? citations : undefined
        });
      })
      .catch(() => {
        trackEvent('athena_fallback', { reason: 'groq_error', lang });
        finish({
          text: lang === 'tl' ? ATHENA_OFFLINE_TL : ATHENA_OFFLINE_EN
        });
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-3 sm:px-4 py-3 sm:py-6 h-[calc(100dvh-5rem)] flex flex-col md:flex-row gap-3 md:gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden md:flex w-64 shrink-0 flex-col gap-4 overflow-y-auto scrollbar-hide">
        <div className="dark-panel rounded-xl p-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4">
            <AthenaAvatar size={44} glow />
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}>
              <h2 className="font-heading font-bold text-white">Athena AI</h2>
              <motion.div className="text-xs text-cyan-300 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Powered by Groq
              </motion.div>
            </motion.div>
          </motion.div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Athena is your conversational guide for Philippine scams, account
            safety, and reporting. She answers in plain language and only shows
            official source links when she actually cites them.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 pt-4 border-t border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Languages
            </motion.div>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-cyan-200 font-medium">
                English
              </span>
              <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-cyan-200 font-medium">
                Filipino · Taglish
              </span>
            </div>
          </motion.div>
        </div>

        <div className="dark-panel rounded-xl p-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="space-y-1">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => handleSend(action.prompt)}
                disabled={isTyping}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 border-l-2 border-transparent hover:border-cyan-400 transition-all text-left disabled:opacity-50">
                <action.icon className="w-4 h-4 text-slate-500" />
                {action.label}
              </button>
            ))}
          </div>
        </div>

        <div className="dark-panel rounded-xl p-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Reference library
          </h3>
          <p className="text-[10px] text-slate-500 mb-3 leading-relaxed">
            Background materials Athena may draw on — not shown on every reply.
          </p>
          <ul className="space-y-1.5">
            {knowledgeSources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2 px-2 py-1.5 rounded-md hover:bg-white/5 transition-colors">
                  <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors mt-0.5 shrink-0" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="min-w-0">
                    <div className="text-[11px] font-medium text-slate-300 group-hover:text-white leading-tight">
                      {s.name}
                    </div>
                    <div className="text-[10px] text-slate-500 group-hover:text-slate-400 leading-tight mt-0.5 truncate">
                      {s.label}
                    </div>
                  </motion.div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-grow dark-panel rounded-xl flex flex-col overflow-hidden min-h-0">
        <div className="md:hidden border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3 px-4 py-3">
            <AthenaAvatar size={36} glow />
            <div className="flex-grow min-w-0">
              <h2 className="font-heading font-bold text-white text-sm leading-tight">
                Athena AI
              </h2>
              <div className="text-[10px] text-cyan-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Powered by Groq
              </div>
            </div>
          </div>
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => handleSend(action.prompt)}
                disabled={isTyping}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/40 transition-all disabled:opacity-50">
                <action.icon className="w-3.5 h-3.5 text-cyan-300" />
                {action.label}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden md:flex px-6 py-4 border-b border-white/10 bg-white/[0.02] items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Info className="w-4 h-4 text-cyan-400" />
            Natural conversation — source links only when Athena cites them.
          </div>
          <div className="flex items-center gap-1.5 text-xs text-cyan-300/80">
            <Sparkles className="w-3.5 h-3.5" />
            Groq
          </div>
        </div>

        <motion.div
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-4 sm:p-6 min-h-0"
          aria-live="polite"
          aria-relevant="additions"
          aria-label="Chat messages"
          role="log">
          {messages.length === 0 && !isTyping ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto py-4">
              <AthenaAvatar
                size={72}
                glow
                className="mb-4 sm:mb-6 sm:!w-[88px] sm:!h-[88px]"
              />
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2 px-2">
                How can Athena help you today?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6 sm:mb-8 px-2">
                Ask anything about scams, suspicious messages, or staying safe
                online in the Philippines. Athena will talk with you naturally —
                not from a script.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {suggestedPrompts.map((s, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => handleSend(s.prompt)}
                    disabled={isTyping}
                    className="group text-left p-3 sm:p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/40 hover:bg-white/[0.05] transition-all disabled:opacity-50">
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 group-hover:bg-cyan-400/15 transition-colors">
                        <s.icon className="w-4 h-4 text-cyan-300" />
                      </motion.div>
                      <div className="min-w-0">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs sm:text-sm font-semibold text-white mb-0.5">
                          {s.title}
                        </motion.div>
                        <motion.div className="text-[11px] sm:text-xs text-slate-400 leading-relaxed line-clamp-2">
                          {s.prompt}
                        </motion.div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
              <div className="mt-6 sm:mt-8 text-[10px] sm:text-xs text-slate-500 flex items-center gap-2 px-2 text-center">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                Your conversations are private and not used to train external
                models.
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence initial={false}>
                {messages.map((m, i) =>
                  m.role === 'user' ? (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-end">
                      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl rounded-tr-sm px-4 sm:px-5 py-2.5 sm:py-3 max-w-[85%] sm:max-w-[80%] text-sm shadow-lg shadow-cyan-500/20 whitespace-pre-wrap break-words">
                        {m.text}
                      </div>
                    </motion.div>
                  ) : (
                    <AthenaMessageBubble
                      key={i}
                      text={m.text}
                      citations={m.citations}
                    />
                  )
                )}
              </AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5 sm:gap-4 max-w-[95%] sm:max-w-[90%]">
                  <AthenaAvatar
                    size={32}
                    className="mt-1 sm:!w-[36px] sm:!h-[36px]"
                  />
                  <div className="bg-white/[0.04] border border-white/10 rounded-2xl rounded-tl-sm p-3 sm:p-4 flex items-center gap-1">
                    {[0, 0.2, 0.4].map((d) => (
                      <motion.div
                        key={d}
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.6,
                          delay: d
                        }}
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        <div className="p-3 sm:p-4 bg-white/[0.02] border-t border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Athena..."
              disabled={isTyping}
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-3 sm:pl-4 pr-11 sm:pr-12 py-3 sm:py-3.5 text-sm text-white focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all placeholder:text-slate-500 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              className="absolute right-1.5 sm:right-2 p-2 bg-cyan-500 hover:bg-cyan-400 active:scale-[0.98] disabled:bg-white/10 disabled:cursor-not-allowed text-white rounded-lg transition-all shadow-lg shadow-cyan-500/20">
              <Send className="w-4 h-4" />
            </button>
          </form>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-2 text-[10px] text-slate-500 px-2">
            Athena can make mistakes. Verify critical details with official
            authorities.
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
