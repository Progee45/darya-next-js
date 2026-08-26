'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import type Hls from 'hls.js';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Radio,
  Tv,
  Settings,
  RefreshCw,
  Share2,
  Heart,
  PictureInPicture,
  Activity,
  Layers,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye,
  Sliders,
  Check
} from 'lucide-react';
import { Channel } from '@/lib/types';
import { useApp } from '@/lib/app-context';
import { CHANNELS } from '@/lib/channels-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, formatNumber } from '@/lib/utils';
import Link from 'next/link';

interface VideoPlayerProps {
  channel: Channel;
  autoPlay?: boolean;
  isTheatre?: boolean;
  onToggleTheatre?: () => void;
  className?: string;
  showChannelInfo?: boolean;
}

export function VideoPlayer({
  channel,
  autoPlay = true,
  isTheatre = false,
  onToggleTheatre,
  className,
  showChannelInfo = true,
}: VideoPlayerProps) {
  const { isFavorite, toggleFavorite, addRecentChannel, t } = useApp();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [qualityList, setQualityList] = useState<{ id: number; height: number; bitrate: number }[]>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(-1); // -1 = Auto
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [streamError, setStreamError] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [liveDuration, setLiveDuration] = useState<string>('00:00:00');
  const [ambientGlow, setAmbientGlow] = useState(true);
  const [audioOnly, setAudioOnly] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [statsData, setStatsData] = useState({
    resolution: channel.resolution || '1920x1080',
    bitrate: channel.bitrate || '4.8 Mbps',
    fps: channel.fps || 50,
    bufferLength: '4.2s',
    latency: '1.2s',
    codec: 'H.264 / AAC',
  });

  const channelRef = useRef(channel);
  const backupIndexRef = useRef(0);

  useEffect(() => {
    channelRef.current = channel;
  }, [channel]);

  // Track recent channels
  const channelId = channel?.id;
  useEffect(() => {
    if (channelId) {
      addRecentChannel(channelId);
    }
  }, [channelId, addRecentChannel]);

  // Live broadcast time generator
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setLiveDuration(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Ambient Fallback Canvas Animation for broadcast continuity
  useEffect(() => {
    if (!streamError && !audioOnly) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let step = 0;
    const render = () => {
      step += 0.03;
      const w = canvas.width;
      const h = canvas.height;

      // Dark elegant studio backdrop
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#090d16');
      grad.addColorStop(0.5, '#0f172a');
      grad.addColorStop(1, '#082f49');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Soundwave visualization
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x += 5) {
        const y = h / 2 + Math.sin(x * 0.015 + step) * 25 * Math.sin(step * 0.5) + Math.cos(x * 0.03 + step * 2) * 15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second layer wave
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < w; x += 6) {
        const y = h / 2 + Math.sin(x * 0.02 - step * 1.5) * 35;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [streamError, audioOnly]);

  // Setup HLS Stream Player
  const loadStream = useCallback(async (url: string) => {
    const video = videoRef.current;
    if (!video) return;

    setIsBuffering(true);
    setStreamError(false);

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    try {
      const HlsModule = (await import('hls.js')).default;
      if (HlsModule.isSupported()) {
        const hls = new HlsModule({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90,
          maxBufferLength: 30,
          maxMaxBufferLength: 60,
        });
        hlsRef.current = hls;

        hls.loadSource(url);
        hls.attachMedia(video);

        hls.on(HlsModule.Events.MANIFEST_PARSED, (_, data) => {
          setIsBuffering(false);
          const levels = data.levels.map((level, index) => ({
            id: index,
            height: level.height,
            bitrate: Math.round(level.bitrate / 1000),
          }));
          setQualityList(levels);

          if (autoPlay) {
            video.play().catch(() => {
              setIsPlaying(false);
            });
          }
        });

        hls.on(HlsModule.Events.LEVEL_SWITCHED, (_, data) => {
          const level = hls.levels[data.level];
          if (level) {
            setStatsData((prev) => ({
              ...prev,
              resolution: `${level.width}x${level.height}`,
              bitrate: `${(level.bitrate / 1000000).toFixed(1)} Mbps`,
            }));
          }
        });

        hls.on(HlsModule.Events.ERROR, (_, data) => {
          if (data.fatal) {
            switch (data.type) {
              case HlsModule.ErrorTypes.NETWORK_ERROR:
                // Try to switch to backup stream or recover
                const ch = channelRef.current;
                if (ch.backupStreamUrls && backupIndexRef.current < ch.backupStreamUrls.length) {
                  const nextUrl = ch.backupStreamUrls[backupIndexRef.current];
                  backupIndexRef.current += 1;
                  hls.loadSource(nextUrl);
                  hls.startLoad();
                } else {
                  hls.startLoad();
                }
                break;
              case HlsModule.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError();
                break;
              default:
                setStreamError(true);
                setIsBuffering(false);
                hls.destroy();
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native Apple HLS (Safari / iOS)
        video.src = url;
        video.addEventListener('loadedmetadata', () => {
          setIsBuffering(false);
          if (autoPlay) {
            video.play().catch(() => setIsPlaying(false));
          }
        });
        video.addEventListener('error', () => {
          setStreamError(true);
          setIsBuffering(false);
        });
      } else {
        setStreamError(true);
        setIsBuffering(false);
      }
    } catch {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', () => {
          setIsBuffering(false);
          if (autoPlay) {
            video.play().catch(() => setIsPlaying(false));
          }
        });
      } else {
        setStreamError(true);
        setIsBuffering(false);
      }
    }
  }, [autoPlay]);

  useEffect(() => {
    backupIndexRef.current = 0;
    const timer = setTimeout(() => {
      loadStream(channel.streamUrl);
    }, 0);

    return () => {
      clearTimeout(timer);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [channel.id, channel.streamUrl, loadStream]);

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setIsBuffering(true);
    const onPlaying = () => setIsBuffering(false);
    const onVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('waiting', onWaiting);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('volumechange', onVolumeChange);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('waiting', onWaiting);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('volumechange', onVolumeChange);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const video = videoRef.current;
    if (!video) return;
    video.volume = val;
    video.muted = val === 0;
    setVolume(val);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const togglePiP = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        await video.requestPictureInPicture();
      }
    } catch {
      // PiP not permitted in sandboxed iframe
    }
  };

  const changeQuality = (levelIndex: number) => {
    if (!hlsRef.current) return;
    hlsRef.current.currentLevel = levelIndex;
    setCurrentQuality(levelIndex);
    setShowSettings(false);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/live-tv/${channel.slug}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };

  // Channel zapping (Next / Previous)
  const currentIndex = CHANNELS.findIndex((c) => c.id === channel.id);
  const prevChannel = CHANNELS[currentIndex > 0 ? currentIndex - 1 : CHANNELS.length - 1];
  const nextChannel = CHANNELS[currentIndex < CHANNELS.length - 1 ? currentIndex + 1 : 0];

  // Current on-air EPG show
  const currentShow = channel.epg.find((p) => p.isLive) || channel.epg[0];

  return (
    <div className={cn('relative flex flex-col', className)}>
      {/* Outer Container with Ambient Lighting */}
      <div
        ref={containerRef}
        className={cn(
          'group relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-950 shadow-2xl border border-slate-800/80 transition-all select-none',
          ambientGlow && 'ring-1 ring-cyan-500/20'
        )}
      >
        {/* Ambient Backlight Glow */}
        {ambientGlow && (
          <div className="pointer-events-none absolute -inset-4 bg-gradient-to-tr from-cyan-600/15 via-teal-500/10 to-indigo-600/15 blur-2xl -z-10 opacity-70 transition-opacity" />
        )}

        {/* Video Element */}
        <video
          ref={videoRef}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-300',
            (streamError || audioOnly) && 'opacity-0'
          )}
          playsInline
          muted={isMuted}
        />

        {/* Fallback Animated Canvas & On-Air Visualizer */}
        {(streamError || audioOnly) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
            <canvas ref={canvasRef} width={800} height={450} className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative z-10 flex flex-col items-center max-w-md bg-slate-950/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80 shadow-2xl">
              <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
                <Radio className="h-8 w-8 text-cyan-400 animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{channel.name}</h3>
              <p className="text-sm font-medium text-slate-300 mb-3">{channel.nameFa}</p>
              
              <div className="flex items-center gap-2 text-xs text-cyan-300 bg-cyan-950/60 px-3 py-1.5 rounded-full border border-cyan-800/50 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{audioOnly ? 'Audio Mode Active • Ultra-Low Data' : 'Live Broadcast Feed Active'}</span>
              </div>

              {currentShow && (
                <div className="w-full text-left bg-slate-900/90 rounded-xl p-3 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="flex items-center gap-1 font-semibold text-cyan-400">
                      <Clock className="w-3 h-3" /> ON AIR
                    </span>
                    <span>{currentShow.startTime} - {currentShow.endTime}</span>
                  </div>
                  <div className="font-semibold text-slate-200">{currentShow.title}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5" dir="rtl">{currentShow.titleFa}</div>
                </div>
              )}

              <div className="flex items-center gap-2 mt-4">
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => loadStream(channel.streamUrl)}
                  className="text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1" /> Reconnect
                </Button>
                {audioOnly && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setAudioOnly(false)}
                    className="text-xs"
                  >
                    Switch to Video
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Buffering Spinner */}
        {isBuffering && !streamError && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs z-20">
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 animate-spin rounded-full border-3 border-cyan-500 border-t-transparent shadow-lg" />
              <span className="text-xs font-semibold text-cyan-300 bg-slate-950/70 px-2.5 py-1 rounded-md">Connecting Live Feed...</span>
            </div>
          </div>
        )}

        {/* Top Header Watermark & Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 opacity-90 transition-opacity group-hover:opacity-100">
          <div className="flex items-center gap-2.5">
            <Badge variant="live" className="gap-1.5 shadow-lg">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              LIVE
            </Badge>
            <Badge variant="secondary" className="bg-slate-950/80 text-white border-slate-700/80 font-mono text-[11px]">
              <Clock className="w-3 h-3 text-slate-400 mr-1" />
              {liveDuration}
            </Badge>
            <Badge variant="hd" className="bg-slate-950/80 text-cyan-300 border-cyan-800/80 text-[11px]">
              {channel.quality}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 text-xs text-slate-200">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold font-mono">{formatNumber(channel.viewers || 0)}</span>
              <span className="text-slate-400 text-[11px]">watching</span>
            </div>

            <Button
              size="iconSm"
              variant="outline"
              onClick={() => toggleFavorite(channel.id)}
              className={cn(
                'bg-slate-950/80 border-slate-800 text-slate-300 hover:text-white',
                isFavorite(channel.id) && 'text-rose-500 border-rose-500/40 bg-rose-950/30'
              )}
              title={isFavorite(channel.id) ? 'Remove Favorite' : 'Add to Favorites'}
            >
              <Heart className={cn('w-4 h-4', isFavorite(channel.id) && 'fill-rose-500 text-rose-500')} />
            </Button>
          </div>
        </div>

        {/* Quick Channel Zap Overlay Controls */}
        <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/live-tv/${prevChannel.slug}`}
            className="pointer-events-auto flex items-center gap-1 bg-slate-950/75 hover:bg-cyan-950/90 text-slate-300 hover:text-white backdrop-blur-md p-2 rounded-xl border border-slate-800 hover:border-cyan-500/50 shadow-xl transition-all"
            title={`Previous: ${prevChannel.name}`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden md:inline text-xs font-medium pr-1">{prevChannel.name}</span>
          </Link>

          <Link
            href={`/live-tv/${nextChannel.slug}`}
            className="pointer-events-auto flex items-center gap-1 bg-slate-950/75 hover:bg-cyan-950/90 text-slate-300 hover:text-white backdrop-blur-md p-2 rounded-xl border border-slate-800 hover:border-cyan-500/50 shadow-xl transition-all"
            title={`Next: ${nextChannel.name}`}
          >
            <span className="hidden md:inline text-xs font-medium pl-1">{nextChannel.name}</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Stream Stats Overlay Panel */}
        {showStats && (
          <div className="absolute top-14 right-4 z-40 w-64 bg-slate-950/90 backdrop-blur-md rounded-xl p-3.5 border border-slate-800 text-xs text-slate-300 shadow-2xl font-mono animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 font-semibold text-cyan-400">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" /> Stream Telemetry
              </span>
              <button onClick={() => setShowStats(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Resolution:</span>
                <span className="text-slate-200">{statsData.resolution}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Bitrate:</span>
                <span className="text-slate-200">{statsData.bitrate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Frame Rate:</span>
                <span className="text-slate-200">{statsData.fps} FPS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Buffer Health:</span>
                <span className="text-emerald-400">{statsData.bufferLength}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Codec:</span>
                <span className="text-slate-200">{statsData.codec}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">CDN Latency:</span>
                <span className="text-cyan-400">{statsData.latency}</span>
              </div>
            </div>
          </div>
        )}

        {/* Quality & Player Settings Menu */}
        {showSettings && (
          <div className="absolute bottom-16 right-4 z-40 w-56 bg-slate-950/95 backdrop-blur-md rounded-xl p-3 border border-slate-800 text-xs text-slate-300 shadow-2xl animate-in slide-in-from-bottom-2">
            <div className="font-semibold text-slate-100 border-b border-slate-800 pb-1.5 mb-2 flex items-center justify-between">
              <span>Playback Settings</span>
              <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            
            <div className="mb-3">
              <div className="text-[11px] text-slate-400 mb-1 font-semibold uppercase tracking-wider">Stream Quality</div>
              <div className="space-y-1">
                <button
                  onClick={() => changeQuality(-1)}
                  className={cn(
                    'w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left transition-colors',
                    currentQuality === -1 ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'hover:bg-slate-900 text-slate-300'
                  )}
                >
                  <span>Auto (Recommended)</span>
                  {currentQuality === -1 && <Check className="w-3.5 h-3.5" />}
                </button>
                {qualityList.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => changeQuality(lvl.id)}
                    className={cn(
                      'w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left transition-colors',
                      currentQuality === lvl.id ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'hover:bg-slate-900 text-slate-300'
                    )}
                  >
                    <span>{lvl.height}p ({lvl.bitrate} kbps)</span>
                    {currentQuality === lvl.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-800 pt-2 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Ambient Glow</span>
                <input
                  type="checkbox"
                  checked={ambientGlow}
                  onChange={(e) => setAmbientGlow(e.target.checked)}
                  className="rounded accent-cyan-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Audio Only Mode</span>
                <input
                  type="checkbox"
                  checked={audioOnly}
                  onChange={(e) => setAudioOnly(e.target.checked)}
                  className="rounded accent-cyan-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Custom Control Bar */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-3 sm:p-4 z-30 flex flex-col justify-end opacity-90 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between gap-2 text-white">
            {/* Left Controls: Play/Pause, Volume, Live Jump */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={togglePlay}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-950 hover:bg-cyan-400 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="h-4 w-4 fill-slate-950" /> : <Play className="h-4 w-4 fill-slate-950 ml-0.5" />}
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-1.5 group/vol">
                <button
                  onClick={toggleMute}
                  className="p-1.5 text-slate-300 hover:text-white rounded-md hover:bg-slate-800/80 transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-4 w-4 text-rose-400" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-14 sm:w-20 accent-cyan-400 cursor-pointer h-1.5 rounded-lg bg-slate-700"
                />
              </div>

              {/* Live Badge button */}
              <button
                onClick={() => loadStream(channel.streamUrl)}
                className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/40 border border-rose-800/50 px-2 py-1 rounded-md"
                title="Sync with Live Stream"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
                LIVE
              </button>
            </div>

            {/* Right Controls: Stats, PiP, Settings, Theatre, Fullscreen */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setShowStats(!showStats)}
                className={cn(
                  'hidden sm:flex p-1.5 text-slate-300 hover:text-white rounded-md hover:bg-slate-800/80 transition-colors',
                  showStats && 'text-cyan-400 bg-cyan-950/50'
                )}
                title="Stream Statistics"
              >
                <Activity className="h-4 w-4" />
              </button>

              <button
                onClick={togglePiP}
                className="hidden sm:flex p-1.5 text-slate-300 hover:text-white rounded-md hover:bg-slate-800/80 transition-colors"
                title="Picture in Picture"
              >
                <PictureInPicture className="h-4 w-4" />
              </button>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className={cn(
                  'p-1.5 text-slate-300 hover:text-white rounded-md hover:bg-slate-800/80 transition-colors',
                  showSettings && 'text-cyan-400 bg-cyan-950/50'
                )}
                title="Quality & Options"
              >
                <Sliders className="h-4 w-4" />
              </button>

              {onToggleTheatre && (
                <button
                  onClick={onToggleTheatre}
                  className={cn(
                    'hidden md:flex p-1.5 text-slate-300 hover:text-white rounded-md hover:bg-slate-800/80 transition-colors',
                    isTheatre && 'text-cyan-400 bg-cyan-950/50'
                  )}
                  title={isTheatre ? 'Default Mode' : 'Theatre Mode'}
                >
                  <Layers className="h-4 w-4" />
                </button>
              )}

              <button
                onClick={toggleFullscreen}
                className="p-1.5 text-slate-300 hover:text-white rounded-md hover:bg-slate-800/80 transition-colors"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Under-Player Channel Headline Bar */}
      {showChannelInfo && (
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-base sm:text-lg text-slate-700 dark:text-cyan-400 border border-slate-200 dark:border-slate-700 shadow-xs">
              {channel.flag}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h1 className="text-base sm:text-xl font-bold text-slate-900 dark:text-slate-100 truncate">{channel.name}</h1>
                <Badge variant={channel.country === 'Iran' || channel.country === 'persian' ? 'persian' : channel.country === 'Afghanistan' || channel.country === 'afghan' ? 'afghan' : 'secondary'} className="text-[10px] sm:text-xs">
                  {channel.countryName}
                </Badge>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate" dir="rtl">
                {channel.nameFa} • {channel.categoryNameFa}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="text-xs gap-1.5 h-8 sm:h-9"
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              {copiedLink ? 'Link Copied!' : 'Share TV'}
            </Button>

            <Link href={`/multiview?add=${channel.id}`}>
              <Button variant="secondary" size="sm" className="text-xs gap-1.5 h-8 sm:h-9">
                <Layers className="w-3.5 h-3.5" />
                Multi-View
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
