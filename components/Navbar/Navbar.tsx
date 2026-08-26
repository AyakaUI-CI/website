"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar(){

 const [open,setOpen] = useState(false);

 return (
  <nav className={styles.nav}>

   <div className={styles.logo}>
    <Link href="/">
    ✦ AyakaUI
   </Link>
   </div>

   <div className={styles.links}>


   </div>

   <button className={styles.button}>
    Download
   </button>


   {/* BOTÃO MOBILE */}
   <button
    className={styles.menu}
    onClick={() => setOpen(!open)}
   >
    {open ? "✕" : "☰"}
   </button>


   {open && (
    <div className={styles.mobileMenu}>
    <Link href="/">
    Home
   </Link>
   <Link href="/download">
   Download
   </Link>
   <Link href="/devices">
   Devices
   </Link>
   <Link href="/team">
   Team
   </Link>
   <Link href="/blog">
   Blog
   </Link>
     <button>
      Download ROM
     </button>
    </div>
   )}

  </nav>
 )
}
