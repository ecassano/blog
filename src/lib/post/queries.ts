import { postRepository } from '@/repositories/post';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

export const findAllCachedPublicPosts = unstable_cache(
  cache(async () => {
    const posts = await postRepository.findAllPublished().catch(() => null);
    if (!posts) {
      throw new Error('Failed to fetch posts');
    }
    return posts;
  }),
  ['posts'],
  { tags: ['posts'], revalidate: 60 },
);

export const findPostBySlugCached = (slug: string) =>
  unstable_cache(
    cache(async (slug: string) => {
      const post = await postRepository
        .findBySlugPublished(slug)
        .catch(() => undefined);
      if (!post) {
        throw new Error(`Post with slug ${slug} not found`);
      }
      return post;
    }),
    ['posts'],
    {
      tags: [`post-${slug}`],
    },
  )(slug);

export const findCachedPostById = cache(
  async (id: string) => await postRepository.findById(id),
);
