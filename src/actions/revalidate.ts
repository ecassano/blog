'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateAllPosts() {
  revalidateTag('posts', '60');
}
