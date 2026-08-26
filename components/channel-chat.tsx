'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, Heart, Smile, Sparkles, User, ShieldCheck } from 'lucide-react';
import { Channel } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn, formatNumber } from '@/lib/utils';

interface ChatMessage {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
  isMod?: boolean;
  isAfghan?: boolean;
  isPersian?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    user: 'Arman_Kabul',
    avatar: '🇦🇫',
    text: 'Salam az Kabul! Keifiyat pakhsh aali ast tashakor az Darya Stream ❤️',
    timestamp: '14:28',
    isAfghan: true,
  },
  {
    id: 'm2',
    user: 'Sara_Tehran',
    avatar: '🇮🇷',
    text: 'درود به همگی، کیفیت فول اچ‌دی بدون قطعی پخش میشه دمتون گرم',
    timestamp: '14:29',
    isPersian: true,
  },
  {
    id: 'm3',
    user: 'Darya Moderator',
    avatar: '🛡️',
    text: 'Welcome to Darya.Stream! Keep conversation respectful. Enjoy the live broadcast.',
    timestamp: '14:29',
    isMod: true,
  },
  {
    id: 'm4',
    user: 'Navid_Frankfurt',
    avatar: '🇩🇪',
    text: 'Sound quality and bitrates are amazing on Yahsat stream!',
    timestamp: '14:30',
  },
  {
    id: 'm5',
    user: 'Zahra_Herat',
    avatar: '🇦🇫',
    text: 'برنامه بعدی چی هست؟ بسیار عالی',
    timestamp: '14:31',
    isAfghan: true,
  },
];

export function ChannelChat({ channel }: { channel: Channel }) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [reactions, setReactions] = useState<{ id: number; emoji: string; x: number }[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Occasional simulated community messages
  useEffect(() => {
    const chatSamples = [
      { user: 'Soroush_Shiraz', avatar: '🇮🇷', text: 'زنده باد، کیفیت تصویر فوق‌العاده است', isPersian: true },
      { user: 'Massoud_Mazar', avatar: '🇦🇫', text: 'سلام بر همه هموطنان گرامی از مزار شریف', isAfghan: true },
      { user: 'Reza_Toronto', avatar: '🇨🇦', text: 'Watching live from Canada with zero lag. Thanks Darya!', isPersian: true },
      { user: 'Farid_London', avatar: '🇬🇧', text: 'Great coverage! 👏', isAfghan: true },
    ];

    const interval = setInterval(() => {
      const randomMsg = chatSamples[Math.floor(Math.random() * chatSamples.length)];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      setMessages((prev) => [
        ...prev.slice(-30),
        {
          id: Math.random().toString(),
          user: randomMsg.user,
          avatar: randomMsg.avatar,
          text: randomMsg.text,
          timestamp: timeStr,
          isAfghan: randomMsg.isAfghan,
          isPersian: randomMsg.isPersian,
        },
      ]);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const msgCounterRef = useRef(100);
  const reactionCounterRef = useRef(1);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    msgCounterRef.current += 1;
    const msgId = `msg-user-${msgCounterRef.current}`;
    
    setMessages((prev) => [
      ...prev,
      {
        id: msgId,
        user: 'You',
        avatar: '✨',
        text: inputVal.trim(),
        timestamp: 'Just now',
      },
    ]);
    setInputVal('');

    // Trigger cheer reaction animation
    triggerReaction('❤️');
  };

  const triggerReaction = (emoji: string) => {
    reactionCounterRef.current += 1;
    const nextId = reactionCounterRef.current;
    const posX = (nextId * 23) % 80 + 10;
    setReactions((prev) => [...prev, { id: nextId, emoji, x: posX }]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== nextId));
    }, 2000);
  };

  return (
    <div className="relative flex flex-col h-[480px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Floating Reaction Floating Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-30">
        {reactions.map((r) => (
          <span
            key={r.id}
            style={{ left: `${r.x}%` }}
            className="absolute bottom-16 text-2xl animate-bounce"
          >
            {r.emoji}
          </span>
        ))}
      </div>

      {/* Chat Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-cyan-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Live Community Chat</h3>
          <Badge variant="live" className="text-[10px] py-0">
            ACTIVE
          </Badge>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          {formatNumber(channel.viewers || 0)} online
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div ref={scrollRef} className="flex-1 p-3.5 overflow-y-auto space-y-2.5 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              'rounded-xl p-2.5 transition-colors',
              m.isMod
                ? 'bg-cyan-500/10 border border-cyan-500/30'
                : m.user === 'You'
                ? 'bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/40 ml-4'
                : 'bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60'
            )}
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-slate-200">
                <span>{m.avatar}</span>
                <span>{m.user}</span>
                {m.isMod && (
                  <span className="flex items-center gap-0.5 text-[10px] bg-cyan-500 text-slate-950 px-1.5 py-0.2 rounded-full font-bold">
                    <ShieldCheck className="w-3 h-3" /> MOD
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{m.timestamp}</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 break-words leading-relaxed">
              {m.text}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Reactions Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50/50 dark:bg-slate-950/30 border-t border-slate-100 dark:border-slate-800/60">
        <span className="text-[11px] text-slate-400">Quick React:</span>
        <div className="flex items-center gap-1.5">
          {['❤️', '🔥', '👏', '🇦🇫', '🇮🇷', '⭐'].map((emoji) => (
            <button
              key={emoji}
              onClick={() => triggerReaction(emoji)}
              className="p-1 text-sm hover:scale-125 transition-transform cursor-pointer"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Form */}
      <form onSubmit={handleSendMessage} className="p-2.5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2">
        <Input
          type="text"
          placeholder="Send a live comment..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="h-9 text-xs"
        />
        <Button type="submit" size="iconSm" variant="default" className="h-9 w-9 shrink-0">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
