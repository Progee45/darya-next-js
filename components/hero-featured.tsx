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
      <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[380px] sm:min-h-[440px]">
        {/* Top Badges & Live Status */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="live" className="text-xs py-1 px-3 shadow-lg">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping mr-1" />
              {t('featuredLive')}
            </Badge>
            <Badge
              variant={current.country === 'Iran' || current.country === 'persian' ? 'persian' : current.country === 'Afghanistan' || current.country === 'afghan' ? 'afghan' : 'secondary'}
              className="text-xs py-1 px-3 backdrop-blur-md"
            >
              {current.flag} {current.countryName} ({current.countryNameFa})
            </Badge>
            <Badge variant="hd" className="text-xs py-1 px-2.5 backdrop-blur-md">
              {current.quality} • {current.fps} FPS
            </Badge>
          </div>

          {/* Quick Switch Tabs for Featured Channels */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md p-1 rounded-xl border border-slate-800">
            {featuredChannels.slice(0, 4).map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer select-none',
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
        <div className="my-6 max-w-2xl space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">{current.flag}</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-md">
              {current.name}
            </h1>
          </div>

          <p className="text-sm sm:text-base text-cyan-300 font-medium" dir="rtl">
            {current.nameFa} • {current.categoryNameFa}
          </p>

          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed max-w-xl">
            {current.description}
          </p>

          {/* Current Program Live Tag */}
          {currentProgram && (
            <div className="inline-flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/60 text-xs text-slate-200">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-semibold">ON AIR:</span>
              <span className="font-medium truncate max-w-xs">{currentProgram.title}</span>
              <span className="text-slate-400 font-mono">({currentProgram.startTime})</span>
            </div>
          )}
        </div>

        {/* Bottom CTA Action Buttons & Viewer Stats */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center gap-3">
            <Link href={`/live-tv/${current.slug}`}>
              <Button size="lg" variant="glow" className="gap-2 text-sm">
                <Play className="w-4 h-4 fill-current" />
                {t('watchLive')}
              </Button>
            </Link>

            <Link href={`/multiview?add=${current.id}`}>
              <Button size="lg" variant="outline" className="gap-2 text-sm bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800">
                <Layers className="w-4 h-4 text-cyan-400" />
                {t('navMultiView')}
              </Button>
            </Link>

            <Button
              size="icon"
              variant="outline"
              onClick={() => toggleFavorite(current.id)}
              className={cn(
                'h-12 w-12 rounded-xl bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white cursor-pointer',
                isFavorite(current.id) && 'text-rose-500 border-rose-500/50 bg-rose-950/40'
              )}
              title={isFavorite(current.id) ? t('removeFromFavorites') : t('addToFavorites')}
            >
              <Heart className={cn('w-5 h-5', isFavorite(current.id) && 'fill-rose-500 text-rose-500')} />
            </Button>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white">{formatNumber(current.viewers || 0)}</span>
              <span className="text-slate-400">{t('viewers')}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-emerald-400">
              <Zap className="w-4 h-4" />
              <span>1080p HD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
