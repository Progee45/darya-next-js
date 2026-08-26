import React from 'react';
import Link from 'next/link';
import { CHANNELS } from '@/lib/channels-data';
import { DaryaLogo } from '@/components/darya-logo';

export function Footer() {
  const persianChannels = CHANNELS.filter((c) => c.country === 'Iran' || c.country === 'persian').slice(0, 6);
  const afghanChannels = CHANNELS.filter((c) => c.country === 'Afghanistan' || c.country === 'afghan').slice(0, 6);

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="inline-block">
              <DaryaLogo size="sm" />
            </Link>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              The premier responsive portal for watching Persian and Afghan live TV channels online with high-definition streaming, satellite frequencies, and interactive TV schedules.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/50 w-fit">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              All Broadcast Feeds Operational
            </div>
          </div>

          {/* Persian Channels */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-slate-200 text-sm flex items-center gap-1.5">
              <span>🇮🇷</span> Persian Live TV (ایران)
            </h4>
            <ul className="space-y-1.5">
              {persianChannels.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/live-tv/${c.slug}`}
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {c.name} ({c.nameFa})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Afghan Channels */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-slate-200 text-sm flex items-center gap-1.5">
              <span>🇦🇫</span> Afghan Live TV (افغانستان)
            </h4>
            <ul className="space-y-1.5">
              {afghanChannels.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/live-tv/${c.slug}`}
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {c.name} ({c.nameFa})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Features & SEO Info */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-slate-200 text-sm">
              Explore Darya
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/guide" className="hover:text-cyan-600 dark:hover:text-cyan-400">
                  Electronic TV Guide (EPG)
                </Link>
              </li>
              <li>
                <Link href="/multiview" className="hover:text-cyan-600 dark:hover:text-cyan-400">
                  Multi-View Screen (2-4 Feeds)
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-cyan-600 dark:hover:text-cyan-400">
                  My Favorite Channels
                </Link>
              </li>
              <li>
                <span className="text-slate-400">Yahsat 52.5°E, Badr & Hotbird Tuning</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="border-t border-slate-100 dark:border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} darya.stream. All rights reserved. Free live Persian & Afghan broadcast streaming.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300">Privacy & Terms</span>
            <span>•</span>
            <span className="hover:text-slate-300">DMCA / Fair Use</span>
            <span>•</span>
            <span className="hover:text-slate-300">Satellite Updates</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
