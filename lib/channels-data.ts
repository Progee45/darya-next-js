import { Channel, SatelliteFrequency } from './types';

// Helper to parse '3.8M' -> 3800000 or '980K' -> 980000
function parseViewCount(countStr?: string): number {
  if (!countStr) return 15000;
  const num = parseFloat(countStr.replace(/[^0-9.]/g, ''));
  if (countStr.toUpperCase().includes('M')) {
    return Math.round(num * 1000000);
  }
  if (countStr.toUpperCase().includes('K')) {
    return Math.round(num * 1000);
  }
  return Math.round(num) || 15000;
}

const RAW_CHANNELS = [
  {
    id: 'irib3-tv-live',
    slug: 'irib3-tv-live',
    name: 'IRIB 3 TV Live',
    nameFa: 'شبکه سه',
    country: 'Iran',
    category: 'Sports',
    logoUrl: '/logos/irib3.png',
    bannerUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
    description: 'Watch IRIB 3 TV Live sports streaming. Free HD broadcast of live football, volleyball, and top Iranian athletics.',
    descriptionFa: 'پخش زنده شبکه سه سیما ایران با کیفیت بالا و پوشش مسابقات ورزشی.',
    rating: 4.9,
    viewCount: '3.8M',
    isHot: true,
    isHD: true,
    language: 'Farsi',
    streams: [
      {
        id: 'irib3-stream-1',
        title: 'HLS Live Server 1',
        type: 'hls',
        url: 'https://edge22.776740.ir.cdn.ir/hls2/tv3.m3u8',
        quality: '1080p'
      }
    ],
    schedule: [
      { id: 'ir1', time: '19:00', title: 'Live Football Match', titleFa: 'فوتبال برتر', genre: 'Sports', isCurrent: true },
      { id: 'ir2', time: '21:30', title: 'Sports Analysis Show', titleFa: 'برنامه تحلیلی ورزش سه', genre: 'Sports' }
    ],
    keywords: ['IRIB 3', 'IRIB 3 Live', 'شبکه 3', 'پخش زنده شبکه سه', 'Iran Sports TV']
  },
  {
    id: 'varzish-tv-iran-live',
    slug: 'varzish-tv-iran-live',
    name: 'Varzish TV Iran Live',
    nameFa: 'ورزش',
    country: 'Iran',
    category: 'Sports',
    logoUrl: '/logos/varzish.png',
    bannerUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop&q=80',
    description: 'Watch Varzish TV Iran Live stream. Sports network broadcasting international football, Champions League, and Olympic sports.',
    descriptionFa: 'پخش زنده شبکه ورزش ایران برای تماشای زنده مسابقات ورزشی.',
    rating: 4.8,
    viewCount: '2.4M',
    isHot: true,
    isHD: true,
    language: 'Farsi',
    streams: [
      {
        id: 'varzish-stream-1',
        title: 'Telewebion HD Stream',
        type: 'hls',
        url: 'https://live-aburayhan1101.telewebion.ir/ek/varzesh/live/720p/index.m3u8',
        quality: '720p'
      }
    ],
    schedule: [
      { id: 'v1', time: '18:30', title: 'Champions League Live', titleFa: 'لیگ قهرمانان', genre: 'Sports', isCurrent: true },
      { id: 'v2', time: '22:00', title: 'World Sports Highlights', titleFa: 'جهان ورزش', genre: 'Sports' }
    ],
    keywords: ['Varzish TV', 'Varzish Iran', 'شبکه ورزش', 'پخش زنده شبکه ورزش']
  },
  {
    id: 'iran-international-live',
    slug: 'iran-international-live',
    name: 'Iran International Live',
    nameFa: 'ایران اینترنشنال',
    country: 'International',
    category: 'News',
    logoUrl: '/logos/iran-int.png',
    bannerUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format&fit=crop&q=80',
    description: 'Watch Iran International Live news stream 24/7. Continuous coverage of global news, political discussions, and breaking headlines.',
    descriptionFa: 'پخش زنده ۲۴ ساعته شبکه خبری ایران اینترنشنال با آخرین اخبار جهان.',
    rating: 4.9,
    viewCount: '4.5M',
    isHot: true,
    isHD: true,
    language: 'Farsi',
    streams: [
      {
        id: 'iranintl-stream-1',
        title: 'HLS Live Server 1',
        type: 'hls',
        url: 'https://live.livetvstream.co.uk/LS-63503-3/chunklist_b1196000.m3u8',
        quality: '1080p'
      }
    ],
    schedule: [
      { id: 'ii1', time: '00:00', title: 'Live World News', titleFa: 'اخبار جهان', genre: 'News', isCurrent: true },
      { id: 'ii2', time: '20:00', title: 'TiTR Political Debate', titleFa: 'برنامه تیتر اول', genre: 'News' }
    ],
    keywords: ['Iran International', 'ایران اینترنشنال', 'اخبار زنده', 'Iran Intl Live']
  },
  {
    id: 'afghanistan-international-live',
    slug: 'afghanistan-international-live',
    name: 'Afghanistan International Live',
    nameFa: 'افغانستان اینترنشنال',
    country: 'Afghanistan',
    category: 'News',
    logoUrl: '/logos/afghanistan-int.png',
    bannerUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80',
    description: 'Watch Afghanistan International Live news broadcast. 24/7 independent headlines, interviews, and breaking reports.',
    descriptionFa: 'پخش زنده شبکه تلویزیونی افغانستان اینترنشنال برای آخرین اخبار.',
    rating: 4.9,
    viewCount: '3.1M',
    isHot: true,
    isHD: true,
    language: 'Farsi',
    streams: [
      {
        id: 'afintl-stream-1',
        title: 'Live Server 1',
        type: 'hls',
        url: 'https://afintlbak.livetvstream.co.uk/aitv/chunklist_b1196000.m3u8',
        quality: '1080p'
      }
    ],
    schedule: [
      { id: 'ai1', time: '19:00', title: 'Afghanistan Today', titleFa: 'امروز افغانستان', genre: 'News', isCurrent: true },
      { id: 'ai2', time: '21:00', title: 'Parcham Political Show', titleFa: 'دیدگاه سیاسی', genre: 'News' }
    ],
    keywords: ['Afghanistan International', 'افغانستان اینترنشنال', 'اخبار افغانستان']
  },
  {
    id: 'tolonews-tv-live',
    slug: 'tolonews-tv-live',
    name: 'TOLOnews TV Live',
    nameFa: 'طلوع‌نیوز',
    country: 'Afghanistan',
    category: 'News',
    logoUrl: '/logos/tolonews.png',
    bannerUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=1200&auto=format&fit=crop&q=80',
    description: 'Watch TOLOnews TV Live stream 24/7 online in HD. Afghanistan\'s premier news channel broadcasting breaking news, political debates, and world headlines.',
    descriptionFa: 'پخش زنده شبکه تلویزیونی طلوع نیوز افغانستان با کیفیت HD و اخبار ۲۴ ساعته.',
    rating: 4.9,
    viewCount: '3.5M',
    isHot: false,
    isHD: true,
    language: 'Farsi',
    streams: [
      {
        id: 'tolonews-stream-1',
        title: 'HLS Live Server 1 (HD)',
        type: 'hls',
        url: 'https://live.livetvstream.co.uk/LS-63503-3/chunklist_b1196000.m3u8',
        quality: '1080p'
      }
    ],
    schedule: [
      { id: 'tn1', time: '18:00', title: 'TOLOnews 6PM Headlines', titleFa: 'اخبار ساعت ۶ طلوع‌نیوز', genre: 'News', isCurrent: true },
      { id: 'tn2', time: '20:00', title: 'Farkhar Political Debate', titleFa: 'برنامه تحلیلی و سیاسی', genre: 'Debate' }
    ],
    keywords: ['TOLOnews', 'TOLO news live', 'طلوع نیوز', 'پخش زنده طلوع نیوز', 'اخبار افغانستان']
  },
  {
    id: 'tolo-tv-live',
    slug: 'tolo-tv-live',
    name: 'Tolo TV Live',
    nameFa: 'طلوع',
    country: 'Afghanistan',
    category: 'Entertainment',
    logoUrl: '/logos/tolo.png',
    bannerUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=1200&auto=format&fit=crop&q=80',
    description: 'Watch Tolo TV Live stream HD online. Free Afghan entertainment, dramas, music shows, and cultural broadcasts on Darya Stream.',
    descriptionFa: 'پخش زنده شبکه تلویزیونی طلوع افغانستان با کیفیت HD و سریال‌های جذاب.',
    rating: 4.9,
    viewCount: '2.8M',
    isHot: false,
    isHD: true,
    language: 'Farsi',
    streams: [
      {
        id: 'tolo-stream-1',
        title: 'HLS Live Server 1 (HD)',
        type: 'hls',
        url: 'https://live.livetvstream.co.uk/LS-63503-3/chunklist_b1196000.m3u8',
        quality: '1080p'
      }
    ],
    schedule: [
      { id: 's1', time: '18:00', title: 'Afghani Star (ستاره افغان)', titleFa: 'ستاره افغان', genre: 'Music', isCurrent: true },
      { id: 's2', time: '20:00', title: 'Kabul Night Drama', titleFa: 'سریال شب‌های کابل', genre: 'Drama' }
    ],
    keywords: ['Tolo TV', 'Tolo Live', 'Afghan TV', 'طلوع', 'پخش زنده طلوع']
  },
  {
    id: 'ifilm-tv-live',
    slug: 'ifilm-tv-live',
    name: 'iFilm TV Live',
    nameFa: 'آی فیلم',
    country: 'Iran',
    category: 'Entertainment',
    logoUrl: '/logos/ifilm.png',
    bannerUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80',
    description: 'Watch iFilm TV Live stream free. Popular Iranian cinema, television drama series, and comedy shows broadcast in Farsi and Dari.',
    descriptionFa: 'پخش زنده شبکه آی‌فیلم با بهترین سریال‌ها و فیلم‌های سینمایی ایرانی.',
    rating: 4.8,
    viewCount: '2.1M',
    isHot: false,
    isHD: true,
    language: 'Farsi',
    streams: [
      {
        id: 'ifilm-stream-1',
        title: 'HLS Live Server 1',
        type: 'hls',
        url: 'https://edge22.776740.ir.cdn.ir/hls2/ifilm.m3u8',
        quality: '1080p'
      }
    ],
    schedule: [
      { id: 'if1', time: '19:00', title: 'Persian Cinema Evening', titleFa: 'فیلم سینمایی ایرانی', genre: 'Movie', isCurrent: true },
      { id: 'if2', time: '21:00', title: 'Comedy Series Showcase', titleFa: 'سریال طنز شبانه', genre: 'Comedy' }
    ],
    keywords: ['iFilm', 'iFilm Live', 'آی فیلم', 'پخش زنده آی فیلم', 'فیلم و سریال']
  },
  {
    id: 'voa-farsi-live',
    slug: 'voa-farsi-live',
    name: 'VOA Farsi Live',
    nameFa: 'صدای آمریکا (VOA فارسی)',
    country: 'International',
    category: 'News',
    logoUrl: '/logos/voa.png',
    bannerUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&auto=format&fit=crop&q=80',
    description: 'Watch Voice of America VOA Farsi Live streaming 24/7. Continuous world news coverage, interviews, and global geopolitical analysis.',
    descriptionFa: 'پخش زنده شبکه تلویزیونی صدای آمریکا (VOA فارسی) با آخرین اخبار جهان.',
    rating: 4.7,
    viewCount: '1.9M',
    isHot: false,
    isHD: true,
    language: 'Farsi',
    streams: [
      {
        id: 'voa-stream-1',
        title: 'Akamai Live Feed (HD)',
        type: 'hls',
        url: 'https://voa-ingest.akamaized.net/hls/live/2033876/tvmc07/playlist_1080.m3u8',
        quality: '1080p'
      }
    ],
    schedule: [
      { id: 'voa1', time: '20:00', title: 'VOA News Hour', titleFa: 'خبرسازان صدای آمریکا', genre: 'News', isCurrent: true },
      { id: 'voa2', time: '22:00', title: 'World Affairs Roundtable', titleFa: 'میزگرد سیاسی بین‌الملل', genre: 'Debate' }
    ],
    keywords: ['VOA Farsi', 'Voice of America', 'صدای آمریکا', 'VOA Live', 'اخبار صدای آمریکا']
  },
  {
    id: 'yak-tv-kabul-live',
    slug: 'yak-tv-kabul-live',
    name: '1TV Kabul Live',
    nameFa: 'تلویزیون یک کابل',
    country: 'Afghanistan',
    category: 'Entertainment',
    logoUrl: '/logos/1tv.png',
    bannerUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
    description: 'Watch 1TV Kabul (Yak TV) Live streaming. High quality Afghan commercial TV broadcasting local news, current affairs, and talk shows.',
    descriptionFa: 'پخش زنده شبکه تلویزیونی یک کابل (Yak TV) برای تماشای اخبار و برنامه‌های متنوع.',
    rating: 4.7,
    viewCount: '1.5M',
    isHot: false,
    isHD: true,
    language: 'Farsi',
    streams: [
      {
        id: 'yak-stream-1',
        title: 'Bozztv Live Server 1',
        type: 'hls',
        url: 'https://tgn.bozztv.com/eshgtv-dvrfl05/gin-1tv/tracks-v1a1/mono.m3u8',
        quality: '720p'
      }
    ],
    schedule: [
      { id: 'y1', time: '19:30', title: '1TV Night News Brief', titleFa: 'اخبار امشب شبکه یک', genre: 'News', isCurrent: true },
      { id: 'y2', time: '21:00', title: 'Kabul Talkshow & Music', titleFa: 'شب‌نشینی و موسیقی کابل', genre: 'Entertainment' }
    ],
    keywords: ['1TV Kabul', 'Yak TV', 'تلویزیون یک', 'یک کابل', 'پخش زنده شبکه یک']
  },
  {
    id: 'iran-aryaee-tv-live',
    slug: 'iran-aryaee-tv-live',
    name: 'Iran Aryaee TV Live',
    nameFa: 'ایران آریایی',
    country: 'Iran',
    category: 'Entertainment',
    logoUrl: '/logos/aryaee.png',
    bannerUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format&fit=crop&q=80',
    description: 'Watch Iran Aryaee TV Live online stream. Cultural broadcasts, music, history, and Persian diaspora programming 24/7.',
    descriptionFa: 'پخش زنده شبکه تلویزیونی ایران آریایی با برنامه‌های فرهنگی و هنری.',
    rating: 4.6,
    viewCount: '980K',
    isHot: false,
    isHD: true,
    language: 'Farsi',
    streams: [
      {
        id: 'aryaee-stream-1',
        title: 'Kirkism Live Stream',
        type: 'hls',
        url: 'https://iranaryai.kirkism.site/iranearyaeesd/index.m3u8',
        quality: 'SD'
      }
    ],
    schedule: [
      { id: 'ar1', time: '21:00', title: 'Persian Heritage Hour', titleFa: 'تاریخ و فرهنگ ایران', genre: 'Culture', isCurrent: true }
    ],
    keywords: ['Iran Aryaee', 'Iran Aryaee TV', 'ایران آریایی', 'پخش زنده ایران آریایی']
  },
  {
    id: 'amu-tv-live',
    slug: 'amu-tv-live',
    name: 'Amu TV Live',
    nameFa: 'آمو تی‌وی',
    country: 'Afghanistan',
    category: 'News',
    logoUrl: '/logos/amu.png',
    bannerUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    description: 'Watch Amu TV Live stream online. Independent news network reporting breaking updates, human rights reports, and analysis from Afghanistan.',
    descriptionFa: 'پخش زنده شبکه خبری آمو تی‌وی برای آخرین گزارش‌های مستقل افغانستان.',
    rating: 4.8,
    viewCount: '1.4M',
    isHot: true,
    isHD: true,
    language: 'Farsi',
    streams: [
      {
        id: 'amu-stream-1',
        title: 'ERC CDN Live 720p',
        type: 'hls',
        url: 'https://jmc-live.ercdn.net/amutvbu/amutvbu_720p.m3u8',
        quality: '720p'
      }
    ],
    schedule: [
      { id: 'am1', time: '19:30', title: 'Amu Newsroom Live', titleFa: 'اتاق خبر آمو', genre: 'News', isCurrent: true }
    ],
    keywords: ['Amu TV', 'Amu TV Live', 'آمو', 'آمو تی وی', 'اخبار آمو']
  },
  {
    id: 'lemar-tv-live',
    slug: 'lemar-tv-live',
    name: 'Lemar TV Live',
    nameFa: 'لمر',
    country: 'Afghanistan',
    category: 'Entertainment',
    logoUrl: '/logos/lemar.png',
    bannerUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
    description: 'Watch Lemar TV Live stream online free. Popular Pashto and Dari language television channel featuring music, dramas, and entertainment.',
    descriptionFa: 'پخش زنده شبکه تلویزیونی لمر افغانستان با برنامه‌های جذاب پشتو و دری.',
    rating: 4.8,
    viewCount: '2.2M',
    isHot: true,
    isHD: true,
    language: 'Pashto',
    streams: [
      {
        id: 'lemar-stream-1',
        title: 'Bozztv Live Stream',
        type: 'hls',
        url: 'https://tgn.bozztv.com/eshgtv-dvrfl05/gin-lemar/tracks-v1a1/mono.m3u8',
        quality: '720p'
      }
    ],
    schedule: [
      { id: 'lm1', time: '20:00', title: 'Lemar Music & Drama', titleFa: 'موسیقی و سریال لمر', genre: 'Entertainment', isCurrent: true }
    ],
    keywords: ['Lemar TV', 'Lemar Live', 'لمر', 'پخش زنده لمر', 'تلویزیون لمر']
  },
  {
    id: 'eslah-tv-live',
    slug: 'eslah-tv-live',
    name: 'Eslah TV Live',
    nameFa: 'تلویزیون اصلاح',
    country: 'Afghanistan',
    category: 'Entertainment',
    logoUrl: '/logos/eslah.png',
    bannerUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80',
    description: 'Watch Eslah TV Live streaming. Cultural, educational, and spiritual programs for Afghan audiences worldwide.',
    descriptionFa: 'پخش زنده شبکه جهانی تلویزیون اصلاح با برنامه‌های آموزشی و فرهنگی.',
    rating: 4.7,
    viewCount: '1.1M',
    isHot: false,
    isHD: true,
    language: 'Farsi',
    streams: [
      {
        id: 'eslah-stream-1',
        title: 'WNS Live HLS',
        type: 'hls',
        url: 'https://eslahtvhls.wns.live/hls/stream.m3u8',
        quality: '720p'
      }
    ],
    schedule: [
      { id: 'es1', time: '18:30', title: 'Eslah Cultural Program', titleFa: 'برنامه فرهنگی اصلاح', genre: 'Education', isCurrent: true }
    ],
    keywords: ['Eslah TV', 'Eslah Live', 'اصلاح', 'تلویزیون اصلاح', 'پخش زنده اصلاح']
  },
  {
    id: 'tamadon-tv-live',
    slug: 'tamadon-tv-live',
    name: 'Tamadon TV Live',
    nameFa: 'تمدن',
    country: 'Afghanistan',
    category: 'News',
    logoUrl: '/logos/tamadon.png',
    bannerUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=1200&auto=format&fit=crop&q=80',
    description: 'Watch Tamadon TV Live online streaming. Afghan news, cultural documentaries, and educational shows broadcasting in Dari.',
    descriptionFa: 'پخش زنده شبکه تلویزیونی تمدن افغانستان برای تماشای اخبار و مستندها.',
    rating: 4.7,
    viewCount: '1.3M',
    isHot: false,
    isHD: true,
    language: 'Farsi',
    streams: [
      {
        id: 'tamadon-stream-1',
        title: 'Tamadon HLS Server 1',
        type: 'hls',
        url: 'https://hls.tamadon.live/hls/stream.m3u8',
        quality: '720p'
      }
    ],
    schedule: [
      { id: 'tm1', time: '19:00', title: 'Tamadon World News', titleFa: 'اخبار تمدن', genre: 'News', isCurrent: true }
    ],
    keywords: ['Tamadon TV', 'Tamadon Live', 'تمدن', 'شبکه تمدن', 'پخش زنده تمدن']
  },
  {
    id: 'rta-mili-tv-live',
    slug: 'rta-mili-tv-live',
    name: 'RTA Mili TV Live',
    nameFa: 'آر تی ای ملی',
    country: 'Afghanistan',
    category: 'News',
    logoUrl: '/logos/rta.png',
    bannerUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    description: 'Watch RTA Mili TV (Radio Television Afghanistan) Live streaming. National public broadcaster providing official news, documentary, and state events.',
    descriptionFa: 'پخش زنده تلویزیون ملی افغانستان (RTA) با پوشش کامل اخبار و برنامه‌های ملی.',
    rating: 4.8,
    viewCount: '2.5M',
    isHot: true,
    isHD: true,
    language: 'Farsi',
    streams: [
      {
        id: 'rta-stream-1',
        title: 'Akamai Official Stream',
        type: 'hls',
        url: 'https://rta-tv.akamaized.net/live/SD/RTA-1/RTA/RTA-1-avc1_5800000=10002.m3u8',
        quality: 'SD'
      }
    ],
    schedule: [
      { id: 'rta1', time: '20:00', title: 'National RTA News', titleFa: 'اخبار ملی RTA', genre: 'News', isCurrent: true }
    ],
    keywords: ['RTA Mili', 'RTA Live', 'رادیو تلویزیون ملی', 'RTA', 'تلویزیون ملی افغانستان']
  },
  {
    id: 'ariana-tv-live',
    slug: 'ariana-tv-live',
    name: 'Ariana TV Live',
    nameFa: 'آریانا',
    country: 'Afghanistan',
    category: 'Entertainment',
    logoUrl: '/logos/ariana.png',
    bannerUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop&q=80',
    description: 'Watch Ariana Television Network Live streaming. Premium Afghan news, cultural programs, dramas, and sports broadcasts in HD.',
    descriptionFa: 'پخش زنده شبکه تلویزیونی آریانا افغانستان با کیفیت بالا.',
    rating: 4.8,
    viewCount: '2.0M',
    isHot: false,
    isHD: true,
    language: 'Farsi',
    streams: [
      {
        id: 'ariana-stream-1',
        title: 'Cloudfront HD Stream',
        type: 'hls',
        url: 'https://d3bq19vx8xhpwy.cloudfront.net/live/myStream/chunklist_w1913198794.m3u8',
        quality: '1080p'
      }
    ],
    schedule: [
      { id: 'ar1', time: '20:00', title: 'Ariana Evening News', titleFa: 'اخبار آریانا', genre: 'News', isCurrent: true }
    ],
    keywords: ['Ariana TV', 'Ariana Live', 'شبکه آریانا', 'پخش زنده آریانا']
  },
  {
    id: 'bbc-persian-tv-live',
    slug: 'bbc-persian-tv-live',
    name: 'BBC Persian TV Live',
    nameFa: 'بی‌بی‌سی فارسی',
    country: 'International',
    category: 'News',
    logoUrl: '/logos/bbc.png',
    bannerUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&auto=format&fit=crop&q=80',
    description: 'Watch BBC Persian TV Live news stream. Continuous global news coverage, documentaries, politics, and culture in Farsi/Persian.',
    descriptionFa: 'پخش زنده شبکه تلویزیونی بی‌بی‌سی فارسی با کیفیت بالا.',
    rating: 4.9,
    viewCount: '4.0M',
    isHot: false,
    isHD: true,
    language: 'Farsi',
    streams: [
      {
        id: 'bbc-stream-1',
        title: 'BBC Official Push Stream',
        type: 'hls',
        url: 'https://vs-hls-pushb-ww.live.cf.md.bbci.co.uk/x=4/i=urn:bbc:pips:service:bbc_persian_tv/t=3840/v=pv10/b=1604032/main.m3u8',
        quality: '1080p'
      }
    ],
    schedule: [
      { id: 'bbc1', time: '17:00', title: 'BBC Persian World News', titleFa: 'اخبار جهان', genre: 'News', isCurrent: true }
    ],
    keywords: ['BBC Persian', 'بی‌بی‌سی فارسی', 'BBC Live', 'پخش زنده بی‌بی‌سی']
  },
  {
    id: 'arezo-tv-live',
    slug: 'arezo-tv-live',
    name: 'Arezo TV Live',
    nameFa: 'آرزو',
    country: 'Afghanistan',
    category: 'Entertainment',
    logoUrl: '/logos/arezo.png',
    bannerUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&auto=format&fit=crop&q=80',
    description: 'Watch Arezo TV Live streaming. Afghanistan commercial television channel featuring local news, music, entertainment, and talk shows.',
    descriptionFa: 'پخش زنده شبکه تلویزیونی آرزو افغانستان با کیفیت بالا.',
    rating: 4.6,
    viewCount: '1.0M',
    isHot: false,
    isHD: true,
    language: 'Farsi',
    streams: [
      {
        id: 'arezo-stream-1',
        title: 'Bozztv Live Stream',
        type: 'hls',
        url: 'https://tgn.bozztv.com/eshgtv-dvrfl05/gin-arezotv/tracks-v1a1/mono.m3u8?nimblesessionid=1748655654',
        quality: '720p'
      }
    ],
    schedule: [
      { id: 'arz1', time: '21:00', title: 'Arezo Night Show', titleFa: 'برنامه شبانه آرزو', genre: 'Entertainment', isCurrent: true }
    ],
    keywords: ['Arezo TV', 'Arezo Live', 'شبکه آرزو', 'پخش زنده آرزو']
  }
];

