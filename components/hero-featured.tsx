'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Play,
  Radio,
  Sparkles,
  Eye,
  Layers,
  Heart,
  ChevronRight,
  Shield,
  Zap,
  Globe
} from 'lucide-react';
import { Channel } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useApp } from '@/lib/app-context';
import { cn, formatNumber } from '@/lib/utils';

export function HeroFeatured({ featuredChannels }: { featuredChannels: Channel[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isFavorite, toggleFavorite, t } = useApp();

  const current = featuredChannels[currentIndex] || featuredChannels[0];
  if (!current) return null;

  const currentProgram = current.epg.find((p) => p.isLive) || current.epg[0];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl text-white">
      {/* Background Hero Banner with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={current.bannerImage || current.logo || 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=1920&q=80'}
          alt={current.name}
          fill
          priority
          className="object-cover opacity-35 blur-xs scale-105 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 p-4 sm:p-8 lg:p-12 flex flex-col justify-between min-h-[340px] sm:min-h-[440px]">
        {/* Top Badges & Live Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <Badge variant="live" className="text-[11px] sm:text-xs py-0.5 sm:py-1 px-2.5 sm:px-3 shadow-lg">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-rose-500 animate-ping mr-1" />
              {t('featuredLive')}
            </Badge>
            <Badge
              variant={current.country === 'Iran' || current.country === 'persian' ? 'persian' : current.country === 'Afghanistan' || current.country === 'afghan' ? 'afghan' : 'secondary'}
              className="text-[11px] sm:text-xs py-0.5 sm:py-1 px-2 sm:px-3 backdrop-blur-md"
            >
              {current.flag} {current.countryName}
            </Badge>
            <Badge variant="hd" className="text-[11px] sm:text-xs py-0.5 sm:py-1 px-2 backdrop-blur-md">
              {current.quality}
            </Badge>
          </div>

          {/* Quick Switch Tabs for Featured Channels */}
          <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md p-1 rounded-xl border border-slate-800 overflow-x-auto no-scrollbar max-w-full self-start sm:self-auto">
            {featuredChannels.slice(0, 4).map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  'px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer select-none whitespace-nowrap shrink-0',
                  currentIndex === idx
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                )}
              >
                {ch.name}
              </button>
            ))}
          </div>
        </div>

        {/* Center Main Title & Program Pitch */}
        <div className="my-4 sm:my-6 max-w-2xl space-y-2 sm:space-y-3 min-w-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span className="text-2xl sm:text-3xl shrink-0">{current.flag}</span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-md truncate">
              {current.name}
            </h1>
          </div>

          <p className="text-xs sm:text-base text-cyan-300 font-medium" dir="rtl">
            {current.nameFa} • {current.categoryNameFa}
          </p>

          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed max-w-xl">
            {current.description}
          </p>

          {/* Current Program Live Tag */}
          {currentProgram && (
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-slate-900/90 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl border border-slate-700/60 text-[11px] sm:text-xs text-slate-200 max-w-full">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <span className="text-cyan-400 font-semibold shrink-0">ON AIR:</span>
              <span className="font-medium truncate">{currentProgram.title}</span>
              <span className="text-slate-400 font-mono shrink-0">({currentProgram.startTime})</span>
            </div>
          )}
        </div>

        {/* Bottom CTA Action Buttons & Viewer Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 sm:pt-4 border-t border-slate-800/80">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <Link href={`/live-tv/${current.slug}`} className="flex-1 sm:flex-none">
              <Button size="lg" variant="glow" className="w-full sm:w-auto gap-2 text-xs sm:text-sm h-10 sm:h-12 px-4 sm:px-6">
                <Play className="w-4 h-4 fill-current" />
                {t('watchLive')}
              </Button>
            </Link>

            <Link href={`/multiview?add=${current.id}`} className="flex-1 sm:flex-none">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-xs sm:text-sm h-10 sm:h-12 px-3 sm:px-5 bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800">
                <Layers className="w-4 h-4 text-cyan-400" />
                {t('navMultiView')}
              </Button>
            </Link>

            <Button
              size="icon"
              variant="outline"
              onClick={() => toggleFavorite(current.id)}
              className={cn(
                'h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white cursor-pointer shrink-0',
                isFavorite(current.id) && 'text-rose-500 border-rose-500/50 bg-rose-950/40'
              )}
              title={isFavorite(current.id) ? t('removeFromFavorites') : t('addToFavorites')}
            >
              <Heart className={cn('w-4 h-4 sm:w-5 sm:h-5', isFavorite(current.id) && 'fill-rose-500 text-rose-500')} />
            </Button>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-slate-800">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-bold text-white">{formatNumber(current.viewers || 0)}</span>
              <span className="text-slate-400 text-[11px]">{t('viewers')}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-slate-800 text-emerald-400">
              <Zap className="w-3.5 h-3.5" />
              <span className="text-[11px]">1080p HD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
