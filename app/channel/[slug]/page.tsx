import { redirect, notFound } from 'next/navigation';
import { getChannelBySlug, findChannelFuzzy } from '@/lib/channels-data';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ChannelRedirectPage({ params }: Props) {
  const { slug } = await params;
  const direct = getChannelBySlug(slug);
  if (direct) {
    redirect(`/live-tv/${direct.slug}`);
  }

  const fuzzy = findChannelFuzzy(slug);
  if (fuzzy) {
    redirect(`/live-tv/${fuzzy.slug}`);
  }

  redirect(`/live-tv/${slug}`);
}

