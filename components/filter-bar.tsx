'use client';

import React from 'react';
import {
  Search,
  SlidersHorizontal,
  Grid,
  List,
  Heart,
  X,
  Tv,
  Radio,
  Sparkles,
  Film,
  Music,
  Trophy,
  Compass,
  Baby,
  BookOpen,
} from 'lucide-react';
import { ChannelCategory, CountryCode } from '@/lib/types';
import { CATEGORIES, COUNTRIES } from '@/lib/channels-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/lib/app-context';
import { cn } from '@/lib/utils';
import { Newspaper } from 'lucide-react';

interface FilterBarProps {
  country: CountryCode;
  onSelectCountry: (c: CountryCode) => void;
  category: ChannelCategory;
  onSelectCategory: (cat: ChannelCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onlyFavorites: boolean;
  onToggleFavorites: (val: boolean) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalChannelsCount: number;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  All: Tv,
  all: Tv,
  News: Newspaper,
  news: Newspaper,
  Entertainment: Sparkles,
  entertainment: Sparkles,
  Sports: Trophy,
  sports: Trophy,
  Film: Film,
  movies: Film,
  music: Music,
};

const COUNTRY_FLAGS: Record<string, string> = {
  All: '🌐',
  Afghanistan: '🇦🇫',
  Iran: '🇮🇷',
  International: '🌍',
};

export function FilterBar({
  country,
  onSelectCountry,
  category,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onlyFavorites,
  onToggleFavorites,
  viewMode,
  onViewModeChange,
  totalChannelsCount,
}: FilterBarProps) {
  const { favorites, t, language } = useApp();

  const handleResetFilters = () => {
    onSelectCountry('All');
    onSelectCategory('All');
    onSearchChange('');
    onToggleFavorites(false);
  };

  const hasActiveFilters =
    (country !== 'All' && country !== 'all') ||
    (category !== 'All' && category !== 'all') ||
    searchQuery.trim() !== '' ||
    onlyFavorites;

  return (
    <div className="sticky top-16 z-30 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        {/* Top Filter Controls: Country Buttons + Search + View Mode */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Country Selection Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-x-auto self-start no-scrollbar max-w-full">
            {COUNTRIES.map((cntry) => {
              const isSelected = country === cntry.id || (cntry.id === 'All' && country === 'all');
              const flag = COUNTRY_FLAGS[cntry.id] || '🌐';
              return (
                <button
                  key={cntry.id}
                  onClick={() => onSelectCountry(cntry.id as CountryCode)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer select-none',
                    isSelected
                      ? 'bg-cyan-600 text-white shadow-xs dark:bg-cyan-500 dark:text-slate-950'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  )}
                >
                  <span>{flag}</span>
                  <span>{language === 'fa' || language === 'ps' ? cntry.nameFa : cntry.name}</span>
                  <span className="text-[10px] opacity-75 font-normal" dir="rtl">
                    ({language === 'fa' || language === 'ps' ? cntry.name : cntry.nameFa})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Action Group: Search, Favorites Toggle & View Mode */}
          <div className="flex items-center gap-2 flex-1 sm:justify-end">
            {/* Search Input */}
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder={t('navSearchPlaceholder')}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9 pr-8 h-9 text-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Favorites Toggle Button */}
            <button
              onClick={() => onToggleFavorites(!onlyFavorites)}
              className={cn(
                'flex items-center gap-1.5 h-9 px-3 rounded-lg border text-xs font-medium transition-colors cursor-pointer',
                onlyFavorites
                  ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/40'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              )}
              title="Filter Favorite Channels"
            >
              <Heart className={cn('w-3.5 h-3.5', onlyFavorites && 'fill-rose-500 text-rose-500')} />
              <span className="hidden md:inline">{t('navFavorites')}</span>
              <span className="text-[10px] font-bold bg-rose-500/20 px-1.5 py-0.2 rounded-full">
                {favorites.length}
              </span>
            </button>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => onViewModeChange('grid')}
                className={cn(
                  'p-1.5 rounded-md text-xs transition-colors cursor-pointer',
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-cyan-400 shadow-xs'
                    : 'text-slate-400 hover:text-slate-600'
                )}
                title="Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={cn(
                  'p-1.5 rounded-md text-xs transition-colors cursor-pointer',
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-cyan-400 shadow-xs'
                    : 'text-slate-400 hover:text-slate-600'
                )}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills (Horizontal Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || Tv;
            const isSelected = category === cat.id || (cat.id === 'All' && category === 'all');
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as ChannelCategory)}
                className={cn(
                  'flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all shrink-0 cursor-pointer select-none',
                  isSelected
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/25 dark:bg-cyan-500 dark:text-slate-950'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{language === 'fa' || language === 'ps' ? cat.nameFa : cat.name}</span>
                <span className="text-[11px] opacity-75 font-normal" dir="rtl">
                  ({language === 'fa' || language === 'ps' ? cat.name : cat.nameFa})
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Indicators */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-1 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center gap-2">
              <span>{t('showingCount')}: <strong>{totalChannelsCount}</strong></span>
              {onlyFavorites && <Badge variant="live" className="text-[10px]">{t('favoritesOnly')}</Badge>}
              {country !== 'All' && country !== 'all' && <Badge variant="secondary" className="text-[10px]">{country}</Badge>}
              {category !== 'All' && category !== 'all' && <Badge variant="default" className="text-[10px]">{category}</Badge>}
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
            >
              {t('resetFilters')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
