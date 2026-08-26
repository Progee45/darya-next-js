'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Heart, Eye, Radio, Sparkles, ExternalLink } from 'lucide-react';
import { Channel } from '@/lib/types';
import { useApp } from '@/lib/app-context';
import { Badge } from '@/components/ui/badge';
import { cn, formatNumber } from '@/lib/utils';

interface ChannelCardProps {
  channel: Channel;
  variant?: 'grid' | 'compact' | 'list';
  onQuickPlay?: (channel: Channel) => void;
}

export function ChannelCard({ channel, variant = 'grid', onQuickPlay }: ChannelCardProps) {
  const { isFavorite, toggleFavorite, t } = useApp();
  const favorited = isFavorite(channel.id);

  if (variant === 'list') {
    return (
      <div className="group flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/40 hover:shadow-md transition-all">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xl">
            {channel.flag}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Link
                href={`/live-tv/${channel.slug}`}
                className="font-semibold text-slate-900 dark:text-slate-100 hover:text-cyan-600 dark:hover:text-cyan-400 truncate"
              >
                {channel.name}
              </Link>
              <Badge variant="live" className="text-[10px] py-0 px-1.5">
                {t('liveBadge')}
              </Badge>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate" dir="rtl">
              {channel.nameFa} • {channel.categoryNameFa}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 text-xs text-slate-400 font-mono">
            <Eye className="w-3.5 h-3.5 text-cyan-500" />
            {formatNumber(channel.viewers || 0)}
          </div>
          <button
            onClick={() => toggleFavorite(channel.id)}
            className={cn(
              'p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer',
              favorited && 'text-rose-500 hover:text-rose-600'
            )}
            title={favorited ? t('removeFromFavorites') : t('addToFavorites')}
          >
            <Heart className={cn('w-4 h-4', favorited && 'fill-rose-500')} />
          </button>
          <Link
            href={`/live-tv/${channel.slug}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 text-xs font-semibold shadow-xs transition-colors"
          >
            <Play className="w-3 h-3 fill-white" />
            {t('watchLive')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Thumbnail Banner with Quick Play Button */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <Image
          src={channel.bannerImage || channel.logo || 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=800&q=80'}
          alt={channel.name}
          fill
          className="object-cover opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500"
          referrerPolicy="no-referrer"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <Badge variant="live" className="backdrop-blur-md bg-slate-950/80 text-[10px] py-0.5 px-2 shadow-md">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
              {t('liveBadge')}
            </Badge>
            <Badge
              variant={channel.country === 'Iran' || channel.country === 'persian' ? 'persian' : channel.country === 'Afghanistan' || channel.country === 'afghan' ? 'afghan' : 'secondary'}
              className="backdrop-blur-md bg-slate-950/80 text-[10px] py-0.5"
            >
              {channel.flag} {channel.country}
            </Badge>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(channel.id);
            }}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/70 backdrop-blur-md text-slate-300 hover:text-white border border-slate-700/50 shadow-md transition-colors cursor-pointer',
              favorited && 'text-rose-500 border-rose-500/40 bg-rose-950/40'
            )}
            title={favorited ? t('removeFromFavorites') : t('addToFavorites')}
          >
            <Heart className={cn('w-3.5 h-3.5', favorited && 'fill-rose-500 text-rose-500')} />
          </button>
        </div>

        {/* Center Hover Play Action Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 bg-slate-950/30 backdrop-blur-[2px]">
          <Link
            href={`/live-tv/${channel.slug}`}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 hover:scale-110 active:scale-95 transition-transform"
          >
            <Play className="h-5 w-5 fill-slate-950 ml-0.5" />
          </Link>
        </div>

        {/* Bottom Thumbnail Info */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-slate-300 z-10 font-mono">
          <span className="bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-800 text-cyan-400 font-semibold">
            {channel.quality}
          </span>
          <span className="flex items-center gap-1 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-800 text-slate-200">
            <Eye className="w-3 h-3 text-cyan-400" />
            {formatNumber(channel.viewers || 0)}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/live-tv/${channel.slug}`}
              className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1 text-base"
            >
              {channel.name}
            </Link>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5" dir="rtl">
              {channel.nameFa}
            </div>
          </div>
        </div>

        {/* Current Program Snippet */}
        {channel.epg && channel.epg.length > 0 && (
          <div className="mt-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-2 border border-slate-200/50 dark:border-slate-700/50 text-xs">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
              <span className="text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
                ON AIR
              </span>
              <span>{channel.epg[0].startTime}</span>
            </div>
            <p className="font-medium text-slate-700 dark:text-slate-300 truncate text-[11px]">
              {channel.epg[0].title}
            </p>
          </div>
        )}

        {/* Card Footer: Category & Direct Watch Action */}
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            {channel.categoryName}
          </span>
          <Link
            href={`/live-tv/${channel.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            {t('watchLive')}
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
