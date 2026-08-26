'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Tv,
  Search,
  Home,
  Layers,
  ArrowRight,
  Sparkles,
  Radio,
  RotateCcw
} from 'lucide-react';
import { CHANNELS } from '@/lib/channels-data';
import { DaryaLogo } from '@/components/darya-logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredChannels = searchQuery.trim()
    ? CHANNELS.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.nameFa.includes(searchQuery) ||
          c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.slug.includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : CHANNELS.slice(0, 6);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl text-center space-y-8 animate-in fade-in">
        {/* Error Code & Status Badge */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>404 • Broadcast Signal Lost</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Page Not Found
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            The live TV stream or page you are looking for does not exist or has moved frequency.
          </p>

          <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400" dir="rtl">
            شبکه یا صفحه مورد نظر یافت نشد. می‌توانید نام شبکه را در زیر جستجو کنید.
          </p>
        </div>

        {/* Live Channel Quick Search Box */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search TV channels (e.g. IRIB 3, Tolo, BBC, Ariana)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-24 h-12 rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-sm shadow-sm"
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-4 rounded-xl text-xs"
          >
            Search
          </Button>
        </form>

        {/* Suggested Live Channels Grid */}
        <div className="space-y-3 text-left">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 px-1">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              Popular Live Broadcasts:
            </span>
            <Link href="/" className="text-cyan-600 dark:text-cyan-400 hover:underline">
              View All Channels ({CHANNELS.length}) →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {filteredChannels.map((channel) => (
              <Link
                key={channel.id}
                href={`/live-tv/${channel.slug}`}
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-cyan-500/60 dark:hover:border-cyan-500/60 hover:shadow-md transition-all text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-base shrink-0">{channel.flag}</span>
                  <div className="truncate">
                    <p className="font-bold text-slate-900 dark:text-white truncate group-hover:text-cyan-500 transition-colors">
                      {channel.name}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate" dir="rtl">
                      {channel.nameFa}
                    </p>
                  </div>
                </div>
                <Badge variant="live" className="text-[9px] py-0 px-1.5 shrink-0 ml-1">
                  LIVE
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800/80">
          <Link href="/">
            <Button size="lg" className="gap-2 rounded-xl text-xs sm:text-sm h-11 px-5">
              <Home className="w-4 h-4" />
              Back to Live Streams
            </Button>
          </Link>
          <Link href="/guide">
            <Button size="lg" variant="outline" className="gap-2 rounded-xl text-xs sm:text-sm h-11 px-5">
              <Tv className="w-4 h-4" />
              EPG TV Guide
            </Button>
          </Link>
          <Link href="/multiview">
            <Button size="lg" variant="outline" className="gap-2 rounded-xl text-xs sm:text-sm h-11 px-5">
              <Layers className="w-4 h-4" />
              MultiView
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
