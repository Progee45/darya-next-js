'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Tv,
  Radio,
  Sparkles,
  TrendingUp,
  Heart,
  Layers,
  Calendar,
  Search,
  SlidersHorizontal,
  Flame,
  Globe
} from 'lucide-react';
import { CHANNELS, CATEGORIES, getFeaturedChannels } from '@/lib/channels-data';
import { Channel, ChannelCategory, CountryCode } from '@/lib/types';
import { useApp } from '@/lib/app-context';
import { HeroFeatured } from '@/components/hero-featured';
import { FilterBar } from '@/components/filter-bar';
import { ChannelCard } from '@/components/channel-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const { favorites } = useApp();
  const [country, setCountry] = useState<CountryCode>('All');
  const [category, setCategory] = useState<ChannelCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const featuredList = useMemo(() => getFeaturedChannels(), []);

  // Filter channels based on active criteria
  const filteredChannels = useMemo(() => {
    return CHANNELS.filter((channel) => {
      // Country filter
      if (country !== 'All' && country !== 'all') {
        if (country === 'persian' && channel.country !== 'Iran') return false;
        if (country === 'afghan' && channel.country !== 'Afghanistan') return false;
        if (country !== 'persian' && country !== 'afghan' && channel.country.toLowerCase() !== country.toLowerCase()) {
          return false;
        }
      }
      // Category filter
      if (category !== 'All' && category !== 'all') {
        if (channel.category.toLowerCase() !== category.toLowerCase()) {
          return false;
        }
      }
      // Favorites filter
      if (onlyFavorites && !favorites.includes(channel.id)) {
        return false;
      }
      // Search filter (English, Persian, Pashto, Tags)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = channel.name.toLowerCase().includes(query);
        const matchesNameFa = channel.nameFa.includes(query);
        const matchesNamePs = channel.namePs?.includes(query);
        const matchesDesc = channel.description.toLowerCase().includes(query);
        const matchesTags = channel.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesNameFa && !matchesNamePs && !matchesDesc && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [country, category, onlyFavorites, favorites, searchQuery]);

  // Quick Count Stats
  const totalAfghan = CHANNELS.filter((c) => c.country === 'Afghanistan').length;
  const totalIran = CHANNELS.filter((c) => c.country === 'Iran').length;
  const totalIntl = CHANNELS.filter((c) => c.country === 'International').length;

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      {/* Top Hero Feature Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <HeroFeatured featuredChannels={featuredList} />
      </section>

      {/* Sticky Interactive Filter Bar */}
      <FilterBar
        country={country}
        onSelectCountry={setCountry}
        category={category}
        onSelectCategory={setCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onlyFavorites={onlyFavorites}
        onToggleFavorites={setOnlyFavorites}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalChannelsCount={filteredChannels.length}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Radio className="w-5 h-5 text-cyan-500 animate-pulse" />
                Live Broadcast Channels
              </h2>
              <Badge variant="live" className="text-xs">
                {filteredChannels.length} ON AIR
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5" dir="rtl">
              پخش زنده شبکه‌های تلویزیونی فارسی و افغانستان با کیفیت اچ‌دی
            </p>
          </div>

          {/* Quick Country Quick Tabs */}
          <div className="flex items-center gap-2 text-xs overflow-x-auto no-scrollbar">
            <span className="text-slate-400 shrink-0">Quick:</span>
            <button
              onClick={() => {
                setCountry('Iran');
                setCategory('All');
              }}
              className={cn(
                'px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer shrink-0',
                country === 'Iran'
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              )}
            >
              🇮🇷 Iran ({totalIran})
            </button>
            <button
              onClick={() => {
                setCountry('Afghanistan');
                setCategory('All');
              }}
              className={cn(
                'px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer shrink-0',
                country === 'Afghanistan'
                  ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              )}
            >
              🇦🇫 Afghan ({totalAfghan})
            </button>
            <button
              onClick={() => {
                setCountry('International');
                setCategory('All');
              }}
              className={cn(
                'px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer shrink-0',
                country === 'International'
                  ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/40'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              )}
            >
              🌍 Intl ({totalIntl})
            </button>
          </div>
        </div>

        {/* Channels Grid / List Layout */}
        {filteredChannels.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm max-w-md mx-auto space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 text-cyan-500 border border-cyan-200 dark:border-cyan-800/40">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              No TV Channels Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              No live channels match your active search or filter selection. Try resetting filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCountry('All');
                setCategory('All');
                setSearchQuery('');
                setOnlyFavorites(false);
              }}
              className="text-xs"
            >
              Reset All Filters
            </Button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredChannels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} variant="grid" />
            ))}
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredChannels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} variant="list" />
            ))}
          </div>
        )}

        {/* Quick Highlights: 24/7 News & Popular Drama Banners */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {/* Afghan News & Culture Spotlight */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-950 p-6 border border-amber-500/30 text-white space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="afghan" className="text-xs">
                🇦🇫 AFGHAN TELEVISION
              </Badge>
              <Link href="/guide" className="text-xs text-amber-400 hover:underline">
                TV Schedule →
              </Link>
            </div>
            <h3 className="text-lg font-bold text-white">
              Watch Afghanistan Live: Tolo, TOLOnews, Lemar, Ariana
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Stream live news bulletins, sports events, Afghan Star musical competitions, and cultural poetry evenings directly on any device without buffering.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <Link href="/channel/tolo-tv-live">
                <Button size="sm" variant="default" className="text-xs bg-amber-600 hover:bg-amber-500 text-white">
                  Watch Tolo TV
                </Button>
              </Link>
              <Link href="/channel/afghanistan-international-live">
                <Button size="sm" variant="outline" className="text-xs border-slate-700 text-slate-200">
                  Afghanistan Intl
                </Button>
              </Link>
            </div>
          </div>

          {/* Persian Entertainment & News Spotlight */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-950 p-6 border border-emerald-500/30 text-white space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="persian" className="text-xs">
                🇮🇷 PERSIAN TELEVISION
              </Badge>
              <Link href="/multiview" className="text-xs text-emerald-400 hover:underline">
                Multi-View Mode →
              </Link>
            </div>
            <h3 className="text-lg font-bold text-white">
              Persian Broadcasts: IRIB 3, Varzish TV, Iran Intl, BBC Persian
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Access 24/7 non-stop sports leagues, cinema movies, dubbed drama serials, and investigative news reports in full 1080p high definition.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <Link href="/channel/irib3-tv-live">
                <Button size="sm" variant="default" className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white">
                  Watch IRIB 3
                </Button>
              </Link>
              <Link href="/channel/iran-international-live">
                <Button size="sm" variant="outline" className="text-xs border-slate-700 text-slate-200">
                  Iran Intl Live
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
