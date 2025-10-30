import { findCachedPostBySlug } from "@/lib/post/queries";
import { Metadata } from "next";
import { SinglePost } from "@/components/SinglePost";
import { Suspense } from "react";
import { SpinLoader } from "@/components/SpinLoader";

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await findCachedPostBySlug(slug).catch(() => null);
  if (!post) {
    return {
      title: "Página não encontrada",
    };
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
      <SinglePost slug={slug} />
    </Suspense>
  );
}