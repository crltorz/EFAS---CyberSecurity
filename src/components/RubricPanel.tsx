import React, { useMemo, useState } from 'react';
import { ExternalLink, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { indicators, type Indicator } from '../data/riskRubric';

const SEVERITY_STYLES: Record<
  Indicator['severity'],
  { badge: string; border: string; dot: string }
> = {
  critical: {
    badge: 'bg-red-500/15 text-red-300 border-red-500/30',
    border: 'border-red-500/20',
    dot: 'bg-red-400'
  },
  high: {
    badge: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
    border: 'border-orange-500/20',
    dot: 'bg-orange-400'
  },
  medium: {
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    border: 'border-amber-500/20',
    dot: 'bg-amber-400'
  },
  low: {
    badge: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
    border: 'border-slate-500/20',
    dot: 'bg-slate-400'
  }
};

const SEVERITY_ORDER: Indicator['severity'][] = [
  'critical',
  'high',
  'medium',
  'low'
];

function IndicatorCard({ ind }: { ind: Indicator }) {
  const style = SEVERITY_STYLES[ind.severity];
  return (
    <article
      className={`rounded-lg border ${style.border} bg-zinc-900/80 p-3 shadow-sm`}>
      <motion.div className="flex items-start justify-between gap-2 mb-1.5">
        <h4 className="text-xs font-semibold text-white leading-snug">
          {ind.label}
        </h4>
        <span
          className={`shrink-0 text-[10px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded border ${style.badge}`}>
          {ind.severity}
        </span>
      </motion.div>
      <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
        {ind.description}
      </p>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-[10px] font-mono text-cyan-200/90">
          Weight: +{ind.weight}
        </span>
        <a
          href={ind.source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-medium max-w-[70%] truncate">
          {ind.source.name}
          <ExternalLink className="w-2.5 h-2.5 shrink-0" />
        </a>
      </div>
    </article>
  );
}

export function RubricPanel() {
  const [query, setQuery] = useState('');
  const [expandedSeverity, setExpandedSeverity] = useState<
    Record<Indicator['severity'], boolean>
  >({
    critical: true,
    high: true,
    medium: false,
    low: false
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return indicators;
    return indicators.filter(
      (ind) =>
        ind.label.toLowerCase().includes(q) ||
        ind.description.toLowerCase().includes(q) ||
        ind.source.name.toLowerCase().includes(q) ||
        ind.id.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map: Record<Indicator['severity'], Indicator[]> = {
      critical: [],
      high: [],
      medium: [],
      low: []
    };
    for (const ind of filtered) {
      map[ind.severity].push(ind);
    }
    return map;
  }, [filtered]);

  const totalWeight = useMemo(
    () => indicators.reduce((s, i) => s + i.weight, 0),
    []
  );

  return (
    <div className="space-y-4 text-slate-200">
      <div className="rounded-lg border border-cyan-500/25 bg-cyan-500/5 p-4">
        <h3 className="text-sm font-semibold text-white mb-2">
          EFAS risk rubric methodology
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Each message or link is checked against{' '}
          <strong className="text-white font-medium">
            {indicators.length} weighted indicators
          </strong>{' '}
          grounded in Philippine and international advisories (PNP-ACG, BSP
          AFASA / Circular 1140, NIST, APWG, SEC, DICT NCERT). Text is
          unicode-normalized and confusable characters are mapped before pattern
          matching. The raw score is the sum of triggered weights, capped at
          100.
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-md bg-emerald-500/10 border border-emerald-500/25 py-2 px-1">
            <div className="text-[10px] uppercase tracking-wider text-emerald-300/90">
              Low
            </div>
            <div className="text-xs font-mono text-emerald-300">0–30</div>
          </div>
          <div className="rounded-md bg-amber-500/10 border border-amber-500/25 py-2 px-1">
            <div className="text-[10px] uppercase tracking-wider text-amber-300/90">
              Caution
            </div>
            <div className="text-xs font-mono text-amber-300">31–60</div>
          </div>
          <div className="rounded-md bg-red-500/10 border border-red-500/25 py-2 px-1">
            <div className="text-[10px] uppercase tracking-wider text-red-300/90">
              High
            </div>
            <div className="text-xs font-mono text-red-300">61–100</div>
          </div>
        </div>
        <p className="mt-2 text-[10px] text-slate-500">
          Max theoretical weight if all indicators fired: {totalWeight} (capped
          at 100 in scoring).
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search indicators or sources..."
          className="w-full bg-zinc-900 border border-white/15 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-6">
          No indicators match your search.
        </p>
      ) : (
        SEVERITY_ORDER.map((severity) => {
          const items = grouped[severity];
          if (items.length === 0) return null;
          const open = expandedSeverity[severity];
          return (
            <section
              key={severity}
              className="rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden">
              <button
                type="button"
                onClick={() =>
                  setExpandedSeverity((prev) => ({
                    ...prev,
                    [severity]: !prev[severity]
                  }))
                }
                className="w-full flex items-center justify-between gap-2 px-3 py-2.5 hover:bg-white/5 transition-colors text-left">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${SEVERITY_STYLES[severity].dot}`}
                  />
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">
                    {severity} ({items.length})
                  </span>
                </div>
                {open ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden">
                    <div className="px-3 pb-3 space-y-2 max-h-72 overflow-y-auto scrollbar-hide">
                      {items.map((ind) => (
                        <IndicatorCard key={ind.id} ind={ind} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          );
        })
      )}

      <div className="rounded-lg border border-white/10 bg-zinc-900/60 p-3 text-[11px] text-slate-400 leading-relaxed">
        <span className="font-semibold text-slate-200">Dataset note:</span>{' '}
        Athena and Evaluation also compare inputs to the Philippine Spam SMS
        corpus (Kaggle). Fact Check uses this rubric only; corpus matching
        appears in Athena verification reports.
      </div>
    </div>
  );
}
