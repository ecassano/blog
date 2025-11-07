'use server';

import { postRepository } from '@/repositories/post';
import { revalidateTag } from 'next/cache';
import { verifyLoginSession } from '@/lib/login/manage-login';

export async function deletePostAction(id: string) {
  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) {
    return {
      error: 'Faça login em outra aba antes de apagar.',
    };
  }

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos',
    };
  }

  let post;
  try {
    post = await postRepository.delete(id);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    }

    return {
      error: 'Erro desconhecido',
    };
  }

  revalidateTag('posts', { expire: 60 * 60 * 24 });
  revalidateTag(`post-${post.slug}`, { expire: 60 * 60 * 24 });

  return {
    error: '',
  };
}
