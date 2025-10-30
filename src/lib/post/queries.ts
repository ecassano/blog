import { postRepository } from '@/repositories/post';
import { cache } from 'react';

export const findAllCachedPublicPosts = cache(
  async () => await postRepository.findAllPublished(),
);

export const findCachedPostBySlug = cache(async (slug: string) => {
  const post = await postRepository.findBySlug(slug);
  if (!post) {
    throw new Error(`Post with slug ${slug} not found`);
  }
  return post;
});

export const findCachedPostById = cache(
  async (id: string) => await postRepository.findById(id),
);
