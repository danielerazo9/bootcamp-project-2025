// src/app/portfolioData.ts

export type Project = {
  slug: string;
  title: string;
  date: string;
  shortDescription: string;
  longDescription: string;
};

export const projects: Project[] = [
  {
    slug: "personal-website",
    title: "Daniel's Personal Website",
    date: "10/15/2025",
    shortDescription:
      "A personal portfolio and blog site built for the Hack4Impact bootcamp milestones.",
    longDescription:
      "This project is my personal website built as part of Hack4Impact's bootcamp milestones. " +
      "It uses Next.js with the App Router, TypeScript, and CSS modules. The site includes a blog section " +
      "with dynamic routes for individual posts, a MongoDB-backed comment system, and a contact form " +
      "that sends messages via an API route. It also showcases my journey learning TypeScript, DOM " +
      "manipulation, and full-stack development fundamentals.",
  },
];
