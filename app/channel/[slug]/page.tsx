import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ChannelRedirectPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/live-tv/${slug}`);
}
