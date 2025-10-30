// src/components/blogPreview.tsx
import Image from "next/image";
import Link from "next/link";
import styles from "./blogPreview.module.css";

// These are the props this component expects (matches your blogData fields)
export type BlogPreviewProps = {
  slug: string;
  title: string;
  date: string;
  image: string;
  content: string;
};

export default function BlogPreview({
  slug,
  title,
  date,
  image,
  content,
}: BlogPreviewProps) {
  return (
    <div className={styles.card}>
      <Image
        src={image}
        alt={title}
        width={500}
        height={300}
        className={styles.image}
      />
      <h3 className={styles.title}>
        <Link href={`/blog/${slug}`}>{title}</Link>
      </h3>
      <p className={styles.meta}><strong>Posted:</strong> {date}</p>
      <p className={styles.text}>{content}</p>
      <Link className={styles.readMore} href={`/blog/${slug}`}>
        Read more →
      </Link>
    </div>
  );
}