// Helper to determine flag emoji
function getCountryFlag(country: string): string {
  if (country === 'Iran') return '🇮🇷';
  if (country === 'Afghanistan') return '🇦🇫';
  return '🌐';
}

function getCountryNameFa(country: string): string {
  if (country === 'Iran') return 'ایران';
  if (country === 'Afghanistan') return 'افغانستان';
  return 'بین‌المللی';
}

function getCategoryNameFa(category: string): string {
  if (category === 'Sports') return 'ورزشی';
  if (category === 'News') return 'اخبار';
  if (category === 'Entertainment') return 'سرگرمی';
  return category;
}

// Satellite presets for channels
const SATELLITE_PRESETS: Record<string, SatelliteFrequency[]> = {
  Iran: [
    {
      satellite: 'Intelsat 39 62.0°E / Badr 26.0°E',
      frequency: '11555',
      polarization: 'V',
      symbolRate: '30000',
      fec: '3/4',
      coverage: 'Middle East & Asia'
    },
    {
      satellite: 'Eutelsat 7B / 7C 7.0°E',
      frequency: '11262',
      polarization: 'H',
      symbolRate: '27500',
      fec: '5/6',
      coverage: 'Europe & Middle East'
    }
  ],
  Afghanistan: [
    {
      satellite: 'Yahsat 1A / TurkmenÄlem 52.0°E',
      frequency: '10887',
      polarization: 'V',
      symbolRate: '27500',
      fec: '2/3',
      coverage: 'Central Asia & Middle East'
    },
    {
      satellite: 'MonacoSat 52.0°E',
      frequency: '10845',
      polarization: 'V',
      symbolRate: '27500',
      fec: '3/4',
      coverage: 'Middle East & Europe'
    }
  ],
  International: [
    {
      satellite: 'Hotbird 13.0°E',
      frequency: '11373',
      polarization: 'H',
      symbolRate: '27500',
      fec: '3/4',
      coverage: 'Europe & North Africa'
    },
    {
      satellite: 'Eutelsat 7B 7.0°E',
      frequency: '11304',
      polarization: 'H',
      symbolRate: '29700',
      fec: '2/3',
      coverage: 'Middle East & Europe'
    }
  ]
};

