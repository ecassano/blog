import ErrorMessage from '../ErrorMessage';
import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';
import { findAllCachedPublicPosts } from '@/lib/post/queries/public';

export async function PostFeatured() {
  const posts = await findAllCachedPublicPosts();

  if (posts.length <= 0)
    return (
      <ErrorMessage
        contentTitle='Ops 😅'
        content='Ainda não criamos nenhum post.'
      />
    );

  const post = posts[0];

  const postLink = `/post/${post.slug}`;

  return (
    <section className='group grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2'>
      <PostCoverImage
        imageProps={{
          src: post.coverImageUrl,
          width: 1200,
          height: 720,
          priority: true,
          alt: post.title,
        }}
        linkProps={{ href: postLink }}
      />

      <PostSummary
        postHeading='h1'
        postLink={postLink}
        createdAt={post.createdAt}
        title={post.title}
        excerpt={post.excerpt}
      />
    </section>
  );
}
