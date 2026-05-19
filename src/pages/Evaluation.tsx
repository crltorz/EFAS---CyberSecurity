import React, { useMemo, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { analyze, RiskBand } from '../data/riskRubric';
import { corpus, CorpusSample, EvaluationMetrics } from '../data/testCorpus';
import {
  BarChart3,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  FileText,
  Filter,
  ExternalLink,
  BookOpen } from
'lucide-react';
import { motion } from 'framer-motion';
export function Evaluation() {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  // Run the evaluation
  const { metrics, results } = useMemo(() => {
    const evalResults = corpus.map((sample) => {
      const analysis = analyze(sample.text);
      const isCorrect = analysis.band === sample.expectedBand;
      return {
        sample,
        analysis,
        isCorrect
      };
    });
    const correctCount = evalResults.filter((r) => r.isCorrect).length;
    const total = evalResults.length;
    // Calculate per-band metrics
    const bands: RiskBand[] = ['low', 'caution', 'high'];
    const perBand = bands.reduce(
      (acc, band) => {
        const truePositives = evalResults.filter(
          (r) => r.sample.expectedBand === band && r.analysis.band === band
        ).length;
        const falsePositives = evalResults.filter(
          (r) => r.sample.expectedBand !== band && r.analysis.band === band
        ).length;
        const falseNegatives = evalResults.filter(
          (r) => r.sample.expectedBand === band && r.analysis.band !== band
        ).length;
        const support = evalResults.filter(
          (r) => r.sample.expectedBand === band
        ).length;
        const precision =
        truePositives + falsePositives === 0 ?
        0 :
        truePositives / (truePositives + falsePositives);
        const recall =
        truePositives + falseNegatives === 0 ?
        0 :
        truePositives / (truePositives + falseNegatives);
        const f1 =
        precision + recall === 0 ?
        0 :
        2 * precision * recall / (precision + recall);
        acc[band] = {
          precision,
          recall,
          f1,
          support
        };
        return acc;
      },
      {} as Record<
        RiskBand,
        {
          precision: number;
          recall: number;
          f1: number;
          support: number;
        }>

    );
    const calculatedMetrics: EvaluationMetrics = {
      totalSamples: total,
      correct: correctCount,
      accuracy: correctCount / total,
      perBand
    };
    return {
      metrics: calculatedMetrics,
      results: evalResults
    };
  }, []);
  const filteredResults = results.filter((r) => {
    if (filter === 'correct' && !r.isCorrect) return false;
    if (filter === 'incorrect' && r.isCorrect) return false;
    if (categoryFilter !== 'all' && r.sample.category !== categoryFilter)
    return false;
    return true;
  });
  const categories = Array.from(new Set(corpus.map((s) => s.category)));
  return (
    <div className="container mx-auto px-4 py-10 md:py-14 max-w-6xl">
      <SectionHeading
        title="System Evaluation"
        description="Empirical performance of the FactCheck risk rubric against a labeled corpus of 85 real Philippine SMS samples drawn entirely from the Kaggle bwandowando/philippine-spam-sms-messages dataset. Each sample preserves its original Kaggle row hash for full reproducibility." />
      

      {/* Dataset Methodology Citation */}
      <div className="dark-panel rounded-xl p-5 mb-8 border-l-4 border-cyan-500">
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-cyan-400 shrink-0 mt-1" />
          <div className="flex-grow">
            <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">
              Dataset Methodology
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              The corpus consists exclusively of real SMS samples sourced from
              the public Kaggle dataset{' '}
              <span className="text-white font-medium">
                bwandowando/philippine-spam-sms-messages
              </span>
              . Each sample preserves its original{' '}
              <code className="px-1 py-0.5 rounded bg-white/5 text-slate-300 font-mono text-xs">
                kaggleHash
              </code>{' '}
              for reproducibility — any reviewer can re-download the dataset and
              match each row by hash. Risk-band labels were assigned by the EFAS
              team based on the indicator-rubric methodology and
              cross-referenced against PNP-ACG Cybersecurity Bulletins, BSP
              AFASA (RA 12010), and SEC advisories.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <a
                href="https://www.kaggle.com/datasets/bwandowando/philippine-spam-sms-messages"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/20 transition-colors font-medium">
                
                Kaggle — Philippine Spam SMS Messages (bwandowando)
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://acg.pnp.gov.ph/category/cybersecurity-bulletin/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white transition-colors">
                
                PNP-ACG Bulletins
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.ndss-symposium.org/wp-content/uploads/usec25-27.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white transition-colors">
                
                NDSS USEC 2025 — Rubric Weighting
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-3">
              Corpus is held out — the rubric in{' '}
              <code className="px-1 py-0.5 rounded bg-white/5 text-slate-300 font-mono">
                data/riskRubric.ts
              </code>{' '}
              was frozen before corpus construction. Each sample's pattern
              lineage is documented in its{' '}
              <code className="px-1 py-0.5 rounded bg-white/5 text-slate-300 font-mono">
                sourceNote
              </code>{' '}
              field.
            </p>
          </div>
        </div>
      </div>

      {/* Top-level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="dark-panel rounded-xl p-6 border-t-4 border-cyan-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Overall Accuracy
            </div>
          </div>
          <div className="text-4xl font-bold text-white mb-1">
            {(metrics.accuracy * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-slate-500">
            {metrics.correct} correct out of {metrics.totalSamples} samples
          </div>
        </div>

        {['high', 'caution', 'low'].map((band) => {
          const m = metrics.perBand[band as RiskBand];
          const colors = {
            high: 'border-red-500 text-red-400 bg-red-500/10',
            caution: 'border-amber-500 text-amber-400 bg-amber-500/10',
            low: 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
          };
          const color = colors[band as RiskBand];
          return (
            <div
              key={band}
              className={`dark-panel rounded-xl p-6 border-t-4 ${color.split(' ')[0]}`}>
              
              <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                {band} Risk Band
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">F1 Score</span>
                  <span className="text-sm font-mono text-white">
                    {m.f1.toFixed(3)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Precision</span>
                  <span className="text-sm font-mono text-white">
                    {m.precision.toFixed(3)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Recall</span>
                  <span className="text-sm font-mono text-white">
                    {m.recall.toFixed(3)}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xs text-slate-500">Support (n)</span>
                  <span className="text-xs font-mono text-slate-400">
                    {m.support}
                  </span>
                </div>
              </div>
            </div>);

        })}
      </div>

      {/* Detailed Results */}
      <div className="dark-panel rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 bg-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            Corpus Results
          </h3>
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-slate-300 focus:outline-none focus:border-cyan-500">
              
              <option value="all">All Categories</option>
              {categories.map((c) =>
              <option key={c} value={c}>
                  {c.replace('_', ' ')}
                </option>
              )}
            </select>
            <div className="flex bg-black/50 border border-white/10 rounded-lg p-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${filter === 'all' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>
                
                All
              </button>
              <button
                onClick={() => setFilter('correct')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${filter === 'correct' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}>
                
                Correct
              </button>
              <button
                onClick={() => setFilter('incorrect')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${filter === 'incorrect' ? 'bg-red-500/20 text-red-400' : 'text-slate-400 hover:text-white'}`}>
                
                Errors
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
          {filteredResults.map(({ sample, analysis, isCorrect }) =>
          <div
            key={sample.id}
            className={`p-4 transition-colors hover:bg-white/[0.02] ${!isCorrect ? 'bg-red-500/[0.02]' : ''}`}>
            
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-1">
                  {isCorrect ?
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> :

                <XCircle className="w-5 h-5 text-red-500" />
                }
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-slate-500">
                      {sample.id}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                      {sample.category.replace('_', ' ')}
                    </span>
                    {!isCorrect &&
                  <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-[10px] font-medium text-red-400">
                        Expected: {sample.expectedBand} | Got: {analysis.band}
                      </span>
                  }
                  </div>
                  <p className="text-sm text-slate-300 mb-3 bg-black/30 p-3 rounded-lg border border-white/5 font-mono">
                    {sample.text}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.triggered.map((ind) =>
                  <span
                    key={ind.id}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-300">
                    
                        {ind.label}{' '}
                        <span className="opacity-50">+{ind.weight}</span>
                      </span>
                  )}
                    {analysis.triggered.length === 0 &&
                  <span className="text-xs text-slate-500 italic">
                        No indicators triggered
                      </span>
                  }
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-2xl font-bold text-white">
                    {analysis.score}
                  </div>
                  <div
                  className={`text-[10px] font-bold uppercase tracking-wider ${analysis.band === 'high' ? 'text-red-400' : analysis.band === 'caution' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  
                    {analysis.band}
                  </div>
                </div>
              </div>
            </div>
          )}
          {filteredResults.length === 0 &&
          <div className="p-8 text-center text-slate-500">
              No results match the current filters.
            </div>
          }
        </div>
      </div>
    </div>);

}