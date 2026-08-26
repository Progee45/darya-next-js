'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { Channel } from './types';
import { CHANNELS } from './channels-data';
import { TRANSLATIONS, SupportedLanguage, Translations } from './translations';

const DEFAULT_FAVORITES: string[] = ['irib3-tv-live', 'tolo-tv-live', 'iran-international-live', 'afghanistan-international-live'];
const DEFAULT_RECENT: string[] = ['tolonews-tv-live', 'varzish-tv-iran-live', 'bbc-persian-tv-live'];

interface AppContextType {
  favorites: string[];
  toggleFavorite: (channelId: string) => void;
  isFavorite: (channelId: string) => boolean;
  recentChannels: string[];
  addRecentChannel: (channelId: string) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: keyof Translations) => string;
  miniPlayerChannel: Channel | null;
  setMiniPlayerChannel: (channel: Channel | null) => void;
  isMiniPlayerOpen: boolean;
  setIsMiniPlayerOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  quickWatchChannel: Channel | null;
  setQuickWatchChannel: (channel: Channel | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(DEFAULT_FAVORITES);
  const [recentChannels, setRecentChannels] = useState<string[]>(DEFAULT_RECENT);
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  const [miniPlayerChannel, setMiniPlayerChannel] = useState<Channel | null>(null);
  const [isMiniPlayerOpen, setIsMiniPlayerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickWatchChannel, setQuickWatchChannel] = useState<Channel | null>(null);

  // Apply RTL/LTR and language attribute to document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const isRtl = language === 'fa' || language === 'ps';
      document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', language);
    }
  }, [language]);

  // Hydrate client-persisted preferences after mounting to prevent SSR hydration mismatch
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedLang = localStorage.getItem('darya_lang') as SupportedLanguage | null;
        if (savedLang && (savedLang === 'en' || savedLang === 'fa' || savedLang === 'ps')) {
          setLanguageState(savedLang);
        }
        const savedFavs = localStorage.getItem('darya_favorites');
        if (savedFavs) {
          const parsed = JSON.parse(savedFavs);
          if (Array.isArray(parsed)) setFavorites(parsed);
        }
        const savedRecent = localStorage.getItem('darya_recent');
        if (savedRecent) {
          const parsed = JSON.parse(savedRecent);
          if (Array.isArray(parsed)) setRecentChannels(parsed);
        }
      } catch {}
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = useCallback((channelId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(channelId)
        ? prev.filter((id) => id !== channelId)
        : [...prev, channelId];
      try {
        localStorage.setItem('darya_favorites', JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const isFavorite = useCallback((channelId: string) => favorites.includes(channelId), [favorites]);

  const addRecentChannel = useCallback((channelId: string) => {
    setRecentChannels((prev) => {
      if (prev[0] === channelId) return prev;
      const filtered = prev.filter((id) => id !== channelId);
      const next = [channelId, ...filtered].slice(0, 10);
      try {
        localStorage.setItem('darya_recent', JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('darya_lang', lang);
    } catch {}
  }, []);

  const t = useCallback((key: keyof Translations): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || String(key);
  }, [language]);

  const contextValue = useMemo<AppContextType>(() => ({
    favorites,
    toggleFavorite,
    isFavorite,
    recentChannels,
    addRecentChannel,
    language,
    setLanguage,
    t,
    miniPlayerChannel,
    setMiniPlayerChannel,
    isMiniPlayerOpen,
    setIsMiniPlayerOpen,
    searchQuery,
    setSearchQuery,
    quickWatchChannel,
    setQuickWatchChannel,
  }), [
    favorites,
    toggleFavorite,
    isFavorite,
    recentChannels,
    addRecentChannel,
    language,
    setLanguage,
    t,
    miniPlayerChannel,
    isMiniPlayerOpen,
    searchQuery,
    quickWatchChannel,
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
