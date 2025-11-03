import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';
import { SIMULATE_WAIT_IN_MS } from '@/lib/constants';

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  'src',
  'db',
  'seed',
  'posts.json',
);

export class JsonPostRepository implements PostRepository {
  private async simulateWait() {
    if (SIMULATE_WAIT_IN_MS <= 0) return;

    await new Promise(resolve => setTimeout(resolve, SIMULATE_WAIT_IN_MS));
  }

  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8');
    const parsedContent = JSON.parse(jsonContent);
    const { posts } = parsedContent;
    return posts;
  }

  async findAllPublished(): Promise<PostModel[]> {
    await this.simulateWait();

    const posts = await this.readFromDisk();
    return posts.filter(post => post.published);
  }

  async findAll(): Promise<PostModel[]> {
    await this.simulateWait();

    console.log('\n', 'findAll', '\n');

    const posts = await this.readFromDisk();
    return posts;
  }

  async findById(id: string): Promise<PostModel | null> {
    const posts = await this.findAllPublished();
    const post = posts.find(post => post.id === id);
    if (!post) {
      throw new Error(`Post with id ${id} not found`);
    }
    return post;
  }

  async findBySlugPublished(slug: string): Promise<PostModel | null> {
    const posts = await this.findAllPublished();
    const post = posts.find(post => post.slug === slug);
    if (!post) {
      throw new Error(`Post with slug ${slug} not found`);
    }
    return post;
  }
}
