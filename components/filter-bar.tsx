'use client';

import React, { useState } from 'react';
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
  Newspaper,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { ChannelCategory, CountryCode } from '@/lib/types';
import { CATEGORIES, COUNTRIES } from '@/lib/channels-data';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/lib/app-context';
import { cn } from '@/lib/utils';

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
  const [showMobileMore, setShowMobileMore] = useState(false);

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

  const activeFilterCount =
    (country !== 'All' && country !== 'all' ? 1 : 0) +
    (category !== 'All' && category !== 'all' ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0) +
    (onlyFavorites ? 1 : 0);

  return (
    <div className="sticky top-14 sm:top-16 z-30 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 py-2 sm:py-2.5 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-2">
        {/* Main Row: Search + Favorites + Quick Country / View Switcher */}
        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
            <Input
              type="text"
              placeholder={t('navSearchPlaceholder')}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8 sm:pl-9 pr-7 sm:pr-8 h-8 sm:h-9 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Favorites Toggle Button */}
          <button
            onClick={() => onToggleFavorites(!onlyFavorites)}
            className={cn(
              'flex items-center gap-1 sm:gap-1.5 h-8 sm:h-9 px-2.5 sm:px-3 rounded-xl border text-xs font-medium transition-colors cursor-pointer shrink-0 shadow-2xs',
              onlyFavorites
                ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/40'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            )}
            title="Filter Favorite Channels"
          >
            <Heart className={cn('w-3.5 h-3.5', onlyFavorites && 'fill-rose-500 text-rose-500')} />
            <span className="hidden md:inline">{t('navFavorites')}</span>
            <span className="text-[10px] font-bold bg-rose-500/20 px-1.5 py-0.2 rounded-full">
              {favorites.length}
            </span>
          </button>

          {/* View Mode Toggle (Desktop only) */}
          <div className="hidden md:flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 h-9">
            <button
              onClick={() => onViewModeChange('grid')}
              className={cn(
                'p-1.5 rounded-lg text-xs transition-colors cursor-pointer',
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
                'p-1.5 rounded-lg text-xs transition-colors cursor-pointer',
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

        {/* Compact Single-Row Horizontal Scrollable Filter Strip (Country + Categories combined) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
          {/* Countries */}
          {COUNTRIES.map((cntry) => {
            const isSelected = country === cntry.id || (cntry.id === 'All' && country === 'all');
            const flag = COUNTRY_FLAGS[cntry.id] || '🌐';
            return (
              <button
                key={cntry.id}
                onClick={() => onSelectCountry(cntry.id as CountryCode)}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all shrink-0 cursor-pointer select-none border',
                  isSelected
                    ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs dark:bg-cyan-500 dark:text-slate-950 dark:border-cyan-500 font-bold'
                    : 'bg-slate-100/90 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200/70 dark:border-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                )}
              >
                <span>{flag}</span>
                <span>{language === 'fa' || language === 'ps' ? cntry.nameFa : cntry.name}</span>
              </button>
            );
          })}

          <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 shrink-0 mx-0.5" />

          {/* Categories */}
          {CATEGORIES.filter((c) => c.id !== 'All').map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || Tv;
            const isSelected = category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? 'All' : (cat.id as ChannelCategory))}
                className={cn(
                  'flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold transition-all shrink-0 cursor-pointer select-none border',
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-500/50'
                    : 'bg-slate-100/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border-slate-200/60 dark:border-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800'
                )}
              >
                <Icon className="w-3 h-3 text-cyan-500 shrink-0" />
                <span>{language === 'fa' || language === 'ps' ? cat.nameFa : cat.name}</span>
              </button>
            );
          })}

          {/* Reset Filter Button if active */}
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-[11px] text-rose-500 hover:text-rose-600 dark:text-rose-400 font-semibold px-2 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/40 shrink-0 cursor-pointer ml-auto"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
