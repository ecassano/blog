import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';
import { PostsList } from '@/components/PostsList';
import { PostFeatured } from '@/components/PostFeatured';

export default async function Home() {
  return (
    <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
      <PostFeatured />
      <PostsList />
    </Suspense>
  );
}
