import React from "react";
import style from "./navbar.module.css"; // connects the CSS file
import Link from "next/link"; // React’s version of <a href="">

export default function Navbar() {
  return (
    <header className={style.navbar}>
      <h1>Daniel’s Website</h1>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/blog">Blogs</Link>
        <Link href="/resume">Resume</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
