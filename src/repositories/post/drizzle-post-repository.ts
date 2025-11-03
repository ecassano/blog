import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { drizzleDb } from '@/db/drizzle';
import { logColor } from '@/utils/log-color';
import { asyncDelay } from '@/utils/async-delay';
import { SIMULATE_WAIT_IN_MS } from '@/lib/constants';

export class DrizzlePostRepository implements PostRepository {
  async findAllPublished(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS);
    logColor('findAllPublished', Date.now());
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublished(slug: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS);
    logColor('findBySlugPublished', Date.now());
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.slug, slug), eq(posts.published, true)),
    });
    if (!post) {
      throw new Error(`Post with slug ${slug} not found`);
    }
    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS);
    logColor('findAll', Date.now());
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS);
    logColor('findById', Date.now());
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error('Post não encontrado para ID');

    return post;
  }
}

// (async () => {
//   const repo = new DrizzlePostRepository();
//   const posts = await repo.findAll();

//   console.log('\n', 'posts', '\n');

//   posts.forEach(post => console.log(post.slug, post.published));
// })();
