'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Tv,
  Calendar,
  Layers,
  Heart,
  Moon,
  Sun,
  Menu,
  X,
  Globe,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useApp } from '@/lib/app-context';
import { Badge } from '@/components/ui/badge';
import { DaryaLogo } from '@/components/darya-logo';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, theme, setTheme } = useTheme();
  const { favorites, language, setLanguage, t } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const toggleTheme = () => {
    const currentTheme = resolvedTheme || theme;
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { href: '/', label: t('navLiveTv'), icon: Tv },
    { href: '/guide', label: t('navGuide'), icon: Calendar },
    { href: '/multiview', label: t('navMultiView'), icon: Layers, badge: 'PRO' },
    { href: '/favorites', label: t('navFavorites'), icon: Heart, count: favorites.length },
  ];

  const currentLangLabel = {
    en: 'English (EN)',
    fa: 'فارسی / دری',
    ps: 'پښتو',
  }[language] || 'EN';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center group">
            <DaryaLogo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all',
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <Badge variant="live" className="text-[9px] py-0 px-1 font-mono">
                      {link.badge}
                    </Badge>
                  )}
                  {link.count !== undefined && link.count > 0 && (
                    <span className="text-[10px] bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold px-1.5 py-0.2 rounded-full">
                      {link.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Tools: Language, Dark/Light Mode, Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shadow-2xs"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-500" />
              <span suppressHydrationWarning>{currentLangLabel}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-1.5 z-50 text-xs animate-in fade-in">
                <button
                  onClick={() => {
                    setLanguage('en');
                    setLangMenuOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-lg text-left cursor-pointer transition-colors',
                    language === 'en' ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">English</span>
                    <span className="text-[10px] text-slate-400">International</span>
                  </div>
                  <span>🇬🇧</span>
                </button>

                <button
                  onClick={() => {
                    setLanguage('fa');
                    setLangMenuOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-lg text-left cursor-pointer transition-colors',
                    language === 'fa' ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >
                  <div className="flex flex-col text-right" dir="rtl">
                    <span className="font-bold font-sans">فارسی / دری</span>
                    <span className="text-[10px] text-slate-400">ایران و افغانستان</span>
                  </div>
                  <span>🇮🇷 🇦🇫</span>
                </button>

                <button
                  onClick={() => {
                    setLanguage('ps');
                    setLangMenuOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-lg text-left cursor-pointer transition-colors',
                    language === 'ps' ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >
                  <div className="flex flex-col text-right" dir="rtl">
                    <span className="font-bold font-sans">پښتو</span>
                    <span className="text-[10px] text-slate-400">افغانستان</span>
                  </div>
                  <span>🇦🇫</span>
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle Button (Dark / Light) */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shadow-2xs"
            title="Toggle Dark / Light Mode"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-cyan-400" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </div>
                {link.count !== undefined && link.count > 0 && (
                  <Badge variant="live" className="text-xs">
                    {link.count}
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
