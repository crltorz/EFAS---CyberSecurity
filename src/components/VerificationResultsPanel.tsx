import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
  Link2,
  Database
} from 'lucide-react';
import { bandActions, type RiskBand } from '../data/riskRubric';
import type { VerificationReport } from '../services/athena/verification';
import { CORPUS_SOURCE_NOTE } from '../services/athena/verification';
import type { LinkRiskLevel } from '../services/athena/linkAnalyzer';

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
  }
> = {
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

const linkRiskStyles: Record<LinkRiskLevel, string> = {
  elevated: 'text-red-400 bg-red-500/10 border-red-500/30',
  moderate: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  unknown: 'text-slate-400 bg-white/5 border-white/10'
};

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 }
};

type Props = {
  report: VerificationReport;
  animatedScore: number;
};

export function VerificationResultsPanel({ report, animatedScore }: Props) {
  const { rubric, links, corpusMatches, meta } = report;
  const styles = bandStyles[rubric.band];
  const [showNotTriggered, setShowNotTriggered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`dark-panel rounded-xl p-6 ${styles.ring}`}
      role="status"
      aria-live="polite"
      aria-atomic="true">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">
            Forensic Verification Complete
          </h3>
          <p className="text-sm text-slate-400">
            EFAS Heuristic Risk Rubric · {meta.triggeredCount} of{' '}
            {meta.rubricPoolSize} indicators triggered
          </p>
        </div>
        <div
          className={`flex flex-col items-center justify-center w-20 h-20 rounded-full border-4 ${styles.border} ${styles.bg} ${styles.text}`}>
          <span className="text-2xl font-bold">{animatedScore}</span>
          <span className="text-[10px] font-medium uppercase tracking-wider">
            Score
          </span>
        </div>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
          1. Rubric
        </span>
        <span
          className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded border ${
            links.length > 0
              ? 'border-violet-500/30 bg-violet-500/10 text-violet-300'
              : 'border-white/10 bg-white/5 text-slate-500'
          }`}>
          2. URL structure {links.length > 0 ? `(${links.length})` : '(none)'}
        </span>
        <span
          className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded border ${
            corpusMatches.length > 0
              ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
              : 'border-white/10 bg-white/5 text-slate-500'
          }`}>
          3. Corpus match{' '}
          {corpusMatches.length > 0 ? `(${corpusMatches.length})` : '(none)'}
        </span>
      </div>

      <div className="rounded-lg border border-white/10 bg-black/30 p-4 mb-6 text-xs text-slate-400 space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
          Scoring (rubric only — links &amp; corpus do not add points)
        </p>
        <p>
          Raw weight sum:{' '}
          <span className="font-mono text-slate-300">{meta.rawScoreSum}</span>
          {' → '}
          Capped score:{' '}
          <span className="font-mono text-white">{meta.cappedScore}/100</span>
        </p>
        <p>
          Band:{' '}
          <span className={`font-medium ${styles.text}`}>{rubric.bandLabel}</span>
          {' '}
          <span className="text-slate-500">({meta.bandRule})</span>
        </p>
        <p className="text-slate-500">
          Thresholds: Low 0–30 · Caution 31–60 · High 61–100 · Formula: min(Σ
          weights, 100)
        </p>
      </div>

      <div className="mb-6">
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${styles.badgeBg} ${styles.badgeText} border ${styles.badgeBorder} text-sm font-medium mb-3`}>
          {rubric.band === 'high' ? (
            <AlertTriangle className="w-4 h-4" />
          ) : rubric.band === 'caution' ? (
            <Info className="w-4 h-4" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          {rubric.bandLabel}
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">{rubric.verdict}</p>
      </div>

      <div className="space-y-6">
        {rubric.triggered.length > 0 ? (
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
              Rubric — Indicators Triggered
            </h4>
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="space-y-3">
              {[...rubric.triggered]
                .sort((a, b) => b.weight - a.weight)
                .map((ind) => (
                  <motion.li
                    key={ind.id}
                    variants={itemVariants}
                    className="rounded-lg border border-white/10 bg-zinc-900/50 p-4">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="flex items-start gap-2 flex-grow">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${styles.pillar} mt-1.5 shrink-0`}
                        />
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
                    {ind.evidence && (
                      <div className="ml-3.5 mb-2 text-xs text-slate-500">
                        Matched:{' '}
                        <code className="px-1.5 py-0.5 rounded bg-white/5 text-slate-300 font-mono">
                          {ind.evidence}
                        </code>
                      </div>
                    )}
                    <a
                      href={ind.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-3.5 inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium">
                      Source: {ind.source.name}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </motion.li>
                ))}
            </motion.ul>
          </div>
        ) : (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-400">
            No rubric indicators fired on normalized input. Stay cautious — new
            patterns appear regularly.
          </div>
        )}

        {rubric.notTriggered.length > 0 && (
          <div>
            <button
              type="button"
              onClick={() => setShowNotTriggered(!showNotTriggered)}
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-300 transition-colors">
              {showNotTriggered ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              {showNotTriggered ? 'Hide' : 'Show'} {meta.notTriggeredCount}{' '}
              indicators not triggered
            </button>
            {showNotTriggered && (
              <ul className="mt-3 space-y-1 max-h-40 overflow-y-auto text-xs text-slate-500">
                {rubric.notTriggered.map((ind) => (
                  <li key={ind.id} className="flex justify-between gap-2 py-0.5">
                    <span>{ind.label}</span>
                    <span className="font-mono shrink-0">+{ind.weight}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {links.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider flex items-center gap-2">
              <Link2 className="w-4 h-4 text-violet-400" />
              URL Structural Analysis
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Separate from the numeric rubric score. Use Safe Browsing for live
              reputation checks.
            </p>
            <ul className="space-y-3">
              {links.map((link, i) => (
                <li
                  key={`${link.raw}-${i}`}
                  className="rounded-lg border border-white/10 bg-zinc-900/50 p-4 text-sm">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <code className="text-xs text-slate-300 break-all">{link.raw}</code>
                    <span
                      className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded border shrink-0 ${linkRiskStyles[link.heuristicRisk]}`}>
                      {link.heuristicRisk}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">
                    Host: {link.hostname} · {link.protocol}
                    {link.tld ? ` · .${link.tld}` : ''}
                    {link.brandImpersonation
                      ? ` · Possible ${link.brandImpersonation} impersonation`
                      : ''}
                  </p>
                  {link.flagCodes.length > 0 ? (
                    <ul className="text-xs text-amber-300/90 space-y-1 mb-2">
                      {link.flags.map((f, j) => (
                        <li key={j}>• {f}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500 mb-2">
                      No structural flags — still verify via Safe Browsing.
                    </p>
                  )}
                  <a
                    href={link.safeBrowsingCheckUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300">
                    Google Safe Browsing check
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-400" />
            Corpus Similarity (reference only)
          </h4>
          {corpusMatches.length > 0 ? (
            <ul className="space-y-3">
              {corpusMatches.map((m) => (
                <li
                  key={m.id}
                  className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-sm">
                  <div className="flex flex-wrap justify-between gap-2 mb-1">
                    <span className="text-xs font-mono text-amber-300/90">
                      Jaccard J = {m.score.toFixed(3)} · {m.category}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      ref {m.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 italic leading-relaxed">
                    &ldquo;{m.excerpt}&rdquo;
                  </p>
                </li>
              ))}
              <p className="text-[10px] text-slate-500">{CORPUS_SOURCE_NOTE}</p>
            </ul>
          ) : (
            <p className="text-xs text-slate-500 rounded-lg border border-white/10 bg-white/5 p-3">
              No match above threshold (J ≥ 0.12). Pattern may be novel or
              benign. Corpus similarity does not change the rubric score.
            </p>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
            Recommended Actions
          </h4>
          <ul className="space-y-2">
            {bandActions[rubric.band].map((action, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                {action}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[10px] text-slate-500 leading-relaxed border-t border-white/10 pt-4">
          Heuristic analysis only — not a live malware sandbox or bank fraud
          decision. Cross-check with official channels before acting.
          {rubric.band !== 'low' &&
            ' See recommended actions above for reporting options.'}
        </p>
      </div>
    </motion.div>
  );
}
