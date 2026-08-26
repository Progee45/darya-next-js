'use client';

import React, { useState } from 'react';
import { Satellite, Copy, Check, Radio, Globe, Shield, Activity, HelpCircle } from 'lucide-react';
import { Channel } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function SatelliteInfo({ channel }: { channel: Channel }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!channel.satellites || channel.satellites.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Satellite className="w-5 h-5 text-cyan-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Satellite Frequencies & Transponders
          </h3>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400" dir="rtl">
          مشخصات فرکانس ماهواره‌ای
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {channel.satellites.map((sat, idx) => {
          const freqString = `${channel.name} | ${sat.satellite} | Freq: ${sat.frequency} | Pol: ${sat.polarization} | SR: ${sat.symbolRate} | FEC: ${sat.fec}`;
          return (
            <div
              key={idx}
              className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 p-3.5 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  {sat.satellite}
                </span>
                <button
                  onClick={() => handleCopy(freqString, idx)}
                  className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400"
                  title="Copy frequency tuning params"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Frequency:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{sat.frequency} MHz</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Polarization:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {sat.polarization === 'H' ? 'Horizontal (H)' : 'Vertical (V)'}
                  </span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Symbol Rate:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{sat.symbolRate}</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px]">FEC:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{sat.fec}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-1">
                <Activity className="w-3 h-3 text-emerald-500" />
                <span>Coverage Beam: {sat.coverage}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
