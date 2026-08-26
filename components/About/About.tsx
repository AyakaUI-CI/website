"use client";

import { motion } from "framer-motion";
import styles from "./About.module.css";

export default function About(){

 return (
  <motion.div
   className={styles.about}
   initial={{
    opacity:0,
    y:40
   }}

   animate={{
    opacity:1,
    y:0
   }}

   transition={{
    duration:.5
   }}
  >

   <span className={styles.label}>
    About AyakaUI
   </span>


   <h2 className={styles.title}>
    What is <span>AyakaUI?</span>
   </h2>


   <p className={styles.text}>
    AyakaUI is an AOSP based ROM focused on
    delivering a clean, beautiful and powerful
    Android experience with Material You,
    customization and performance.
   </p>


  </motion.div>
 )

}
