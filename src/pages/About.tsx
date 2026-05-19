import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import {
  Shield,
  CheckCircle2,
  Database,
  Lock,
  Users,
  FileText,
  MessageSquare,
  Radar,
  BookOpen,
  Phone,
  Brain,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';

const FEATURES = [
  {
    title: 'Athena AI',
    description:
      'Chat-based verification grounded in Philippine hotlines, scam patterns, and official guidance — with sources when they apply.',
    to: '/athena',
    icon: MessageSquare
  },
  {
    title: 'Fact Check',
    description:
      'Paste suspicious SMS, links, or messages for rubric-based risk scoring and corpus matching.',
    to: '/fact-check',
    icon: Radar
  },
  {
    title: 'Verified Alerts',
    description:
      'Curated scam warnings linked to PNP-ACG, DICT, BSP, BPI, PhilSys, and other official advisories.',
    to: '/scam-alerts',
    icon: Shield
  },
  {
    title: 'Security Guides',
    description:
      'In-depth articles on phishing, SIM registration, ransomware, OFW fraud, and more — each with specific source URLs.',
    to: '/articles',
    icon: BookOpen
  },
  {
    title: 'Awareness Quiz',
    description:
      'Eight scenario-based questions with explanations tied to real Philippine enforcement agencies.',
    to: '/quiz',
    icon: Brain
  },
  {
    title: 'Emergency Directory',
    description:
      'National hotlines (911, 117, 1326, PNP-ACG) plus verified Surigao del Sur contacts with citations.',
    to: '/emergency',
    icon: Phone
  }
];

const TRUSTED_SOURCES = [
  { name: 'PNP Anti-Cybercrime Group', url: 'https://acg.pnp.gov.ph/' },
  { name: 'DICT / CERT-PH', url: 'https://www.ncert.gov.ph/' },
  { name: 'Bangko Sentral ng Pilipinas', url: 'https://www.bsp.gov.ph/' },
  { name: 'National Privacy Commission', url: 'https://privacy.gov.ph/' },
  { name: 'PhilSys / PSA', url: 'https://philsys.gov.ph/' },
  { name: 'NTC', url: 'https://ntc.gov.ph/' }
];

export function About() {
  return (
    <div className="bg-black text-slate-100 min-h-screen">
      <div className="border-b border-white/10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 30% 0%, rgba(34, 211, 238, 0.25), transparent 70%)'
          }}
        />
        <div className="container mx-auto px-4 py-14 md:py-20 max-w-4xl relative text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Shield className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-5 tracking-tight">
            About EFAS
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            <strong className="text-white font-medium">Expert for Awareness and Security</strong>{' '}
            is a research-backed platform helping Filipinos recognize scams, verify threats, and
            reach the right authorities — with citations you can check yourself.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 max-w-4xl space-y-16">
        <section>
          <SectionHeading title="Our mission" />
          <div className="dark-panel rounded-2xl p-8 border border-white/10">
            <p className="text-slate-300 leading-relaxed text-lg mb-4">
              Cybercrime in the Philippines increasingly targets everyday users through SMS,
              social media, fake lending apps, and impersonation of banks and government agencies.
              EFAS centralizes verified awareness content and practical tools so you do not have to
              guess whether a message is safe.
            </p>
            <p className="text-slate-400 leading-relaxed">
              We focus on Surigao del Sur and the wider Caraga region while publishing national
              hotlines and agency guidance that apply anywhere in the country.
            </p>
          </div>
        </section>

        <section>
          <SectionHeading
            title="What you can do on EFAS"
            description="Six connected tools — from learning to reporting."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURES.map((feature) => (
              <Link
                key={feature.to}
                to={feature.to}
                className="dark-panel rounded-xl p-6 border border-white/10 hover:border-cyan-400/30 hover:bg-white/[0.04] transition-all group flex gap-4">
                <div className="w-11 h-11 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="min-w-0 flex-grow">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {feature.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            title="How we verify information"
            description="Trust is our core feature. We maintain strict standards for every alert and guide."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="dark-panel rounded-xl p-6 border border-white/10">
              <Database className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Official sources only</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Alerts and articles link to specific pages on PNP-ACG, DICT, BSP, SEC, PhilSys, BPI,
                and similar agencies — not generic homepages alone.
              </p>
            </div>
            <div className="dark-panel rounded-xl p-6 border border-white/10">
              <FileText className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Transparent citations</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Every alert, article, quiz answer, and emergency contact shows where data came from
                and when it was last verified.
              </p>
            </div>
            <div className="dark-panel rounded-xl p-6 border border-white/10">
              <Lock className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Athena guardrails</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Athena uses verified reference material and structured verification for suspicious
                text. It cites sources when used and avoids inventing agency contacts.
              </p>
            </div>
            <div className="dark-panel rounded-xl p-6 border border-white/10">
              <Users className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Clear review status</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Community-sourced tips are labeled &quot;Under Review&quot; until checked against
                official parameters before being promoted.
              </p>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading title="Trusted data sources" />
          <div className="dark-panel rounded-2xl p-8 border border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TRUSTED_SOURCES.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 bg-zinc-900 rounded-lg border border-white/10 hover:border-cyan-400/30 hover:bg-white/[0.04] transition-all group">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-300 group-hover:text-cyan-300 flex-grow">
                    {source.name}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-gradient-to-br from-cyan-950/50 to-slate-950 border border-cyan-500/20 p-8 md:p-10 text-center">
          <h2 className="text-2xl font-heading font-bold text-white mb-3">
            Start protecting yourself today
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Take the quiz, browse verified alerts, or ask Athena about a message you received.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/quiz"
              className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg transition-colors inline-flex items-center gap-2">
              Take the quiz
            </Link>
            <Link
              to="/athena"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium rounded-lg transition-colors inline-flex items-center gap-2">
              Open Athena
            </Link>
          </div>
        </section>

        <p className="text-xs text-slate-600 text-center leading-relaxed pb-8">
          EFAS is an educational project. It does not replace law enforcement, legal advice, or your
          bank&apos;s fraud department. In an emergency, call 911 or 117.
        </p>
      </div>
    </div>
  );
}
