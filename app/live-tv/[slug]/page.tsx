import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Info,
  Calendar,
  Layers,
  ArrowLeft,
} from 'lucide-react';
import { CHANNELS, getChannelBySlug, getRelatedChannels } from '@/lib/channels-data';
import { VideoPlayer } from '@/components/video-player';
import { ChannelChat } from '@/components/channel-chat';
import { SatelliteInfo } from '@/components/satellite-info';
import { ChannelCard } from '@/components/channel-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CHANNELS.map((ch) => ({
    slug: ch.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const channel = getChannelBySlug(slug);

  if (!channel) {
    return {
      title: 'Channel Not Found | Darya Stream',
      description: 'The requested live TV channel could not be found on Darya Stream.',
    };
  }

  const title = `Watch ${channel.name} (${channel.nameFa}) Live Stream Online HD - Darya Stream`;
  const description = `Stream ${channel.name} live online in Full HD ${channel.quality}. Watch ${channel.categoryName}, programs, and satellite frequencies on darya.stream.`;

  return {
    title,
    description,
    keywords: [
      channel.name,
      channel.nameFa,
      `${channel.name} live stream`,
      `${channel.name} پخش زنده`,
      channel.country === 'Iran' || channel.country === 'persian' ? 'Persian TV' : 'Afghan TV',
      'Free Live TV',
      'Yahsat frequencies',
      'darya stream',
    ],
    openGraph: {
      title,
      description,
      type: 'video.other',
      images: [
        {
          url: channel.bannerImage || channel.logo || '/default-banner.jpg',
          width: 1200,
          height: 630,
          alt: channel.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [channel.bannerImage || channel.logo || '/default-banner.jpg'],
    },
  };
}

export default async function LiveTvDetailPage({ params }: Props) {
  const { slug } = await params;
  const channel = getChannelBySlug(slug);

  if (!channel) {
    notFound();
  }

  const related = getRelatedChannels(channel, 3);

  // JSON-LD structured data for Google SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BroadcastService',
    name: channel.name,
    alternateName: channel.nameFa,
    description: channel.description,
    broadcastDisplayName: channel.name,
    inLanguage: [channel.language],
    areaServed: channel.country === 'Iran' || channel.country === 'persian' ? 'Iran' : 'Afghanistan',
    videoFormat: channel.quality,
    isLiveBroadcast: true,
    potentialAction: {
      '@type': 'WatchAction',
      target: `https://darya.stream/live-tv/${channel.slug}`,
    },
  };

  const isIran = channel.country === 'Iran' || channel.country === 'persian';
  const isAfghan = channel.country === 'Afghanistan' || channel.country === 'afghan';
  const countryBadgeVariant = isIran ? 'persian' : isAfghan ? 'afghan' : 'secondary';
  const countryDisplay = isIran ? 'Persian (Iran) • فارسی' : isAfghan ? 'Afghanistan • افغانی' : 'International • بین‌المللی';

  return (
    <div className="min-w-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-in fade-in">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb & Quick Back Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Live TV
          </Link>
          <span>/</span>
          <span className="capitalize">{countryDisplay}</span>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200 font-semibold truncate">{channel.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/multiview?add=${channel.id}`}>
            <Button size="sm" variant="outline" className="text-xs h-7 gap-1">
              <Layers className="w-3 h-3 text-cyan-500" />
              Multi-View Mode
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid: Video Player + Live Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Player & EPG Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <VideoPlayer channel={channel} autoPlay={true} />

          {/* About This Channel Card */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Info className="w-5 h-5 text-cyan-500" />
                  About {channel.name} ({channel.nameFa})
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Official broadcaster profile and stream specs
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={countryBadgeVariant} className="text-xs">
                  {channel.flag} {channel.country}
                </Badge>
                <Badge variant="live" className="text-xs">
                  ONLINE FEED
                </Badge>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {channel.description}
            </p>

            <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-950/40 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800/60" dir="rtl">
              {channel.descriptionFa}
            </div>

            {/* Channel Specs Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">Language:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {channel.language === 'Pashto' ? 'Pashto (پښتو)' : 'Persian / Dari (فارسی / دری)'}
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">Stream Resolution:</span>
                <span className="font-semibold text-cyan-600 dark:text-cyan-400 font-mono">
                  {channel.resolution} ({channel.quality})
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">Category:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {channel.category} ({channel.categoryNameFa})
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">Origin:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {channel.headquarters || channel.country}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {channel.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Satellite Transponder Frequencies */}
          <SatelliteInfo channel={channel} />
        </div>

        {/* Right 1 Col: Live Chat & Daily EPG Timeline */}
        <div className="space-y-6">
          {/* Live Chat Component */}
          <ChannelChat channel={channel} />

          {/* Channel Today Schedule Widget */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Today&apos;s Broadcast Guide (EPG)
                </h3>
              </div>
              <Link href="/guide" className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-semibold">
                Full Guide
              </Link>
            </div>

            <div className="space-y-2 text-xs">
              {channel.epg.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    item.isLive
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-slate-900 dark:text-cyan-200'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="font-semibold text-cyan-700 dark:text-cyan-400">
                      {item.startTime} - {item.endTime}
                    </span>
                    {item.isLive && (
                      <Badge variant="live" className="text-[9px] py-0">
                        ON AIR
                      </Badge>
                    )}
                  </div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">{item.title}</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]" dir="rtl">
                    {item.titleFa}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended / Related Channels */}
      {related.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                You May Also Like
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Top related {isIran ? 'Persian' : isAfghan ? 'Afghan' : 'International'} live television channels
              </p>
            </div>
            <Link href="/" className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">
              View All Channels
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((relChannel) => (
              <ChannelCard key={relChannel.id} channel={relChannel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
