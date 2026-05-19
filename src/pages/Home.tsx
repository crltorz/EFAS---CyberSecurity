import React, { useState, Children } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  AlertTriangle,
  MessageSquare,
  Search,
  Phone,
  ArrowRight,
  ShieldCheck,
  Lock,
  EyeOff,
  Wifi,
  FileWarning,
  BookOpen,
  ExternalLink,
  Clock,
  Sparkles,
  Newspaper,
  Star,
  CheckCircle2,
  Radar,
  TrendingUp,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight } from
'lucide-react';
import { motion } from 'framer-motion';
import { scamAlerts } from '../data/scamAlerts';
import { articles } from '../data/articles';
import { SeverityBadge } from '../components/SeverityBadge';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { CategoryImage } from '../components/CategoryImage';
export function Home() {
  const heroAlert = scamAlerts[0];
  const secondaryAlerts = scamAlerts.slice(1, 3);
  const latestGuides = articles.slice(1, 4);
  const quickActions = [
    { to: '/athena', label: 'Ask Athena', desc: 'Verify a suspicious message', icon: MessageSquare },
    { to: '/fact-check', label: 'Fact Check', desc: 'Score SMS & links', icon: Search },
    { to: '/emergency', label: 'Emergency', desc: 'Hotlines & contacts', icon: Phone },
    { to: '/quiz', label: 'Take Quiz', desc: '8 PH scam scenarios', icon: ShieldCheck }
  ];
  const [activeTab, setActiveTab] = useState('AI Analysis');
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06
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
        duration: 0.4
      }
    }
  };
  return (
    <div className="bg-black text-white -mx-4 sm:-mx-0">
      {/* ───────────── HERO ───────────── */}
      {/* Negative margin pulls the section up behind the sticky TopNav so the glow bleeds seamlessly behind the header */}
      <section className="relative overflow-hidden bg-black -mt-24 pt-44 pb-32">
        {/* Upper-left → center blue radial gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
            'radial-gradient(ellipse 90% 85% at 10% 5%, rgba(37, 99, 235, 0.55) 0%, rgba(37, 99, 235, 0.25) 35%, rgba(37, 99, 235, 0.08) 60%, transparent 80%)'
          }} />
        
        {/* Upper-left cyan accent layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
            'radial-gradient(ellipse 60% 60% at 18% 15%, rgba(34, 211, 238, 0.35) 0%, rgba(34, 211, 238, 0.12) 40%, transparent 70%)'
          }} />
        
        {/* Bottom-right → center blue radial gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
            'radial-gradient(ellipse 85% 80% at 95% 100%, rgba(29, 78, 216, 0.5) 0%, rgba(29, 78, 216, 0.22) 35%, rgba(29, 78, 216, 0.06) 60%, transparent 80%)'
          }} />
        
        {/* Bottom-right cyan accent layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
            'radial-gradient(ellipse 55% 55% at 88% 92%, rgba(34, 211, 238, 0.28) 0%, rgba(34, 211, 238, 0.08) 45%, transparent 75%)'
          }} />
        
        {/* Bottom fade — guarantees seamless blend into the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center mt-10">
          <motion.h1
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6
            }}
            className="text-white text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.1] tracking-tight max-w-4xl">
            
            Your{' '}
            <span className="relative inline-block text-cyan-400">
              Shield
              {/* Hand-drawn scribble underline */}
              <svg
                className="absolute -bottom-3 left-0 w-full h-4 text-cyan-400"
                viewBox="0 0 200 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none">
                
                <path
                  d="M2 15C45 5 120 2 198 12C150 16 80 18 10 18"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round" />
                
              </svg>
            </span>{' '}
            Against Digital Threats
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6,
              delay: 0.1
            }}
            className="text-slate-400 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
            
            Stay sharp. Stay safe. Stay one step ahead of every scam.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6,
              delay: 0.2
            }}>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/fact-check"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition-all shadow-lg shadow-cyan-600/20">
                Start verifying <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/athena"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-medium transition-all backdrop-blur-md">
                Ask Athena <MessageSquare className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────── TRUSTED BY STRIP ───────────── */}
      <section className="relative z-10 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-[11px] text-slate-500 font-medium text-center mb-6">
            Trusted data sources
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {['PNP-ACG', 'DICT', 'BSP', 'NPC', 'CERT-PH'].map((logo, i) =>
            <div
              key={logo}
              className="flex items-center justify-center w-32 md:w-40 h-16 rounded-xl bg-zinc-900/80 border border-white/5 shadow-lg backdrop-blur-sm transform hover:-translate-y-1 transition-transform"
              style={{
                transform: `perspective(500px) rotateY(${i < 2 ? '5deg' : i > 2 ? '-5deg' : '0deg'})`
              }}>
              
                <span className="text-slate-300 font-heading font-semibold tracking-wide">
                  {logo}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pb-16 relative z-10 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {quickActions.map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className="rounded-2xl bg-zinc-900/80 border border-white/10 p-5 hover:border-cyan-400/40 hover:bg-white/[0.04] transition-all group">
                <action.icon className="w-6 h-6 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-white font-semibold text-sm mb-1 group-hover:text-cyan-300">
                  {action.label}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{action.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── WHY WE'RE THE RIGHT CHOICE ───────────── */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
              Why Trust EFAS
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We don't just provide alerts; we equip you with tools to analyze,
              verify, and respond to digital threats in real-time.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12 border-b border-white/10 pb-4">
            {['AI Analysis', 'Verified Alerts', 'Emergency Directory'].map(
              (tab) =>
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative text-sm font-medium pb-4 transition-colors ${activeTab === tab ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                
                  {tab}
                  {activeTab === tab &&
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-cyan-400 rounded-t-full" />

                }
                </button>

            )}
          </div>

          {/* Side-by-side Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="rounded-2xl bg-zinc-900/80 border border-white/10 p-6 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    AI-Powered Threat Detection
                  </h3>
                  <p className="text-sm text-slate-400 max-w-xs">
                    Athena analyzes messages against official scam indicators.
                  </p>
                </div>
                <Link
                  to="/athena"
                  className="w-8 h-8 rounded-md border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors shrink-0">
                  
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="mt-auto rounded-xl bg-black/40 border border-white/5 p-8 flex items-center justify-center min-h-[240px] relative overflow-hidden">
                {/* Glowing lightbulb representation */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/30 to-transparent opacity-60" />
                <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-b from-cyan-200 to-cyan-500 flex items-center justify-center shadow-[0_0_60px_rgba(34,211,238,0.5)]">
                  <MessageSquare className="w-10 h-10 text-blue-900" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-zinc-900/80 border border-white/10 p-6 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Fact-Check Engine
                  </h3>
                  <p className="text-sm text-slate-400 max-w-xs">
                    Verify suspicious links and texts instantly.
                  </p>
                </div>
                <Link
                  to="/fact-check"
                  className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white hover:bg-blue-500 transition-colors shrink-0 shadow-lg shadow-blue-600/20">
                  
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="mt-auto rounded-xl bg-black/40 border border-white/5 p-8 flex items-center justify-center min-h-[240px] relative overflow-hidden">
                {/* Target representation */}
                <div className="relative z-10 w-32 h-32 rounded-full border-[12px] border-slate-300 flex items-center justify-center shadow-2xl bg-slate-800">
                  <div className="w-16 h-16 rounded-full border-[8px] border-slate-400 flex items-center justify-center bg-slate-700">
                    <div className="w-6 h-6 rounded-full bg-slate-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── MEET THE EXPERTS (SOURCES) ───────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Meet the Sources Behind Our Data
              </h2>
              <p className="text-slate-400 mb-6">
                With decades of experience in cybersecurity and law enforcement,
                these institutions are your trusted partners in digital safety.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-medium transition-all">
                
                Learn about our methodology <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
            {
              name: 'PNP-ACG',
              role: 'Anti-Cybercrime Group',
              icon: Shield
            },
            {
              name: 'DICT',
              role: 'Cybersecurity Bureau',
              icon: Lock
            },
            {
              name: 'BSP',
              role: 'Financial Security',
              icon: TrendingUp
            },
            {
              name: 'NPC',
              role: 'Data Privacy',
              icon: EyeOff
            }].
            map((source, i) =>
            <div
              key={i}
              className="rounded-2xl bg-zinc-900/60 border border-white/5 p-6 flex flex-col items-center text-center hover:bg-zinc-900 transition-colors">
              
                <div className="w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center mb-4 shadow-inner">
                  <source.icon className="w-6 h-6 text-slate-300" />
                </div>
                <h3 className="text-white font-semibold mb-1">{source.name}</h3>
                <p className="text-xs text-slate-500">{source.role}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/40 to-zinc-950 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
              New to digital threats?
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Take the 8-question quiz, save emergency hotlines, and learn from guides
              cited to PNP-ACG, DICT, BSP, and PhilSys.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 shrink-0">
            <Link
              to="/quiz"
              className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg transition-colors">
              Start quiz
            </Link>
            <Link
              to="/emergency"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-medium rounded-lg transition-colors">
              Emergency contacts
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── LATEST ALERTS ───────────── */}
      <section className="container mx-auto px-4 py-20 border-t border-white/5">
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-widest">
                Live · Real-Time
              </span>
            </div>
            <h2 className="text-white text-3xl md:text-4xl font-heading font-bold tracking-tight">
              Latest Verified Alerts
            </h2>
          </div>
          <Link
            to="/scam-alerts"
            className="text-sm font-medium text-cyan-400 hover:text-cyan-300 hidden sm:flex items-center gap-1">
            
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Link
            to="/scam-alerts"
            className="group relative aspect-[4/3] lg:aspect-auto lg:row-span-2 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
            
            <CategoryImage
              category={heroAlert.category}
              topicId={heroAlert.id}
              topicKind="alert"
              alt={heroAlert.title}
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-[1.03] transition-all duration-500"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <SeverityBadge level={heroAlert.severity} />
                <VerifiedBadge status={heroAlert.status} />
              </div>
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-widest mb-2">
                {heroAlert.category}
              </span>
              <h3 className="text-white text-2xl md:text-3xl font-heading font-bold leading-tight mb-3 group-hover:text-cyan-200 transition-colors">
                {heroAlert.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 line-clamp-3">
                {heroAlert.description}
              </p>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{heroAlert.source}</span>
                <span>{heroAlert.date}</span>
              </div>
            </div>
          </Link>

          {secondaryAlerts.map((alert) =>
          <Link
            key={alert.id}
            to="/scam-alerts"
            className="group flex gap-5 p-5 rounded-2xl border border-white/10 hover:border-cyan-400/40 hover:bg-white/5 transition-all">
            
              <div className="w-32 h-32 shrink-0 rounded-xl overflow-hidden bg-zinc-900 border border-white/10">
                <CategoryImage
                  category={alert.category}
                  topicId={alert.id}
                  topicKind="alert"
                  alt={alert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              
              </div>
              <div className="flex-grow min-w-0 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <SeverityBadge level={alert.severity} />
                </div>
                <span className="text-[10px] font-semibold text-cyan-300 uppercase tracking-widest mb-1.5">
                  {alert.category}
                </span>
                <h3 className="text-white text-base font-heading font-semibold leading-snug mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {alert.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-auto">
                  {alert.description}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-3 border-t border-white/10">
                  <span className="font-medium">{alert.source}</span>
                  <span>{alert.date}</span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* ───────────── LATEST GUIDES ───────────── */}
      <section className="container mx-auto px-4 py-20 border-t border-white/5">
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Newspaper className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                EFAS Insights
              </span>
            </div>
            <h2 className="text-white text-3xl md:text-4xl font-heading font-bold tracking-tight">
              Latest from the Newsroom
            </h2>
          </div>
          <Link
            to="/articles"
            className="text-sm font-medium text-cyan-400 hover:text-cyan-300 hidden sm:flex items-center gap-1">
            
            All guides <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            margin: '-50px'
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {latestGuides.map((article) =>
          <motion.div variants={itemVariants} key={article.id}>
              <Link
              to={`/articles/${article.id}`}
              className="group block h-full">
              
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 mb-5 border border-white/10">
                  <CategoryImage
                    category={article.category}
                    topicId={article.id}
                    topicKind="article"
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <span className="text-cyan-400 font-semibold uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-white text-xl font-heading font-bold leading-snug mb-3 group-hover:text-cyan-300 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
                  {article.summary}
                </p>
                <div className="text-xs text-slate-500">
                  By{' '}
                  <span className="font-semibold text-slate-300">
                    {article.sourceFullName}
                  </span>
                </div>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ───────────── Review of Related Literature ───────────── */}
      <section className="container mx-auto px-4 py-20 pb-32 border-t border-white/5">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 text-white p-8 md:p-12 mb-10 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
              'radial-gradient(circle, rgba(103,186,244,0.6) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }} />
          
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-widest mb-3">
              <BookOpen className="w-4 h-4" />
              Research-Backed
            </div>
            <h2 className="text-white text-3xl md:text-4xl font-heading font-bold mb-4 leading-tight">
              Review of Related Literature
            </h2>
            <p className="text-slate-300 leading-relaxed">
              The design and direction of EFAS is grounded in peer-reviewed
              cybersecurity research and recognized institutional guidelines.
              Below are the studies that inform our awareness strategy, threat
              detection criteria, and the role of Athena as an educational
              companion.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {[
          {
            n: '1',
            title: 'Cybersecurity Awareness and User Behavior',
            body:
            <>
                  <p>
                    Recent studies continue to show that cybersecurity awareness
                    is closely linked to safer online behavior.{' '}
                    <a
                  href="https://link.springer.com/article/10.1007/s44217-025-01084-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-200 font-medium underline decoration-cyan-500/40 hover:decoration-cyan-300 underline-offset-2">
                  
                      Ahamed (2026)
                    </a>{' '}
                    found that cybersecurity knowledge, social interaction, and
                    personal risk perception significantly shape awareness and
                    online safety behavior among Gen Z users in a
                    developing-country setting. This supports the idea that a
                    system like EFAS should not only give facts but should also
                    guide users in recognizing risk and making safer decisions.
                  </p>
                  <p>
                    Similarly,{' '}
                    <a
                  href="https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2026.1719173/full"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-200 font-medium underline decoration-cyan-500/40 hover:decoration-cyan-300 underline-offset-2">
                  
                      Chahid (2026)
                    </a>{' '}
                    proposed a cybersecurity awareness framework emphasizing the
                    need to improve understanding of digital threats, especially
                    those based on social engineering — highly relevant to
                    Athena's role as an educational chatbot.
                  </p>
                </>

          },
          {
            n: '2',
            title: 'Phishing Vulnerability Among Students and Ordinary Users',
            body:
            <p>
                  Phishing remains one of the most persistent forms of
                  cyberattack because it directly targets user judgment.{' '}
                  <a
                href="https://academic.oup.com/cybersecurity/article/11/1/tyaf034/8313771"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-cyan-200 font-medium underline decoration-cyan-500/40 hover:decoration-cyan-300 underline-offset-2">
                
                    Gwenhure et al. (2025)
                  </a>{' '}
                  reported that university students remain highly vulnerable to
                  email phishing and that awareness gaps significantly affect
                  their ability to respond safely. EFAS positions itself as a
                  user-friendly awareness tool for exactly this audience.
                </p>

          },
          {
            n: '3',
            title: 'Mobile Application Privacy and Data Collection Risks',
            body:
            <>
                  <p>
                    Privacy violations are intensified by mobile ecosystems that
                    collect large amounts of personal data. A{' '}
                    <a
                  href="https://www.researchgate.net/publication/385473436_Information_Privacy_and_User_Satisfaction_in_Mobile_Applications_A_Cross-National_Analysis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-200 font-medium underline decoration-cyan-500/40 hover:decoration-cyan-300 underline-offset-2">
                  
                      2024 cross-national study
                    </a>{' '}
                    found that data collection and sharing practices directly
                    affect user perceptions of trust.
                  </p>
                  <p>
                    Studies on{' '}
                    <a
                  href="https://dl.acm.org/doi/10.1145/3510003.3510079"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-200 font-medium underline decoration-cyan-500/40 hover:decoration-cyan-300 underline-offset-2">
                  
                      user perspectives on mobile app privacy at scale
                    </a>{' '}
                    and a broader{' '}
                    <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9789888/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-200 font-medium underline decoration-cyan-500/40 hover:decoration-cyan-300 underline-offset-2">
                  
                      survey on targeted advertising risks
                    </a>{' '}
                    document widespread concern with tracking and information
                    misuse — supporting EFAS as a privacy literacy platform.
                  </p>
                </>

          },
          {
            n: '4',
            title: 'Authentication, Passwords, and Account Protection',
            body:
            <>
                  <p>
                    <a
                  href="https://pages.nist.gov/800-63-4/sp800-63b.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-200 font-medium underline decoration-cyan-500/40 hover:decoration-cyan-300 underline-offset-2">
                  
                      NIST Special Publication 800-63B
                    </a>{' '}
                    states that phishing is a significant threat vector and that
                    stronger, phishing-resistant authentication should be
                    offered. EFAS responds by educating users about 2FA and
                    account recovery.
                  </p>
                  <p>
                    <a
                  href="https://www.nist.gov/itl/smallbusinesscyber/guidance-topic/multi-factor-authentication"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-200 font-medium underline decoration-cyan-500/40 hover:decoration-cyan-300 underline-offset-2">
                  
                      NIST's MFA guidance
                    </a>{' '}
                    further explains that passwords alone are no longer
                    sufficient — a strong institutional basis for EFAS's
                    authentication recommendations.
                  </p>
                </>

          },
          {
            n: '5',
            title: 'Policy, Institutional Behavior, and Awareness Programs',
            body:
            <p>
                  <a
                href="https://www.sciencedirect.com/science/article/pii/S2666188825011141"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-cyan-200 font-medium underline decoration-cyan-500/40 hover:decoration-cyan-300 underline-offset-2">
                
                    Oroni (2025)
                  </a>{' '}
                  found that institutional approaches matter in shaping security
                  outcomes — suggesting EFAS should function as a continuing
                  awareness mechanism rather than a one-time resource.
                </p>

          }].
          map((theme) =>
          <article
            key={theme.n}
            className="rounded-2xl dark-panel p-6 md:p-8">
            
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 flex items-center justify-center font-heading font-bold shrink-0">
                  {theme.n}
                </div>
                <h3 className="text-white text-xl md:text-2xl font-heading font-bold leading-tight pt-1">
                  {theme.title}
                </h3>
              </div>
              <div className="space-y-4 text-slate-300 leading-relaxed pl-0 md:pl-14">
                {theme.body}
              </div>
            </article>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-white text-lg font-heading font-bold mb-2">
            References
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            All cited works are linked to their original publishers.
          </p>
          <ol className="space-y-3 list-decimal pl-5 marker:text-cyan-400 marker:font-semibold">
            {[
            {
              author: 'Ahamed, B.',
              year: '2026',
              title:
              'Cybersecurity knowledge, social networking, and awareness: Examining safe online behavior among Gen Z users',
              publisher: 'Discover Computing',
              url: 'https://link.springer.com/article/10.1007/s44217-025-01084-3'
            },
            {
              author: 'Chahid, A.',
              year: '2026',
              title:
              "Developing a cybersecurity awareness framework to enhance individuals' understanding of digital threats",
              publisher: 'Frontiers in Education',
              url: 'https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2026.1719173/full'
            },
            {
              author: 'Gwenhure, A. K., et al.',
              year: '2025',
              title:
              "University students' security behavior against email phishing",
              publisher: 'Cybersecurity (Oxford Academic)',
              url: 'https://academic.oup.com/cybersecurity/article/11/1/tyaf034/8313771'
            },
            {
              author: 'National Institute of Standards and Technology',
              year: '2024',
              title: 'NIST SP 800-63B — Digital Identity Guidelines',
              publisher: 'NIST',
              url: 'https://pages.nist.gov/800-63-4/sp800-63b.html'
            },
            {
              author: 'NIST Small Business Cybersecurity Corner',
              year: 'n.d.',
              title: 'Multi-Factor Authentication guidance',
              publisher: 'NIST',
              url: 'https://www.nist.gov/itl/smallbusinesscyber/guidance-topic/multi-factor-authentication'
            },
            {
              author: 'Cross-National Research Team',
              year: '2024',
              title:
              'Information Privacy and User Satisfaction in Mobile Applications: A Cross-National Analysis',
              publisher: 'ResearchGate',
              url: 'https://www.researchgate.net/publication/385473436_Information_Privacy_and_User_Satisfaction_in_Mobile_Applications_A_Cross-National_Analysis'
            },
            {
              author: 'ACM CHI Authors',
              year: '2022',
              title: 'User perspectives on mobile app privacy at scale',
              publisher: 'ACM Digital Library',
              url: 'https://dl.acm.org/doi/10.1145/3510003.3510079'
            },
            {
              author: 'PMC Authors',
              year: '2022',
              title: 'Survey on targeted advertising and privacy risks',
              publisher: 'PubMed Central',
              url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9789888/'
            },
            {
              author: 'Oroni, M.',
              year: '2025',
              title:
              'Institutional approaches to cybersecurity awareness programs',
              publisher: 'ScienceDirect',
              url: 'https://www.sciencedirect.com/science/article/pii/S2666188825011141'
            }].
            map((ref, i) =>
            <li
              key={i}
              className="text-sm text-slate-300 leading-relaxed pl-2">
              
                <span className="font-semibold text-white">{ref.author}</span> (
                {ref.year}).{' '}
                <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-cyan-200 underline decoration-cyan-500/40 hover:decoration-cyan-300 underline-offset-2">
                
                  {ref.title}
                </a>
                . <span className="italic text-slate-400">{ref.publisher}</span>
                .
              </li>
            )}
          </ol>
        </div>
      </section>
    </div>);

}