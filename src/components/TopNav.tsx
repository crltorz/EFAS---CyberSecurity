import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { EfasLogo } from './EfasLogo';
export function TopNav() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Articles',
    path: '/articles'
  },
  {
    name: 'Alerts',
    path: '/scam-alerts'
  },
  {
    name: 'Verify',
    path: '/fact-check'
  },
  {
    name: 'Athena',
    path: '/athena'
  },
  {
    name: 'Emergency',
    path: '/emergency'
  },
  {
    name: 'Quiz',
    path: '/quiz'
  },
  {
    name: 'About',
    path: '/about'
  }];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 pt-5">
        <div className="flex items-center justify-between gap-3">
          {/* 1. LEFT: Brand mark (always visible, no pill) */}
          <Link to="/" className="flex items-center group z-20">
            <EfasLogo size={32} withWordmark />
          </Link>

          {/* 2. CENTER: Dark pill with all nav links (desktop only) */}
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 px-2 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl">
            {navItems.map((item) => {
              const isActive =
              location.pathname === item.path ||
              item.path !== '/' && location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors z-10">
                  
                  <span
                    className={
                    isActive ?
                    'text-slate-900' :
                    'text-slate-300 hover:text-white'
                    }>
                    
                    {item.name}
                  </span>
                  {isActive &&
                  <motion.div
                    layoutId="nav-pill-active"
                    className="absolute inset-0 bg-white rounded-full -z-10"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 32
                    }} />

                  }
                </Link>);

            })}
          </nav>

          {/* 3. RIGHT: Solid white CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-3 z-20">
            <Link
              to="/fact-check"
              className="hidden sm:flex items-center gap-1.5 px-5 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-900 text-sm font-semibold transition-colors">
              
              Verify Now <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-nav-menu">
              
              {isOpen ?
              <X className="w-4 h-4" /> :

              <Menu className="w-4 h-4" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {isOpen &&
      <div
        id="mobile-nav-menu"
        className="lg:hidden mt-3 mx-4 rounded-2xl bg-black/95 border border-white/10 backdrop-blur-xl p-3 space-y-1">
          {navItems.map((item) => {
          const isActive =
          location.pathname === item.path ||
          item.path !== '/' && location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-white text-slate-900' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>
              
                {item.name}
              </Link>);

        })}
          <Link
          to="/fact-check"
          onClick={() => setIsOpen(false)}
          className="sm:hidden flex items-center justify-center gap-1.5 w-full mt-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 text-sm font-semibold">
          
            Verify Now <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      }
    </header>);

}