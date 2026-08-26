export type SupportedLanguage = 'en' | 'fa' | 'ps';

export interface Translations {
  // Brand
  brandName: string;
  brandTagline: string;
  
  // Nav
  navLiveTv: string;
  navGuide: string;
  navMultiView: string;
  navFavorites: string;
  navSearchPlaceholder: string;
  
  // Filters & Categories
  allChannels: string;
  allRegions: string;
  regionIran: string;
  regionAfghanistan: string;
  regionInternational: string;
  categoryAll: string;
  categoryEntertainment: string;
  categorySports: string;
  categoryNews: string;
  favoritesOnly: string;
  showingCount: string;
  resetFilters: string;
  quickJump: string;
  
  // Card & Quick Watch
  liveBadge: string;
  watchLive: string;
  quickWatch: string;
  viewers: string;
  watchingNow: string;
  addToFavorites: string;
  removeFromFavorites: string;
  hdQuality: string;
  farsiDari: string;
  pashto: string;
  
  // Player
  serverSource: string;
  backupSource: string;
  reportIssue: string;
  shareStream: string;
  copiedToClipboard: string;
  satelliteFrequencies: string;
  frequency: string;
  polarization: string;
  symbolRate: string;
  coverage: string;
  fec: string;
  epgSchedule: string;
  nextShow: string;
  relatedChannels: string;
  liveChat: string;
  sendChatPlaceholder: string;
  chatOnline: string;
  
  // Pages
  heroTitle: string;
  heroSubtitle: string;
  featuredLive: string;
  favoritesTitle: string;
  favoritesEmpty: string;
  guideTitle: string;
  guideSubtitle: string;
  multiviewTitle: string;
  multiviewSubtitle: string;
  addChannelToSlot: string;
  