// Normalized CHANNELS export
export const CHANNELS: Channel[] = RAW_CHANNELS.map((item, index) => {
  const primaryStream = item.streams?.[0];
  const streamUrl = primaryStream?.url || '';
  const quality = primaryStream?.quality || (item.isHD ? '1080p' : '720p');
  const viewers = parseViewCount(item.viewCount);
  const flag = getCountryFlag(item.country);
  const countryNameFa = getCountryNameFa(item.country);
  const categoryNameFa = getCategoryNameFa(item.category);
  const bannerImage = item.bannerImage || 'https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=1200&auto=format&fit=crop&q=80';
  const logo = item.logoUrl || '';

  const epg = item.schedule.map((s, idx) => ({
    id: s.id,
    title: s.title,
    titleFa: s.titleFa,
    startTime: s.time,
    endTime: idx < item.schedule.length - 1 ? item.schedule[idx + 1].time : '23:59',
    description: `${s.title} live on ${item.name}`,
    descriptionFa: `پخش زنده برنامه ${s.titleFa} از شبکه ${item.nameFa}`,
    category: s.genre,
    genre: s.genre,
    isLive: Boolean(s.isCurrent)
  }));

  return {
    ...item,
    streamUrl,
    backupStreamUrls: item.streams.map((s) => s.url),
    bannerImage,
    logo,
    flag,
    countryName: item.country,
    countryNameFa,
    categoryName: item.category,
    categoryNameFa,
    viewers,
    quality,
    resolution: quality === '1080p' ? '1920x1080' : quality === '720p' ? '1280x720' : '720x576',
    bitrate: quality === '1080p' ? '4.8 Mbps' : '2.5 Mbps',
    fps: 50,
    languageFa: item.language === 'Pashto' ? 'پښتو' : 'فارسی',
    isOnline: true,
    featured: Boolean(item.isHot || index < 4),
    satellites: SATELLITE_PRESETS[item.country] || SATELLITE_PRESETS.International,
    epg,
    tags: item.keywords
  };
});

