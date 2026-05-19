import React, { useState, Children } from 'react';
import { Filter, Radio, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { scamAlerts } from '../data/scamAlerts';
import { SeverityBadge } from '../components/SeverityBadge';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { CategoryImage } from '../components/CategoryImage';
import { ExternalLink } from 'lucide-react';
export function ScamAlerts() {
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const filteredAlerts =
  severityFilter === 'All' ?
  scamAlerts :
  scamAlerts.filter((alert) => alert.severity === severityFilter);
  const heroAlert = filteredAlerts[0];
  const restAlerts = filteredAlerts.slice(1);
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 12
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35
      }
    }
  };
  return (
    <div className="bg-black text-slate-100 pb-20">
      {/* Page header */}
      <div className="border-b border-white/10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
            'radial-gradient(circle, rgba(103,186,244,0.4) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }} />
        
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-500/10 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 py-14 md:py-24 relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              Live
            </div>
            <span className="text-xs font-semibold text-cyan-300 uppercase tracking-widest flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" />
              Real-Time Threat Feed
            </span>
          </div>
          <h1 className="text-white text-4xl md:text-6xl font-heading font-bold tracking-tight leading-[1.05] mb-5 max-w-3xl">
            Verified Scam Alerts
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            Real-time updates on active scams and cyber threats targeting
            Filipinos. Every alert is verified against official PNP-ACG, DICT,
            and BSP advisories before publication.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-10">
        {/* Filters */}
        <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/10 overflow-x-auto">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-400 mr-2 shrink-0">
            <Filter className="w-4 h-4" />
            Severity:
          </div>
          {['All', 'Critical', 'High', 'Medium', 'Low'].map((level) =>
          <button
            key={level}
            onClick={() => setSeverityFilter(level)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${severityFilter === level ? 'bg-white text-slate-900 border border-white' : 'bg-white/[0.04] border border-white/10 text-slate-300 hover:border-white/30 hover:text-white'}`}>
            
              {level}
            </button>
          )}
        </div>

        {/* Hero alert */}
        {heroAlert &&
        <div className="group relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 mb-16 cursor-pointer">
            <CategoryImage
              category={heroAlert.category}
              topicId={heroAlert.id}
              topicKind="alert"
              alt={heroAlert.title}
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-[1.02] transition-all duration-500"
            />
          
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
            <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10 lg:p-14 max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <SeverityBadge level={heroAlert.severity} />
                <VerifiedBadge status={heroAlert.status} />
              </div>
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-widest mb-3">
                {heroAlert.category}
              </span>
              <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-4 group-hover:text-cyan-200 transition-colors">
                {heroAlert.title}
              </h2>
              <p className="text-slate-300 leading-relaxed mb-5 md:text-lg">
                {heroAlert.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <a
                  href={heroAlert.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-1">
                  {heroAlert.source}
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {heroAlert.date}
                </span>
              </div>
            </div>
          </div>
        }

        {/* Grid */}
        {restAlerts.length > 0 &&
        <>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1 h-5 bg-cyan-400 rounded-full" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                More Active Alerts
              </span>
            </div>

            <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            
              {restAlerts.map((alert) =>
            <motion.article variants={itemVariants} key={alert.id}>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 border border-white/10 mb-5 relative group cursor-pointer">
                    <CategoryImage
                      category={alert.category}
                      topicId={alert.id}
                      topicKind="alert"
                      alt={alert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                
                    <div className="absolute top-3 left-3">
                      <SeverityBadge level={alert.severity} />
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-cyan-300 uppercase tracking-widest mb-2 block">
                    {alert.category}
                  </span>
                  <h3 className="text-white text-xl font-heading font-bold leading-snug mb-3">
                    {alert.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {alert.description}
                  </p>
                  <motion.div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
                    <a
                      href={alert.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-1">
                      {alert.source}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <VerifiedBadge status={alert.status} />
                  </motion.div>
                </motion.article>
            )}
            </motion.div>
          </>
        }

        {filteredAlerts.length === 0 &&
        <div className="text-center py-20 dark-panel rounded-xl">
            <Filter className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-white text-lg font-heading font-medium mb-2">
              No alerts match this filter
            </h3>
            <p className="text-slate-400">
              Try selecting a different severity level.
            </p>
          </div>
        }
      </div>
    </div>);

}