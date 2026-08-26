export type CountryCode = 'All' | 'Afghanistan' | 'Iran' | 'International' | 'persian' | 'afghan' | 'all';

export type ChannelCategory =
  | 'All'
  | 'Entertainment'
  | 'Sports'
  | 'News'
  | 'all'
  | 'news'
  | 'entertainment'
  | 'movies'
  | 'music'
  | 'sports'
  | 'documentary'
  | 'kids'
  | 'cultural';

export interface EPGProgram {
  id: string;
  title: string;
  titleFa: string;
  startTime: string; // "14:00"
  endTime?: string;  // "15:30"
  description?: string;
  descriptionFa?: string;
  category?: string;
  genre?: string;
  isLive?: boolean;
}

export interface StreamSource {
  id: string;
  title: string;
  type: string;
  url: string;
  quality: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  titleFa: string;
  genre: string;
  isCurrent?: boolean;
}

export interface SatelliteFrequency {
  satellite: string;
  frequency: string;
  polarization: 'H' | 'V';
  symbolRate: string;
  fec: string;
  coverage: string;
}

export interface Channel {
  id: string;
  slug: string;
  name: string;
  nameFa: string;
  namePs?: string;
  country: string;
  countryName?: string;
  countryNameFa?: string;
  flag?: string;
  category: string;
  categoryName?: string;
  categoryNameFa?: string;
  logoUrl?: string;
  logo?: string;
  bannerUrl?: string;
  bannerImage?: string;
  description: string;
  descriptionFa: string;
  rating?: number;
  viewCount?: string;
  viewers?: number;
  isHot?: boolean;
  isHD?: boolean;
  language: string;
  languageFa?: string;
  streams: StreamSource[];
  streamUrl: string;
  backupStreamUrls?: string[];
  embedUrl?: string;
  schedule?: ScheduleItem[];
  epg: EPGProgram[];
  keywords: string[];
  tags: string[];
  quality?: string;
  resolution?: string;
  bitrate?: string;
  fps?: number;
  isOnline?: boolean;
  featured?: boolean;
  established?: string;
  headquarters?: string;
  websiteUrl?: string;
  satellites?: SatelliteFrequency[];
}

export interface FilterState {
  country: CountryCode;
  category: ChannelCategory;
  searchQuery: string;
  quality: string;
  sortBy: 'popular' | 'name' | 'recently_added';
  onlyFavorites: boolean;
}

