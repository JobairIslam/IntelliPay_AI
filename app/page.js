'use client';

import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import ChatWindow from '@/components/ChatWindow';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  
  useEffect(() => {
    const isBelowLg = () => window.matchMedia('(max-width: 1023px)').matches;
    if (sidebarOpen && isBelowLg()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Backdrop: only below lg, when sidebar open */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Close menu"
        onClick={closeSidebar}
        onKeyDown={(e) => e.key === 'Enter' && closeSidebar()}
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Main content */}
      <div className="relative flex min-w-0 flex-1 flex-col">
        {/* Hamburger: top-right, below lg only */}
        <button
          type="button"
          onClick={() => setSidebarOpen((o) => !o)}
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-md transition-colors hover:bg-[var(--bg-hover)] lg:hidden"
        >
          <Menu size={24} />
        </button>
        <div className="flex-1 min-h-0">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}
