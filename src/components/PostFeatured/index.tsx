import { PostCoverImage } from "../PostCoverImage";
import { PostHeading } from "../PostHeading";

export function PostFeatured() {
  const slug = "qualquer";
  const postLink = `/post/${slug}`;

  return (
    <section className='group grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2'>
      <PostCoverImage
        imageProps={{ src: '/images/bryen_0.png', width: 1200, height: 720, priority: true, alt: 'Post Cover' }}
        linkProps={{ href: postLink }}
      />
      <div className='flex flex-col gap-4 sm:justify-center'>
        <time className='text-slate-600 block text-sm' dateTime="2025-10-28">
          28/10/2025 21:56
        </time>

        <PostHeading as="h1" url={postLink}>
          Rotina matinal de pessoas altamente eficazes
        </PostHeading>

        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere quis nobis perferendis
          tenetur neque sit.
        </p>
      </div>
    </section>
  );
}