import React from 'react';
import { Link } from 'react-router-dom';
import { EfasLogo } from './EfasLogo';
export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="mb-5 group inline-flex">
              <EfasLogo className="text-xl" />
            </Link>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Expert for Awareness and Security. We craft real-time cyber-safety
              experiences where verified advisories, AI guidance, and
              research-backed intelligence merge into one trusted platform —
              focused on Surigao del Sur and Filipinos online everywhere.
            </p>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold text-cyan-300 uppercase tracking-widest mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link
                  to="/scam-alerts"
                  className="hover:text-white transition-colors">
                  
                  Scam Alerts
                </Link>
              </li>
              <li>
                <Link
                  to="/fact-check"
                  className="hover:text-white transition-colors">
                  
                  Verify a Message
                </Link>
              </li>
              <li>
                <Link
                  to="/athena"
                  className="hover:text-white transition-colors">
                  
                  Athena AI
                </Link>
              </li>
              <li>
                <Link
                  to="/emergency"
                  className="hover:text-white transition-colors">
                  
                  Emergency Help
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold text-cyan-300 uppercase tracking-widest mb-4">
              Trust & Safety
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors">
                  
                  About EFAS
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors">
                  
                  Verification Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors">
                  
                  Trusted Sources
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors">
                  
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} EFAS Platform. All rights reserved.
          </p>
          <p>
            Verified intelligence sourced from PNP-ACG · DICT · BSP · NPC ·
            CERT-PH · NIST · APWG
          </p>
        </div>
      </div>
    </footer>);

}