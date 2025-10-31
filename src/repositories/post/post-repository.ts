import { PostModel } from '@/models/post/post-model';

export interface PostRepository {
  findAllPublished(): Promise<PostModel[]>;
  findAll(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel | null>;
  findBySlugPublished(slug: string): Promise<PostModel | null>;
  // create(post: PostModel): Promise<PostModel>;
  // update(post: PostModel): Promise<PostModel>;
  // delete(id: string): Promise<void>;
}
