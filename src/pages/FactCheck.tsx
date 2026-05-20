import React, { useEffect, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { RubricPanel } from '../components/RubricPanel';
import { VerificationResultsPanel } from '../components/VerificationResultsPanel';
import {
  ShieldAlert,
  Link as LinkIcon,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { indicators } from '../data/riskRubric';
import {
  runVerification,
  type VerificationReport
} from '../services/athena/verification';

export function FactCheck() {
  const [activeTab, setActiveTab] = useState<'text' | 'link'>('text');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<VerificationReport | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showRubric, setShowRubric] = useState(false);

  const handleAnalyze = () => {
    if (!inputValue.trim()) {
      toast.error('Please enter content to verify');
      return;
    }
    setIsAnalyzing(true);
    setReport(null);
    setAnimatedScore(0);
    const text =
      activeTab === 'link' && !/^https?:\/\//i.test(inputValue.trim())
        ? `https://${inputValue.trim()}`
        : inputValue;
    setTimeout(() => {
      const verification = runVerification(text);
      setIsAnalyzing(false);
      setReport(verification);
      toast.success('Forensic verification complete');
    }, 1200);
  };

  useEffect(() => {
    if (report) {
      let start = 0;
      const end = report.rubric.score;
      if (end === 0) {
        setAnimatedScore(0);
        return;
      }
      const duration = 1000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setAnimatedScore(end);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [report]);

  return (
    <motion.div className="container mx-auto px-4 py-10 md:py-14 max-w-5xl">
      <SectionHeading
        title="Verify a Message or Link"
        description="Full forensic workflow: EFAS Heuristic Risk Rubric, URL structural analysis, and Philippine spam-SMS corpus similarity (reference only)."
      />

      <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div className="space-y-6">
          <motion.div className="dark-panel rounded-xl overflow-hidden">
            <motion.div className="flex border-b border-white/10 bg-white/5">
              <button
                type="button"
                onClick={() => setActiveTab('text')}
                className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'text'
                    ? 'bg-zinc-900 text-white border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:bg-white/5'
                }`}>
                <FileText className="w-4 h-4" /> Paste Message
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('link')}
                className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'link'
                    ? 'bg-zinc-900 text-white border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:bg-white/5'
                }`}>
                <LinkIcon className="w-4 h-4" /> Analyze Link
              </button>
            </motion.div>

            <motion.div className="p-6 bg-zinc-900">
              {activeTab === 'text' && (
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Paste the suspicious SMS, email, or chat message here..."
                  className="w-full h-48 bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500 resize-none placeholder:text-slate-500"
                />
              )}

              {activeTab === 'link' && (
                <motion.div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="url"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="https://suspicious-website.com"
                    className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 placeholder:text-slate-500"
                  />
                </motion.div>
              )}

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full mt-6 py-3 bg-cyan-600 hover:bg-cyan-500 active:scale-[0.98] disabled:active:scale-100 disabled:bg-white/5 disabled:text-slate-500 disabled:border disabled:border-white/10 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm">
                {isAnalyzing ? (
                  <motion.div className="w-5 h-5 border-2 border-slate-500 border-t-cyan-400 rounded-full animate-spin" />
                ) : (
                  <ShieldAlert className="w-5 h-5" />
                )}
                {isAnalyzing
                  ? 'Running forensic verification...'
                  : 'Verify Now'}
              </button>
            </motion.div>
          </motion.div>

          <motion.div className="dark-panel rounded-xl p-5">
            <button
              type="button"
              onClick={() => setShowRubric(!showRubric)}
              className="w-full flex items-start gap-3 text-left">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <motion.div className="flex-grow">
                <motion.div className="text-sm font-semibold text-white mb-1">
                  How this analysis works
                </motion.div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Three-step workflow: (1) {indicators.length} weighted rubric
                  indicators, (2) per-URL structural flags, (3) Jaccard corpus
                  match. Only the rubric sets your 0–100 score.
                </p>
                <span className="text-xs text-cyan-400 font-medium mt-1 inline-block">
                  {showRubric ? 'Hide rubric' : 'View full rubric & sources'} →
                </span>
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {showRubric && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 pt-4 border-t border-white/10 overflow-hidden">
                  <RubricPanel />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.div>
          {report ? (
            <VerificationResultsPanel
              report={report}
              animatedScore={animatedScore}
            />
          ) : (
            <motion.div className="h-full min-h-[400px] border-2 border-dashed border-white/10 bg-white/5 rounded-xl flex flex-col items-center justify-center text-slate-500 p-8 text-center">
              <ShieldAlert className="w-12 h-12 mb-4 text-slate-600" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">
                Awaiting Input
              </h3>
              <p className="max-w-sm text-sm">
                Enter a message or paste a link on the left to run the full
                forensic workflow — rubric score, URL flags, and corpus match.
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
