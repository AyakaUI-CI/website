"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import ThemeToggle from "../Theme/ThemeToggle";

export default function Navbar(){

 const [open,setOpen] = useState(false);
 const pathname = usePathname();

 return (
  <nav className={styles.nav}>


   <div className={styles.logo}>
    <Link href="/">
     ✦ AyakaUI
    </Link>
   </div>



<div className={styles.links}>


<Link
 href="/"
 className={
  pathname === "/"
  ? styles.active
  : ""
 }
>
 Home
</Link>


<Link
 href="/devices"
 className={
  pathname.startsWith("/download")
  ? styles.active
  : ""
 }
>
 Download
</Link>


<Link
 href="/team"
 className={
  pathname.startsWith("/team")
  ? styles.active
  : ""
 }
>
 Team
</Link>


<Link
 href="/blog"
 className={
  pathname.startsWith("/blog")
  ? styles.active
  : ""
 }
>
 Blog
</Link>


</div>


   <div className={styles.actions}>

    <ThemeToggle />

    {/* BOTÃO MOBILE */}

    <button
     className={styles.menu}
     onClick={() => setOpen(!open)}
    >

     {open ? "✕" : "☰"}

    </button>

   </div>



   {open && (

    <div className={styles.mobileMenu}>


     <Link href="/">
      Home
     </Link>


     <Link href="/devices">
      Download
     </Link>

     <Link href="/team">
      Team
     </Link>


     <Link href="/blog">
      Blog
     </Link>


     <Link
      href="/devices"
      className={styles.mobileButton}
     >
      Download ROM
     </Link>


    </div>

   )}


  </nav>
 )

}
