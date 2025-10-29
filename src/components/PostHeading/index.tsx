import Link from "next/link";
import clsx from "clsx";

type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function PostHeading({ children, url, as: Tag = 'h2' }: PostHeadingProps) {
  const headingClassesMap = {
    h1: 'text-2xl/tight sm:text-4xl font-extrabold',
    h2: 'text-2xl/tight font-bold',
    h3: 'text-2xl/tight font-bold',
    h4: 'text-2xl/tight font-bold',
    h5: 'text-2xl/tight font-bold',
    h6: 'text-2xl/tight font-bold',
  }

  return (
    <Tag className={clsx(headingClassesMap[Tag])}>
      <Link className="group-hover:text-slate-600 dark:group-hover:text-slate-400 transition" href={url}>{children}</Link>
    </Tag>
  )
}