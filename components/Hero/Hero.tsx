"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import About from "../About/About";
import styles from "./Hero.module.css";

export default function Hero(){

 const [showAbout,setShowAbout] = useState(false);

 return (
  <section className={styles.hero}>

   <div className={styles.card}>

    <div className={styles.content}>

     <span className={styles.badge}>
      Android 17
     </span>

     <h1 className={styles.title}>
      Ayaka<span>UI</span>
     </h1>

     <p className={styles.text}>
      A beautiful Android experience
      crafted with Material You.
     </p>

     <div className={styles.actions}>

<Link 
 href="/devices"
 className={styles.button}
>
 Get AyakaUI
</Link>


      <button
       className={styles.secondary}
       onClick={() => setShowAbout(true)}
      >
       Learn more
      </button>

     </div>

    </div>

    <motion.img
     src="/ayaka/ayaka.webp"
     alt="Ayaka"
     className={styles.ayaka}

     onClick={() => setShowAbout(true)}

     animate={{
      y:[0,-12,0]
     }}

     transition={{
      duration:5,
      repeat:Infinity
     }}
    />

    {
     showAbout && (
      <About/>
     )
    }

   </div>
  </section>
 );
}
