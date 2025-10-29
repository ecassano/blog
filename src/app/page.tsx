import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';
import { PostsList } from '@/components/PostsList';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { PostFeatured } from '@/components/PostFeatured';

export default async function Home() {
  return (
    <Container>
      <Header />

      <Suspense fallback={<SpinLoader />}>
        <PostFeatured />
      </Suspense>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>
        <p>Copyright 2025</p>
      </footer>
    </Container >
  );
}
