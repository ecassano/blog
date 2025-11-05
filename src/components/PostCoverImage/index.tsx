import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

type PostCoverImageProps = {
  imageProps: React.ComponentProps<typeof Image>;
  linkProps: React.ComponentProps<typeof Link>;
}

export function toRelativeIfLocal(src: string): string {
  // Se for import estático (objeto), apenas retorne como está
  if (typeof src !== 'string') return src;

  // Se for string absoluta para localhost/127.0.0.1, troque por caminho relativo
  if (
    src.startsWith('http://localhost:3000') ||
    src.startsWith('http://127.0.0.1:3000') ||
    src.startsWith('http://[::1]:3000')
  ) {
    try {
      const u = new URL(src);
      return u.pathname + u.search; // ex.: "/uploads/1762348008289.jpg"
    } catch {
      // se não for URL válida, mantenha
      return src;
    }
  }

  return src;
}

export function PostCoverImage({ imageProps, linkProps }: PostCoverImageProps) {

  const imageUrl = toRelativeIfLocal(imageProps.src as string);

  return (
    <Link
      {...linkProps}
      className={clsx('w-full h-full overflow-hidden rounded-xl', linkProps.className)}
    >
      <Image
        {...imageProps}
        className={clsx('w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300', imageProps.className)}
        alt={imageProps.alt}
        src={imageUrl}
      />
    </Link >
  );
}