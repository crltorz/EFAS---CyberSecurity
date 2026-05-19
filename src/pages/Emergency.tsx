import React, { useMemo, useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  AlertCircle,
  Search,
  Copy,
  Check,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { contacts } from '../data/contacts';
import { EMERGENCY_STEPS, NATIONAL_HOTLINES } from '../data/nationalHotlines';
import { SectionHeading } from '../components/SectionHeading';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { CitationCard } from '../components/CitationCard';

const CATEGORIES = [
  'All',
  'Police',
  'Cybercrime Units',
  'Bank & E-Wallet Fraud',
  'Government Agencies'
] as const;

export function Emergency() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredContacts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return contacts.filter((c) => {
      const matchesCategory =
        activeCategory === 'All' || c.category === activeCategory;
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.hotline.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const copyHotline = async (id: string, hotline: string) => {
    try {
      await navigator.clipboard.writeText(hotline);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Police':
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20';
      case 'Cybercrime Units':
        return 'bg-blue-500/10 text-blue-300 border-blue-500/20';
      case 'Bank & E-Wallet Fraud':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';
      default:
        return 'bg-white/5 text-slate-300 border-white/10';
    }
  };

  return (
    <div className="bg-black text-slate-100 min-h-screen">
      <div className="border-b border-white/10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 50% 0%, rgba(239, 68, 68, 0.15), transparent 65%)'
          }}
        />
        <div className="container mx-auto px-4 py-12 md:py-16 relative">
          <div className="flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-widest mb-3">
            <ShieldAlert className="w-4 h-4" />
            Immediate assistance
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3 max-w-2xl">
            Emergency Contacts & Hotlines
          </h1>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            National cybercrime and police lines plus verified local contacts for
            Surigao del Sur. If you are in immediate danger, call{' '}
            <a href="tel:911" className="text-red-400 font-semibold hover:text-red-300">
              911
            </a>{' '}
            first.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 md:py-14">
        {/* National hotlines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {NATIONAL_HOTLINES.map((line) => (
            <div
              key={line.id}
              className="dark-panel rounded-xl p-5 flex flex-col gap-3 border-red-500/10">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    {line.label}
                  </div>
                  <a
                    href={`tel:${line.tel}`}
                    className="text-2xl md:text-3xl font-bold text-cyan-300 hover:text-cyan-200 tracking-tight">
                    {line.number}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => copyHotline(line.id, line.number)}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                  aria-label={`Copy ${line.number}`}>
                  {copiedId === line.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{line.description}</p>
              {line.url && (
                <a
                  href={line.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 mt-auto">
                  Official site <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* What to do first */}
        <div className="mb-14">
          <SectionHeading
            kicker="FIRST RESPONSE"
            title="If you think you have been scammed"
            description="Follow these steps before or while contacting authorities."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {EMERGENCY_STEPS.map((item) => (
              <div
                key={item.step}
                className="dark-panel rounded-xl p-5 border-white/10">
                <div className="w-8 h-8 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-sm mb-3">
                  {item.step}
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-6 text-center">
            You can also{' '}
            <Link to="/athena" className="text-cyan-400 hover:text-cyan-300 font-medium">
              ask Athena
            </Link>{' '}
            to analyze a suspicious message, or use the{' '}
            <Link to="/fact-check" className="text-cyan-400 hover:text-cyan-300 font-medium">
              fact-check tool
            </Link>
            .
          </p>
        </div>

        <SectionHeading
          kicker="LOCAL DIRECTORY"
          title="Surigao del Sur & regional contacts"
          description="Verified numbers with source citations. Always confirm the latest details with the agency when possible."
        />

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="search"
              placeholder="Search by name, hotline, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-white/10">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
              }`}>
              {category}
            </button>
          ))}
        </div>

        {filteredContacts.length === 0 ? (
          <div className="dark-panel rounded-xl p-12 text-center">
            <AlertCircle className="w-10 h-10 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400">No contacts match your search. Try another keyword or category.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="dark-panel rounded-xl p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-5 pb-4 border-b border-white/10">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getCategoryColor(contact.category)}`}>
                    {contact.category}
                  </span>
                  <VerifiedBadge status="Officially Verified" />
                </div>

                <h3 className="text-lg font-heading font-bold text-white mb-5 leading-tight">
                  {contact.name}
                </h3>

                <div className="space-y-4 mb-8 flex-grow">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-xl font-bold text-white tracking-wide truncate">
                        {contact.hotline}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyHotline(contact.id, contact.hotline)}
                      className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white shrink-0"
                      aria-label="Copy hotline">
                      {copiedId === contact.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-slate-300 px-1">
                    <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{contact.address}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-slate-300 px-1">
                    <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span>{contact.hours}</span>
                  </div>
                </div>

                <div className="pt-5 border-t border-white/10 space-y-4">
                  <CitationCard
                    source={contact.source}
                    date={contact.lastVerified}
                    url={contact.sourceUrl}
                    className="w-full justify-center"
                  />
                  <a
                    href={`tel:${contact.hotline.replace(/[^0-9+]/g, '')}`}
                    className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 active:scale-[0.98] text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" /> Call Now
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
      </div>
    );
  }
