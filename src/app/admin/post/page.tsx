import { Metadata } from 'next';
import { findAllPostAdmin } from '@/lib/post/queries/admin';
import { Suspense } from 'react';
import PostListAdmin from '@/components/PostsListAdmin';
import { SpinLoader } from '@/components/SpinLoader';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Post Admin',
};

export default async function AdminPostPage() {
  return (
    <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
      <PostListAdmin />
    </Suspense>
  );
}
