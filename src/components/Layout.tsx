import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';
import { Footer } from './Footer';
import { Toaster } from 'sonner';
export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-slate-100">
      <TopNav />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff'
          }
        }} />
      
    </div>);

}