'use client';

import React, { useState } from 'react';
import { Layers, Volume2, VolumeX, Maximize2, Trash2, Plus, RefreshCw, Radio } from 'lucide-react';
import { CHANNELS } from '@/lib/channels-data';
import { Channel } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VideoPlayer } from '@/components/video-player';
import { cn } from '@/lib/utils';

export function MultiViewPlayer({ initialChannelId }: { initialChannelId?: string }) {
  const [layout, setLayout] = useState<'2-split' | '4-grid'>('2-split');
  const [slotChannels, setSlotChannels] = useState<(Channel | null)[]>([
    CHANNELS.find((c) => c.id === initialChannelId) || CHANNELS[0],
    CHANNELS[1] || CHANNELS[0],
    CHANNELS[2] || CHANNELS[0],
    CHANNELS[3] || CHANNELS[0],
  ]);
  const [focusedAudioIndex, setFocusedAudioIndex] = useState<number>(0);

  const activeSlots = layout === '2-split' ? slotChannels.slice(0, 2) : slotChannels.slice(0, 4);

  const handleSelectChannel = (slotIndex: number, channelId: string) => {
    const selected = CHANNELS.find((c) => c.id === channelId) || null;
    setSlotChannels((prev) => {
      const next = [...prev];
      next[slotIndex] = selected;
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Multi-View Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-500" />
              Multi-View Live Screen
            </h1>
            <Badge variant="live" className="text-[10px]">MULTI-STREAM</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Watch multiple Persian & Afghan live TV streams simultaneously. Click any window to switch audio focus.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="flex items-center p-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setLayout('2-split')}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer',
                layout === '2-split'
                  ? 'bg-white dark:bg-cyan-500 text-slate-900 dark:text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              )}
            >
              2 Screens (Dual)
            </button>
            <button
              onClick={() => setLayout('4-grid')}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer',
                layout === '4-grid'
                  ? 'bg-white dark:bg-cyan-500 text-slate-900 dark:text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              )}
            >
              4 Screens (Quad)
            </button>
          </div>
        </div>
      </div>

      {/* Screen Grid */}
      <div
        className={cn(
          'grid gap-4',
          layout === '2-split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'
        )}
      >
        {activeSlots.map((ch, idx) => (
          <div
            key={idx}
            onClick={() => setFocusedAudioIndex(idx)}
            className={cn(
              'group relative flex flex-col rounded-2xl overflow-hidden bg-slate-950 border-2 transition-all shadow-xl',
              focusedAudioIndex === idx
                ? 'border-cyan-500 ring-2 ring-cyan-500/30'
                : 'border-slate-800 hover:border-slate-700'
            )}
          >
            {/* Slot Header Channel Switcher */}
            <div className="flex items-center justify-between p-2.5 bg-slate-900/90 border-b border-slate-800 text-xs text-white z-20">
              <div className="flex items-center gap-2 flex-1 max-w-[240px]">
                <span className="font-bold text-cyan-400">#{idx + 1}</span>
                <select
                  value={ch?.id || ''}
                  onChange={(e) => handleSelectChannel(idx, e.target.value)}
                  className="w-full bg-slate-950 text-white rounded-md border border-slate-700 py-1 px-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  {CHANNELS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.flag} {c.name} ({c.nameFa})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFocusedAudioIndex(idx);
                  }}
                  className={cn(
                    'flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold transition-colors',
                    focusedAudioIndex === idx
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  )}
                  title="Audio Focus"
                >
                  {focusedAudioIndex === idx ? (
                    <>
                      <Volume2 className="w-3 h-3" /> Audio Active
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3 h-3" /> Muted
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Video Stream Container */}
            <div className="relative aspect-video w-full bg-black">
              {ch ? (
                <VideoPlayer
                  channel={ch}
                  autoPlay={true}
                  showChannelInfo={false}
                  className="h-full w-full"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center flex-col gap-2 text-slate-500">
                  <Radio className="w-8 h-8" />
                  <span className="text-xs">Select Channel</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
