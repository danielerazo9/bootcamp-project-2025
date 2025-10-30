// src/app/blogData.ts
export interface Blog {
  slug: string;
  title: string;
  date: string;
  image: string;   // e.g. "/images/ts.png"
  content: string; // short paragraph/preview
}

const blogs: Blog[] = [
  {
    slug: "learning-typescript",
    title: "Learning TypeScript",
    date: "October 14, 2025",
    image: "/images/ts.png",
    content:
      "This was my first time using TypeScript! I learned about types, compiling with npx tsc, and connecting my JS to HTML.",
  },
  {
    slug: "dom-manipulation",
    title: "DOM Manipulation",
    date: "October 15, 2025",
    image: "/images/dom.jpg",
    content:
      "In this post, I used JavaScript to dynamically create blog posts in the DOM and link them to their individual pages!",
  },
];

export default blogs;
