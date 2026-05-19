import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Calendar,
  ShieldCheck,
  ExternalLink,
  Building2 } from
'lucide-react';
import { articles } from '../data/articles';
import { DEFAULT_LAST_VERIFIED } from '../types/content';
import { CategoryImage } from '../components/CategoryImage';
export function ArticleDetail() {
  const { id } = useParams<{
    id: string;
  }>();
  const article = articles.find((a) => a.id === id);
  if (!article) {
    return <Navigate to="/articles" replace />;
  }
  const relatedArticles = articles.
  filter((a) => a.id !== article.id && a.category === article.category).
  slice(0, 3);
  return (
    <div className="bg-black text-slate-100">
      <div className="container mx-auto px-4 py-10 md:py-14 max-w-5xl">
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors mb-8">
          
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>

        {/* Hero Image */}
        <div className="aspect-[16/8] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 mb-10">
          <CategoryImage
            category={article.category}
            topicId={article.id}
            topicKind="article"
            alt={article.title}
            className="w-full h-full object-cover"
          />
          
        </div>

        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6">
              <span className="px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 font-medium">
                {article.category}
              </span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {article.date}
              </div>
            </div>
            <h1 className="text-white text-4xl md:text-5xl font-heading font-bold leading-tight tracking-tight mb-6">
              {article.title}
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              {article.summary}
            </p>
          </header>

          {/* Verified Source Callout */}
          <div className="dark-panel rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-cyan-300" />
              </div>
              <div>
                <div className="text-xs font-semibold text-cyan-300 uppercase tracking-widest mb-1">
                  Officially Verified Content
                </div>
                <div className="font-medium text-white mb-1">
                  {article.sourceFullName}
                </div>
                <div className="text-sm text-slate-400">
                  Published: {article.date}
                </div>
                <div className="text-sm text-slate-400">
                  Last verified:{' '}
                  {article.lastVerifiedAt ?? DEFAULT_LAST_VERIFIED}
                </div>
              </div>
            </div>
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] active:scale-[0.98] border border-white/15 text-white text-sm font-medium rounded-full transition-all flex items-center justify-center gap-2 shrink-0">
              
              Visit Official Source <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Content */}
          <div
            className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-slate-300 prose-headings:font-heading prose-headings:text-white prose-a:text-cyan-300 hover:prose-a:text-cyan-200 prose-strong:text-white mb-16"
            dangerouslySetInnerHTML={{
              __html: article.content || ''
            }} />
          

          {/* Reliable Authorities */}
          {article.authorities && article.authorities.length > 0 &&
          <div className="mb-16">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-cyan-300" />
                <h3 className="text-white text-lg font-heading font-semibold">
                  Reliable Authorities on This Threat
                </h3>
              </div>
              <p className="text-sm text-slate-400 mb-5">
                If you are affected by what's described above, these are the
                verified Philippine agencies and channels with jurisdiction and
                capability to help.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {article.authorities.map((auth, i) =>
              <a
                key={i}
                href={auth.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-cyan-400/30 transition-all">
                
                    <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 group-hover:bg-cyan-400/20 transition-colors">
                      <Building2 className="w-5 h-5 text-cyan-300" />
                    </div>
                    <div className="min-w-0 flex-grow">
                      <div className="font-semibold text-white text-sm mb-1 group-hover:text-cyan-300 transition-colors">
                        {auth.name}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-2">
                        {auth.role}
                      </p>
                      <div className="text-xs text-slate-500 font-mono break-words">
                        {auth.contact}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 transition-colors shrink-0" />
                  </a>
              )}
              </div>
            </div>
          }

          {/* Sources Footer */}
          <div className="pt-8 border-t border-white/10 mb-16">
            <h3 className="text-white text-lg font-heading font-semibold mb-4">
              Sources & References
            </h3>
            <div className="space-y-3">
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dark-panel rounded-xl p-4 flex items-center gap-3 group hover:border-cyan-400/30 transition-colors">
                <ShieldCheck className="w-5 h-5 text-cyan-300 shrink-0" />
                <div className="min-w-0 flex-grow">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                    Primary source
                  </div>
                  <div className="font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                    {article.sourceFullName}
                  </div>
                  <div className="text-sm text-cyan-400/90 truncate">
                    {article.sourceUrl}
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 shrink-0" />
              </a>
              {article.references?.map((ref, i) => (
                <a
                  key={i}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark-panel rounded-xl p-4 flex items-center gap-3 group hover:border-cyan-400/30 transition-colors">
                  <ExternalLink className="w-5 h-5 text-cyan-300 shrink-0" />
                  <div className="min-w-0 flex-grow">
                    <div className="font-medium text-slate-200 group-hover:text-cyan-300 transition-colors text-sm">
                      {ref.title}
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {ref.url}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 &&
        <div className="pt-12 border-t border-white/10">
            <h3 className="text-white text-2xl font-heading font-bold mb-6">
              Related Guides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) =>
            <Link
              to={`/articles/${related.id}`}
              key={related.id}
              className="rounded-xl overflow-hidden flex flex-col group border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-cyan-400/30 transition-all">
              
                  <div className="aspect-video w-full overflow-hidden bg-zinc-900">
                    <CategoryImage
                      category={related.category}
                      topicId={related.id}
                      topicKind="article"
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                
                  </div>
                  <div className="p-5 flex-grow">
                    <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-3 block">
                      {related.category}
                    </span>
                    <h4 className="text-white text-lg font-heading font-semibold mb-3 group-hover:text-cyan-300 transition-colors leading-snug">
                      {related.title}
                    </h4>
                  </div>
                  <div className="px-5 py-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-300">
                      {related.source}
                    </span>
                    <span>{related.date}</span>
                  </div>
                </Link>
            )}
            </div>
          </div>
        }
      </div>
    </div>);

}
