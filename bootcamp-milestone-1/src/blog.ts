// src/blog.ts

// Define the Blog type
type Blog = {
  title: string;
  date: string;
  description: string;
  image: string;
  imageAlt: string;
  slug: string;
};

// Create blog entries
const blogs: Blog[] = [
  {
    title: "Learning TypeScript",
    date: "October 14, 2025",
    description: "A beginner-friendly walkthrough of TypeScript basics and why static typing helps prevent bugs.",
    image: "./images/ts.png",
    imageAlt: "TypeScript graphic",
    slug: "learning-typescript"
  },
  {
    title: "DOM Manipulation in JS",
    date: "October 15, 2025",
    description: "An introduction to manipulating the DOM dynamically with JavaScript for interactive web pages.",
    image: "./images/dom.jpg",
    imageAlt: "DOM example image",
    slug: "dom-manipulation"
  }
];

// Wait for HTML to fully load before running
document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.getElementById("blog-container");
  if (!blogContainer) return;

  blogs.forEach((blog) => {
    // Create post container
    const postDiv = document.createElement("div");
    postDiv.className = "blog-post";

    // Make each title clickable → links to /blogs/{slug}.html
    const titleLink = document.createElement("a");
    titleLink.href = `./blogs/${blog.slug}.html`;
    titleLink.textContent = blog.title;

    const title = document.createElement("h2");
    title.appendChild(titleLink);

    const date = document.createElement("p");
    date.textContent = blog.date;

    const desc = document.createElement("p");
    desc.textContent = blog.description;

    const img = document.createElement("img");
    img.src = blog.image;
    img.alt = blog.imageAlt;

    // Append all to post container
    postDiv.append(img, title, date, desc);
    blogContainer.appendChild(postDiv);
  });
});
