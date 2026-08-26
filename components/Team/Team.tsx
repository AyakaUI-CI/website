"use client";

import { motion } from "framer-motion";

import {
 FaGithub,
 FaTelegram
} from "react-icons/fa";

import styles from "./Team.module.css";


const members = [
 {
  name:"Henri",
  role:"Founder & Maintainer",
  github:"whyakari",
  telegram:"#",
 },
 {
  name:"Linus Torvalds",
  role:"Developer",
  github:"torvalds",
  telegram:"#",
 },
 {
  name:"Melody",
  role:"Community Manager",
  github:"Melody",
  telegram:"#",
 }
];


export default function Team(){

 return(
  <section className={styles.team}>


   <span className={styles.label}>
    Our Team
   </span>


   <h2 className={styles.title}>
    The people behind
    <span> AyakaUI</span>
   </h2>


   <p className={styles.subtitle}>
    These are the people who make
    AyakaUI possible. Thank you!
   </p>



   <div className={styles.list}>

    {
     members.map((member,index)=>(

      <motion.div

       key={member.name}

       className={styles.card}

       initial={{
        opacity:0,
        y:40
       }}

       whileInView={{
        opacity:1,
        y:0
       }}

       transition={{
        duration:.5,
        delay:index*.15
       }}

       viewport={{
        once:true
       }}

      >


       <img
        src={`https://github.com/${member.github}.png`}
        alt={member.name}
       />



       <div className={styles.info}>


        <h3>
         {member.name}
        </h3>


        <p>
         {member.role}
        </p>



        <div className={styles.social}>


         <a href={`https://github.com/${member.github}`}>
          <FaGithub/>
         </a>


         <a href={member.telegram}>
          <FaTelegram/>
         </a>


        </div>


       </div>


      </motion.div>

     ))
    }


   </div>


  </section>
 )

}
