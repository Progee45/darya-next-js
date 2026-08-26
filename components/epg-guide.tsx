'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, Play, Calendar, Search } from 'lucide-react';
import { CHANNELS } from '@/lib/channels-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/lib/app-context';
import { cn } from '@/lib/utils';

export function EPGGuide() {
  const { t, language } = useApp();
  const [selectedCountry, setSelectedCountry] = useState<'all' | 'persian' | 'afghan'>('all');
  const [search, setSearch] = useState('');

  const filteredChannels = CHANNELS.filter((ch) => {
    if (selectedCountry !== 'all') {
      const matchIran = selectedCountry === 'persian' && (ch.country === 'Iran' || ch.country === 'persian');
      const matchAfghan = selectedCountry === 'afghan' && (ch.country === 'Afghanistan' || ch.country === 'afghan');
      if (!matchIran && !matchAfghan) return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        ch.name.toLowerCase().includes(q) ||
        ch.nameFa.includes(q) ||
        ch.epg.some((p) => p.title.toLowerCase().includes(q) || p.titleFa.includes(q))
      );
    }
    return true;
  });

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm p-4 sm:p-6 space-y-6">
      {/* Header & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-500" />
              {t('navGuide')}
            </h2>
            <Badge variant="live" className="text-[10px]">REAL-TIME</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1" dir="rtl">
            جدول زمان‌بندی و راهنمای پخش برنامه‌های زنده شبکه‌های فارسی و افغانستان
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setSelectedCountry('all')}
              className={cn(
                'px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer',
                selectedCountry === 'all'
                  ? 'bg-white dark:bg-cyan-500 text-slate-900 dark:text-slate-950 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              )}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCountry('persian')}
              className={cn(
                'px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer',
                selectedCountry === 'persian'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              )}
            >
              🇮🇷 Iran
            </button>
            <button
              onClick={() => setSelectedCountry('afghan')}
              className={cn(
                'px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer',
                selectedCountry === 'afghan'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              )}
            >
              🇦🇫 Afghan
            </button>
          </div>

          <div className="relative w-40 sm:w-48">
            <Input
              placeholder={t('navSearchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 text-xs pl-7"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Guide Channel Program Schedule Rows */}
      <div className="space-y-4">
        {filteredChannels.map((channel) => (
          <div
            key={channel.id}
            className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-4 hover:border-cyan-500/40 transition-all"
          >
            {/* Channel Top Header */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">{channel.flag}</span>
                <div>
                  <Link
                    href={`/live-tv/${channel.slug}`}
                    className="font-bold text-slate-900 dark:text-slate-100 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm flex items-center gap-1.5"
                  >
                    {channel.name}
                    <Badge variant="secondary" className="text-[10px] py-0">
                      {channel.quality}
                    </Badge>
                  </Link>
                  <span className="text-xs text-slate-500 dark:text-slate-400" dir="rtl">
                    {channel.nameFa}
                  </span>
                </div>
              </div>

              <Link href={`/live-tv/${channel.slug}`}>
                <Button size="sm" variant="default" className="text-xs gap-1.5 h-7">
                  <Play className="w-3 h-3 fill-current" />
                  {t('watchLive')}
                </Button>
              </Link>
            </div>

            {/* Program Timeline Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {channel.epg.map((prog, idx) => (
                <div
                  key={prog.id || idx}
                  className={cn(
                    'relative rounded-lg p-3 border transition-all text-xs flex flex-col justify-between',
                    prog.isLive
                      ? 'bg-cyan-500/10 dark:bg-cyan-950/30 border-cyan-500/40 shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80'
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1.5">
                      <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                        <Clock className="w-3 h-3 text-cyan-500" />
                        {prog.startTime} - {prog.endTime}
                      </span>
                      {prog.isLive ? (
                        <Badge variant="live" className="text-[9px] py-0 px-1.5">
                          NOW PLAYING
                        </Badge>
                      ) : (
                        <span className="text-[10px] text-slate-400">{prog.category}</span>
                      )}
                    </div>

                    <div className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">
                      {prog.title}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5 line-clamp-1" dir="rtl">
                      {prog.titleFa}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                    {prog.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
