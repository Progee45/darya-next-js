'use client';

import React from 'react';
import { useApp } from '@/lib/app-context';
import { cn } from '@/lib/utils';

interface DaryaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export function DaryaLogo({ className, size = 'md', showSubtitle = true }: DaryaLogoProps) {
  const { language } = useApp();
  const isRtl = language === 'fa' || language === 'ps';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10',
    lg: 'w-10 h-10 sm:w-12 sm:h-12',
  };

  const textSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg md:text-xl',
    lg: 'text-xl sm:text-2xl',
  };

  return (
    <div className={cn('flex items-center gap-2 sm:gap-3 select-none min-w-0', className)}>
      {/* Brand Icon: Fluid Stream Wave with Live Pulse */}
      <div className={cn('relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-sky-400 text-white shadow-md shadow-cyan-500/25 shrink-0 transition-transform group-hover:scale-105', iconSizes[size])}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3/5 h-3/5 text-slate-950"
        >
          {/* Stylized Ocean Waves + Broadcast Signal */}
          <path d="M2 9.5c3.5-3 6.5-3 10 0s6.5 3 10 0" />
          <path d="M2 14.5c3.5-3 6.5-3 10 0s6.5 3 10 0" />
          <circle cx="12" cy="4" r="1.5" fill="currentColor" />
        </svg>

        {/* Live Broadcast Signal Dot */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-rose-500 border-2 border-white dark:border-slate-950"></span>
        </span>
      </div>

      {/* Brand Name & Dynamic Subtitle */}
      <div className="flex flex-col justify-center min-w-0">
        <div className={cn('font-black tracking-tight leading-none text-slate-900 dark:text-white flex items-center gap-0.5 whitespace-nowrap', textSizes[size])}>
          <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            darya
          </span>
          <span className="text-cyan-500 dark:text-cyan-400 font-extrabold">.stream</span>
        </div>

        {showSubtitle && (
          <div className="hidden sm:flex items-center gap-1.5 mt-0.5 sm:mt-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
            {isRtl ? (
              <span dir="rtl" className="text-cyan-600 dark:text-cyan-400">
                دریا استریم • پخش زنده
              </span>
            ) : (
              <span className="uppercase text-[9px] tracking-widest text-slate-500 dark:text-slate-400">
                Live Persian & Afghan TV
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
