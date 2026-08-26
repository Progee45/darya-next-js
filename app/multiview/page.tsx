import React from 'react';
import type { Metadata } from 'next';
import { MultiViewPlayer } from '@/components/multiview-player';
import { Badge } from '@/components/ui/badge';
import { Layers, Sparkles, Tv } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Multi-View Live TV Screen (Split Screen) - Darya Stream',
  description: 'Watch 2 or 4 Persian and Afghan live TV channels side-by-side on a single screen with live audio focus and synchronization on darya.stream.',
};

interface Props {
  searchParams: Promise<{ add?: string }>;
}

export default async function MultiViewPage({ searchParams }: Props) {
  const { add } = await searchParams;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in">
      <MultiViewPlayer initialChannelId={add} />
    </div>
  );
}
