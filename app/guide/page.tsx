import React from 'react';
import type { Metadata } from 'next';
import { EPGGuide } from '@/components/epg-guide';
import { Calendar, Sparkles, Tv } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Live TV Guide & EPG Schedules (جدول پخش زنده) - Darya Stream',
  description: 'Complete 24/7 Electronic Program Guide (EPG) for Persian and Afghan TV channels. See on-air showtimes, series schedules, and live sports on darya.stream.',
};

export default function GuidePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in">
      <EPGGuide />
    </div>
  );
}