  // Footer
  footerAbout: string;
  footerFreeNote: string;
  footerRights: string;
  footerDisclaimer: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  en: {
    brandName: 'darya.stream',
    brandTagline: 'Live Persian & Afghan TV Channels',
    navLiveTv: 'Live TV',
    navGuide: 'TV Guide (EPG)',
    navMultiView: 'Multi-View',
    navFavorites: 'Favorites',
    navSearchPlaceholder: 'Search TV (e.g. IRIB, Tolo, Varzish, BBC)...',
    allChannels: 'All Channels',
    allRegions: 'All Regions',
    regionIran: 'Iran',
    regionAfghanistan: 'Afghanistan',
    regionInternational: 'International',
    categoryAll: 'All Categories',
    categoryEntertainment: 'Entertainment',
    categorySports: 'Sports',
    categoryNews: 'News',
    favoritesOnly: 'Favorites Only',
    showingCount: 'Showing',
    resetFilters: 'Reset Filters',
    quickJump: 'Quick Filter:',
    liveBadge: 'LIVE',
    watchLive: 'Watch Live',
    quickWatch: 'Quick Preview',
    viewers: 'Viewers',
    watchingNow: 'watching now',
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
    hdQuality: '1080p HD',
    farsiDari: 'Persian / Dari (فارسی / دری)',
    pashto: 'Pashto (پښتو)',
    serverSource: 'Source',
    backupSource: 'Backup Server',
    reportIssue: 'Report Stream',
    shareStream: 'Share Channel',
    copiedToClipboard: 'Link copied to clipboard!',
    satelliteFrequencies: 'Satellite Frequencies',
    frequency: 'Frequency',
    polarization: 'Polarization',
    symbolRate: 'Symbol Rate',
    coverage: 'Coverage',
    fec: 'FEC',
    epgSchedule: 'Program Guide (EPG)',
    nextShow: 'Next Up',
    relatedChannels: 'Recommended Channels',
    liveChat: 'Live Stream Chat',
    sendChatPlaceholder: 'Type a message in community chat...',
    chatOnline: 'viewers in chat',
    heroTitle: 'Stream Persian & Afghan Live TV Online HD',
    heroSubtitle: 'Free 24/7 high-definition streams of IRIB, Tolo, Varzish, Iran International, BBC Persian, Ariana, and entertainment channels with real-time EPG.',
    featuredLive: 'FEATURED BROADCAST',
    favoritesTitle: 'My Saved Channels',
    favoritesEmpty: 'No channels added to your favorites yet. Click the heart icon on any channel to save it.',
    guideTitle: 'Interactive TV Guide (EPG)',
    guideSubtitle: 'Browse broadcast schedules, live airing times, and upcoming shows across all Persian and Afghan channels.',
    multiviewTitle: 'Multi-Screen Live Broadcaster',
    multiviewSubtitle: 'Watch up to 4 live channels simultaneously on a single screen without interruptions.',
    addChannelToSlot: 'Select a channel to watch',
    footerAbout: 'Free online live TV portal streaming Persian & Afghan television channels with interactive EPG schedules and multi-view technology.',
    footerFreeNote: '100% Free & No Sign-up Required',
    footerRights: 'All TV logos and broadcast trademarks belong to their respective networks.',
    footerDisclaimer: 'All broadcast streams are embedded from public network feeds. darya.stream does not host copyrighted media files.',
  },
  fa: {
    brandName: 'دریا استریم',
    brandTagline: 'پخش زنده تلویزیون فارسی و دری و افغانی',
    navLiveTv: 'پخش زنده شبکه‌ها',
    navGuide: 'جدول پخش (EPG)',
    navMultiView: 'نمایش چندگانه',
    navFavorites: 'علاقه‌مندی‌ها',
    navSearchPlaceholder: 'جستجوی شبکه (مثل سه، طلوع، ورزش، بی‌بی‌سی)...',
    allChannels: 'همه شبکه‌ها',
    allRegions: 'همه کشورها',
    regionIran: 'ایران',
    regionAfghanistan: 'افغانستان',
    regionInternational: 'بین‌المللی',
    categoryAll: 'همه دسته‌ها',
    categoryEntertainment: 'سرگرمی و فیلم',
    categorySports: 'ورزشی و زنده',
    categoryNews: 'اخبار و گزارش',
    favoritesOnly: 'فقط علاقه‌مندی‌ها',
    showingCount: 'تعداد شبکه‌ها',
    resetFilters: 'حذف فیلترها',
    quickJump: 'دسترسی سریع:',
    liveBadge: 'زنده',
    watchLive: 'تماشای زنده',
    quickWatch: 'پیش‌نمایش سریع',
    viewers: 'بیننده',
    watchingNow: 'بیننده آنلاین',
    addToFavorites: 'افزودن به علاقه‌مندی‌ها',
    removeFromFavorites: 'حذف از علاقه‌مندی‌ها',
    hdQuality: 'کیفیت اچ‌دی HD',
    farsiDari: 'فارسی / دری',
    pashto: 'پښتو',
    serverSource: 'سرور پخش',
    backupSource: 'سرور پشتیبان',
    reportIssue: 'گزارش قطعی پخش',
    shareStream: 'اشتراک‌گذاری شبکه',
    copiedToClipboard: 'لینک پخش زنده کپی شد!',
    satelliteFrequencies: 'فرکانس‌های ماهواره',
    frequency: 'فرکانس',
    polarization: 'قطبیت',
    symbolRate: 'سیمبل ریت',
    coverage: 'پوشش',
    fec: 'FEC',
    epgSchedule: 'جدول زمان‌بندی و برنامه‌ها',
    nextShow: 'برنامه بعدی',
    relatedChannels: 'شبکه‌های مشابه و پیشنهادی',
    liveChat: 'گفتگوی زنده کاربران',
    sendChatPlaceholder: 'پیام خود را بنویسید...',
    chatOnline: 'کاربر آنلاین در چت',
    heroTitle: 'پخش زنده رایگان تلویزیون فارسی و افغانی با کیفیت HD',
    heroSubtitle: 'تماشای بدون قطعی شبکه‌های سه، طلوع، ورزش، ایران اینترنشنال، بی‌بی‌سی فارسی، آریانا و کانال‌های سرگرمی به همراه جدول پخش و نمایش همزمان.',
    featuredLive: 'پخش ویژه و برگزیده',
    favoritesTitle: 'شبکه‌های برگزیده من',
    favoritesEmpty: 'هنوز شبکه‌ای ذخیره نکرده‌اید. با کلیک روی آیکون قلب هر شبکه، آن را ذخیره کنید.',
    guideTitle: 'جدول پخش زنده شبکه‌ها (EPG)',
    guideSubtitle: 'مشاهده برنامه‌های در حال پخش و زمان‌بندی شبکه‌های تلویزیونی ایران و افغانستان.',
    multiviewTitle: 'نمایش همزمان چند شبکه (Multi-View)',
    multiviewSubtitle: 'تماشای همزمان تا ۴ شبکه زنده روی یک صفحه بدون وقفه.',
    addChannelToSlot: 'یک شبکه را برای تماشا انتخاب کنید',
    footerAbout: 'سامانه رایگان پخش زنده شبکه‌های فارسی، دری و افغانی به همراه جدول پخش هوشمند و پخش چندگانه.',
    footerFreeNote: 'کاملاً رایگان و بدون نیاز به ثبت‌نام',
    footerRights: 'تمام لوگوها و حقوق پخش متعلق به شبکه‌های مربوطه می‌باشد.',
    footerDisclaimer: 'پخش‌های زنده از بستر عمومی شبکه‌ها بارگذاری می‌شوند و دریا استریم محتوایی را میزبانی نمی‌کند.',
  },
  ps: {
    brandName: 'دریا سټریم',
    brandTagline: 'د افغانستان او فارسي ژوندی تلویزون',
    navLiveTv: 'ژوندۍ خپرونې',
    navGuide: 'د خپرونو مهالویش (EPG)',
    navMultiView: 'څو ګونی ننداره',
    navFavorites: 'خوښ شوي چینلونه',
    navSearchPlaceholder: 'د چینل لټون (لکه طلوع، ورزش، لمر، آریانا)...',
    allChannels: 'ټول چینلونه',
    allRegions: 'ټولې سیمې',
    regionIran: 'ایران',
    regionAfghanistan: 'افغانستان',
    regionInternational: 'نړیوال',
    categoryAll: 'ټولې کټګورۍ',
    categoryEntertainment: 'تفریحي او فلم',
    categorySports: 'سپورتي',
    categoryNews: 'خبرونه',
    favoritesOnly: 'یوازې خوښ شوي',
    showingCount: 'ښودل شوي',
    resetFilters: 'فلټر پاکول',
    quickJump: 'چټک لاسرسی:',
    liveBadge: 'ژوندی',
    watchLive: 'ژوندی لیدل',
    quickWatch: 'چټک مخکتنه',
    viewers: 'لیدونکي',
    watchingNow: 'آنلاین لیدونکي',
    addToFavorites: 'خوښ شویو کې اضافه کول',
    removeFromFavorites: 'له خوښ شویو لرې کول',
    hdQuality: 'لوړ کیفیت HD',
    farsiDari: 'فارسي / دري',
    pashto: 'پښتو',
    serverSource: 'سرور سرچینه',
    backupSource: 'بدیل سرور',
    reportIssue: 'د ستونزې راپور',
    shareStream: 'د چینل شریکول',
    copiedToClipboard: 'لینک کاپي شو!',
    satelliteFrequencies: 'د سپوږمکۍ فریکونسۍ',
    frequency: 'فریکونسي',
    polarization: 'قطبیت',
    symbolRate: 'سمبول ریټ',
    coverage: 'پوښښ',
    fec: 'FEC',
    epgSchedule: 'د پروګرامونو مهالویش',
    nextShow: 'راتلونکی پروګرام',
    relatedChannels: 'ورته او وړاندیز شوي چینلونه',
    liveChat: 'ژوندۍ خبرې اترې',
    sendChatPlaceholder: 'خپل پیغام دلته ولیکئ...',
    chatOnline: 'آنلاین کاروونکي',
    heroTitle: 'د افغانستان او فارسي تلویزیوني چینلونو ژوندۍ خپرونې',
    heroSubtitle: 'د طلوع، طلوع نیوز، لمر، ورزش، آریانا او نورو مشهورو چینلونو وړیا او بې ځنډه لیدل.',
    featuredLive: 'ځانګړې خپرونه',
    favoritesTitle: 'زما خوښ شوي چینلونه',
    favoritesEmpty: 'تراوسه مو کوم چینل نه دی خوندي کړی. د زړه نښه ووهئ.',
    guideTitle: 'د خپرونو بشپړ مهالویش (EPG)',
    guideSubtitle: 'د ټولو تلویزوني چینلونو د خپرونو اوسنی او راتلونکی وخت وګورئ.',
    multiviewTitle: 'په یوه وخت د څو چینلونو لیدل',
    multiviewSubtitle: 'په یوه پاڼه کې تر ۴ ژوندي چینلونه په یو وخت وګورئ.',
    addChannelToSlot: 'د لیدلو لپاره یو چینل وټاکئ',
    footerAbout: 'د افغانستان او فارسي ټلویزیوني چینلونو وړیا آنلاین خپرونې د مهالویش او څوګوني نندارې سره.',
    footerFreeNote: 'سل په سلو کې وړیا او پرته له ثبت څخه',
    footerRights: 'د ټولو چینلونو لوګوګانې او امتیازات د خپلو شبکو اړوند دي.',
    footerDisclaimer: 'ټولې خپرونې د عامه شبکو څخه خپریږي او دریا سټریم هیڅ ویډیو نه ذخیره کوي.',
  }
};
