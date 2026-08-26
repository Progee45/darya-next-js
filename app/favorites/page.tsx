'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Tv, ArrowLeft, Sparkles, Play } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { CHANNELS } from '@/lib/channels-data';
import { ChannelCard } from '@/components/channel-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function FavoritesPage() {
  const { favorites } = useApp();

  const favoriteChannels = CHANNELS.filter((ch) => favorites.includes(ch.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              My Favorite Channels (علاقه‌مندی‌ها)
            </h1>
            <Badge variant="live" className="text-xs">
              {favoriteChannels.length} Saved
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Quickly tune in to your saved Persian and Afghan live TV streams.
          </p>
        </div>

        <Link href="/">
          <Button variant="outline" size="sm" className="text-xs gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            Discover More Channels
          </Button>
        </Link>
      </div>

      {favoriteChannels.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm max-w-lg mx-auto space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-500 border border-rose-200 dark:border-rose-800/40">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            No Favorites Saved Yet
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed" dir="rtl">
            هنوز شبکه‌ای به لیست علاقه‌مندی‌های خود اضافه نکرده‌اید. با کلیک بر روی آیکون قلب در کنار هر شبکه، آن را ذخیره کنید.
          </p>
          <Link href="/">
            <Button variant="default" className="text-xs mt-2">
              Browse All Channels
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteChannels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      )}
    </div>
  );
}
