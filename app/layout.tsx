import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AppProvider } from '@/lib/app-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'darya.stream - Watch Persian & Afghan Live TV Online HD | پخش زنده تلویزیون',
  description: 'Watch free live Persian and Afghan television channels online in HD. Stream Tolo TV, Iran International, BBC Persian, Ariana TV, GEM TV, PMC Music with EPG schedules and Multi-View on darya.stream.',
  keywords: [
    'darya stream',
    'darya.stream',
    'live tv persian',
    'live tv afghanistan',
    'پخش زنده تلویزیون',
    'تلویزیون طلوع',
    'ایران اینترنشنال',
    'بی بی سی فارسی',
    'جم تی وی',
    'tolo tv live',
    'iran international live',
    'bbc persian live',
    'afghanistan international',
    'ariana tv live',
    'free live tv stream',
    'yahsat frequencies',
  ],
  authors: [{ name: 'Darya Stream' }],
  creator: 'Darya Stream Network',
  metadataBase: new URL('https://darya.stream'),
  openGraph: {
    title: 'darya.stream - Live Persian & Afghan TV Channels HD',
    description: 'Stream live Persian and Afghan television with EPG schedules, category filters, and multi-view split screen on darya.stream.',
    url: 'https://darya.stream',
    siteName: 'Darya Stream Live TV',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1200&auto=format&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'Darya Stream - Live Persian & Afghan TV',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'darya.stream - Live Persian & Afghan TV Channels HD',
    description: 'Stream live Persian and Afghan TV online in HD with schedules and multi-screen mode.',
    images: ['https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1200&auto=format&fit=crop&q=80'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased flex flex-col font-sans transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
