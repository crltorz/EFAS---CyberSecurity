import React, { useState, Children } from 'react';
import { Search, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { articles } from '../data/articles';
import { Link } from 'react-router-dom';
import { CategoryImage } from '../components/CategoryImage';
export function Articles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = [
  'All',
  'Scam Awareness',
  'Privacy',
  'Passwords',
  'Online Safety',
  'Phishing',
  'Financial Fraud',
  'Workplace & Business',
  'AI Threats'];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
    activeCategory === 'All' || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  const showHero =
  searchQuery === '' &&
  activeCategory === 'All' &&
  filteredArticles.length > 0;
  const heroArticle = showHero ? filteredArticles[0] : null;
  const secondaryArticles = showHero ? filteredArticles.slice(1, 3) : [];
  const gridArticles = showHero ? filteredArticles.slice(3) : filteredArticles;
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
        
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 py-14 md:py-24 relative">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-widest mb-4">
            <BookOpen className="w-4 h-4" />
            EFAS Insights
          </div>
          <h1 className="text-white text-4xl md:text-6xl font-heading font-bold tracking-tight leading-[1.05] mb-5 max-w-3xl">
            Verified guides to staying safe online.
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            In-depth, source-cited articles on the cyber threats actually
            targeting Filipinos — written from advisories by PNP-ACG, DICT, BSP,
            and global frameworks.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-10">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12 items-stretch lg:items-center justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search guides…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.06] transition-all placeholder:text-slate-500" />
            
          </div>
          <div className="flex flex-wrap gap-2 overflow-x-auto">
            {categories.map((category) =>
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${activeCategory === category ? 'bg-white text-slate-900 border border-white' : 'bg-white/[0.04] border border-white/10 text-slate-300 hover:border-white/30 hover:text-white'}`}>
              
                {category}
              </button>
            )}
          </div>
        </div>

        {/* Hero block */}
        {heroArticle &&
        <div className="mb-16 pb-16 border-b border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <Link
              to={`/articles/${heroArticle.id}`}
              className="lg:col-span-8 group block">
              
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 mb-6">
                  <CategoryImage
                    category={heroArticle.category}
                    topicId={heroArticle.id}
                    topicKind="article"
                    alt={heroArticle.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                
                </div>
                <div className="flex items-center gap-2 text-xs mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 font-semibold">
                    {heroArticle.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {heroArticle.readTime}
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400">{heroArticle.date}</span>
                </div>
                <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-[1.1] tracking-tight mb-4 group-hover:text-cyan-300 transition-colors">
                  {heroArticle.title}
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed mb-5 max-w-2xl">
                  {heroArticle.summary}
                </p>
                <div className="text-xs text-slate-500">
                  By{' '}
                  <span className="font-semibold text-slate-300">
                    {heroArticle.sourceFullName}
                  </span>
                </div>
              </Link>

              <div className="lg:col-span-4 flex flex-col gap-8">
                {secondaryArticles.map((article) =>
              <Link
                key={article.id}
                to={`/articles/${article.id}`}
                className="group block flex-1">
                
                    <div className="aspect-[16/9] rounded-xl overflow-hidden bg-zinc-900 border border-white/10 mb-4">
                      <CategoryImage
                        category={article.category}
                        topicId={article.id}
                        topicKind="article"
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-[11px] mb-2">
                      <span className="text-cyan-300 font-semibold uppercase tracking-wider">
                        {article.category}
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400">{article.readTime}</span>
                    </div>
                    <h3 className="text-white text-xl font-heading font-bold leading-snug mb-2 group-hover:text-cyan-300 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                      {article.summary}
                    </p>
                  </Link>
              )}
              </div>
            </div>
          </div>
        }

        {/* Grid */}
        {gridArticles.length > 0 ?
        <>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1 h-5 bg-cyan-400 rounded-full" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                {showHero ?
              'More Stories' :
              `${filteredArticles.length} Result${filteredArticles.length === 1 ? '' : 's'}`}
              </span>
            </div>

            <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            
              {gridArticles.map((article) =>
            <motion.div variants={itemVariants} key={article.id}>
                  <Link
                to={`/articles/${article.id}`}
                className="group block h-full">
                
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 border border-white/10 mb-5">
                      <CategoryImage
                        category={article.category}
                        topicId={article.id}
                        topicKind="article"
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                  
                    </div>
                    <div className="flex items-center gap-2 text-[11px] mb-3">
                      <span className="text-cyan-300 font-semibold uppercase tracking-wider">
                        {article.category}
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-white text-xl font-heading font-bold leading-snug mb-2 group-hover:text-cyan-300 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="text-xs text-slate-500">
                      By{' '}
                      <span className="font-semibold text-slate-300">
                        {article.source}
                      </span>{' '}
                      · {article.date}
                    </div>
                  </Link>
                </motion.div>
            )}
            </motion.div>
          </> :

        !heroArticle &&
        <div className="text-center py-20 dark-panel rounded-xl">
              <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-white text-lg font-heading font-medium mb-2">
                No articles found
              </h3>
              <p className="text-slate-400">
                Try adjusting your search or category filter.
              </p>
            </div>

        }
      </div>
    </div>);

}