export const CATEGORIES = [
  { id: 'All', name: 'All Channels', nameFa: 'همه شبکه‌ها', icon: 'Tv' },
  { id: 'Entertainment', name: 'Entertainment', nameFa: 'سرگرمی', icon: 'Film' },
  { id: 'Sports', name: 'Sports', nameFa: 'ورزشی', icon: 'Trophy' },
  { id: 'News', name: 'News', nameFa: 'اخبار', icon: 'Newspaper' },
] as const;

export const COUNTRIES = [
  { id: 'All', name: 'All Regions', nameFa: 'همه' },
  { id: 'Afghanistan', name: 'Afghanistan', nameFa: 'افغانستان' },
  { id: 'Iran', name: 'Iran', nameFa: 'ایران' },
  { id: 'International', name: 'International', nameFa: 'بین‌المللی' }
] as const;

export function getChannelBySlug(slug: string): Channel | undefined {
  return CHANNELS.find((c) => c.slug === slug || c.id === slug);
}

export function getFeaturedChannels(): Channel[] {
  return CHANNELS.filter((c) => c.featured || c.isHot);
}

export function getRelatedChannels(channel: Channel, limit = 4): Channel[] {
  return CHANNELS
    .filter((c) => c.id !== channel.id && (c.country === channel.country || c.category === channel.category))
    .slice(0, limit);
}
