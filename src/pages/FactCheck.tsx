import React, { useEffect, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { RubricPanel } from '../components/RubricPanel';
import {
  ShieldAlert,
  Link as LinkIcon,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  ExternalLink,
  Info } from
'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  analyze,
  AnalysisResult,
  bandActions,
  indicators,
  RiskBand } from
'../data/riskRubric';
const bandStyles: Record<
  RiskBand,
  {
    ring: string;
    bg: string;
    text: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    pillar: string;
  }> =
{
  high: {
    ring: 'border-red-500/30',
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/30',
    badgeBg: 'bg-red-500/10',
    badgeText: 'text-red-400',
    badgeBorder: 'border-red-500/20',
    pillar: 'bg-red-500'
  },
  caution: {
    ring: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-400',
    badgeBorder: 'border-amber-500/20',
    pillar: 'bg-amber-500'
  },
  low: {
    ring: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-400',
    badgeBorder: 'border-emerald-500/20',
    pillar: 'bg-emerald-500'
  }
};
export function FactCheck() {
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'link'>('text');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showRubric, setShowRubric] = useState(false);
  const handleAnalyze = () => {
    if (activeTab === 'image') {
      toast.error(
        'Screenshot OCR is not available yet — please paste the text from the image.'
      );
      return;
    }
    if (!inputValue.trim()) {
      toast.error('Please enter content to analyze');
      return;
    }
    setIsAnalyzing(true);
    setResult(null);
    setAnimatedScore(0);
    // Simulate brief processing for UX, then run actual heuristic analysis
    setTimeout(() => {
      const analysis = analyze(inputValue);
      setIsAnalyzing(false);
      setResult(analysis);
      toast.success('Analysis complete');
    }, 1200);
  };
  useEffect(() => {
    if (result) {
      let start = 0;
      const end = result.score;
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
  }, [result]);
  const listVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -10
    },
    show: {
      opacity: 1,
      x: 0
    }
  };
  const styles = result ? bandStyles[result.band] : bandStyles.low;
  return (
    <div className="container mx-auto px-4 py-10 md:py-14 max-w-5xl">
      <SectionHeading
        title="Verify a Message or Link"
        description="Paste a suspicious text message or enter a link to check it against indicators from PNP-ACG, BSP, NIST, and APWG." />
      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="dark-panel rounded-xl overflow-hidden">
            <div className="flex border-b border-white/10 bg-white/5">
              <button
                onClick={() => setActiveTab('text')}
                className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'text' ? 'bg-zinc-900 text-white border-b-2 border-cyan-400' : 'text-slate-400 hover:bg-white/5'}`}>
                
                <FileText className="w-4 h-4" /> Paste Message
              </button>
              <button
                onClick={() => setActiveTab('link')}
                className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'link' ? 'bg-zinc-900 text-white border-b-2 border-cyan-400' : 'text-slate-400 hover:bg-white/5'}`}>
                
                <LinkIcon className="w-4 h-4" /> Analyze Link
              </button>
            </div>

            <div className="p-6 bg-zinc-900">
              {activeTab === 'text' &&
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Paste the suspicious SMS, email, or chat message here..."
                className="w-full h-48 bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500 resize-none placeholder:text-slate-500" />

              }

              {activeTab === 'link' &&
              <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                  type="url"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="https://suspicious-website.com"
                  className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 placeholder:text-slate-500" />
                
                </div>
              }

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full mt-6 py-3 bg-cyan-600 hover:bg-cyan-500 active:scale-[0.98] disabled:active:scale-100 disabled:bg-white/5 disabled:text-slate-500 disabled:border disabled:border-white/10 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm">
                
                {isAnalyzing ?
                <div className="w-5 h-5 border-2 border-slate-500 border-t-cyan-400 rounded-full animate-spin" /> :

                <ShieldAlert className="w-5 h-5" />
                }
                {isAnalyzing ? 'Running heuristic analysis...' : 'Analyze Now'}
              </button>
            </div>
          </div>

          {/* Methodology card */}
          <div className="dark-panel rounded-xl p-5">
            <button
              onClick={() => setShowRubric(!showRubric)}
              className="w-full flex items-start gap-3 text-left">
              
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="flex-grow">
                <div className="text-sm font-semibold text-white mb-1">
                  How this analysis works
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your input is scored against {indicators.length} weighted
                  indicators sourced from PNP-ACG advisories, BSP Circular
                  1140, NIST SP 800-177, APWG trends reports, and OWASP
                  guidelines.
                </p>
                <span className="text-xs text-cyan-400 font-medium mt-1 inline-block">
                  {showRubric ? 'Hide rubric' : 'View full rubric & sources'} →
                </span>
              </div>
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
          </div>
        </div>

        {/* Results Section */}
        <div>
          {result ?
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className={`dark-panel rounded-xl p-6 ${styles.ring}`}
            role="status"
            aria-live="polite"
            aria-atomic="true">
            
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Analysis Complete
                  </h3>
                  <p className="text-sm text-slate-400">
                    {result.triggered.length} of{' '}
                    {result.triggered.length + result.notTriggered.length}{' '}
                    indicators triggered
                  </p>
                </div>
                <div
                className={`flex flex-col items-center justify-center w-20 h-20 rounded-full border-4 ${styles.border} ${styles.bg} ${styles.text}`}>
                
                  <span className="text-2xl font-bold">{animatedScore}</span>
                  <span className="text-[10px] font-medium uppercase tracking-wider">
                    Risk
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${styles.badgeBg} ${styles.badgeText} border ${styles.badgeBorder} text-sm font-medium mb-3`}>
                
                  {result.band === 'high' ?
                <AlertTriangle className="w-4 h-4" /> :
                result.band === 'caution' ?
                <Info className="w-4 h-4" /> :

                <CheckCircle2 className="w-4 h-4" />
                }{' '}
                  {result.bandLabel}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {result.verdict}
                </p>
              </div>

              <div className="space-y-6">
                {/* Triggered indicators */}
                {result.triggered.length > 0 &&
              <div>
                    <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                      Indicators Triggered
                    </h4>
                    <motion.ul
                  variants={listVariants}
                  initial="hidden"
                  animate="show"
                  className="space-y-3">
                  
                      {result.triggered.map((ind) =>
                  <motion.li
                    key={ind.id}
                    variants={itemVariants}
                    className="rounded-lg border border-white/10 bg-zinc-900/50 p-4">
                    
                          <div className="flex items-start justify-between gap-3 mb-1.5">
                            <div className="flex items-start gap-2 flex-grow">
                              <div
                          className={`w-1.5 h-1.5 rounded-full ${styles.pillar} mt-1.5 shrink-0`} />
                        
                              <span className="text-sm font-medium text-white">
                                {ind.label}
                              </span>
                            </div>
                            <span className="text-xs font-mono text-slate-500 shrink-0">
                              +{ind.weight}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed mb-2 ml-3.5">
                            {ind.description}
                          </p>
                          {ind.evidence &&
                    <div className="ml-3.5 mb-2 text-xs text-slate-500">
                              Matched:{' '}
                              <code className="px-1.5 py-0.5 rounded bg-white/5 text-slate-300 font-mono">
                                {ind.evidence}
                              </code>
                            </div>
                    }
                          <a
                      href={ind.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-3.5 inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium">
                      
                            Source: {ind.source.name}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </motion.li>
                  )}
                    </motion.ul>
                  </div>
              }

                {result.triggered.length === 0 &&
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-400">
                    No scam indicators were detected in this content. Stay
                    cautious anyway — new scam patterns appear regularly.
                  </div>
              }

                {/* Recommended actions */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                    Recommended Actions
                  </h4>
                  <ul className="space-y-2">
                    {bandActions[result.band].map((action, i) =>
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-300">
                    
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        {action}
                      </li>
                  )}
                  </ul>
                </div>
              </div>
            </motion.div> :

          <div className="h-full min-h-[400px] border-2 border-dashed border-white/10 bg-white/5 rounded-xl flex flex-col items-center justify-center text-slate-500 p-8 text-center">
              <ShieldAlert className="w-12 h-12 mb-4 text-slate-600" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">
                Awaiting Input
              </h3>
              <p className="max-w-sm text-sm">
                Enter a message or paste a link on the left to receive a
                source-cited security analysis.
              </p>
            </div>
          }
        </div>
      </div>
    </div>);
}

