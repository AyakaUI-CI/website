"use client";

import { motion } from "framer-motion";

import {
 FaGithub,
 FaTelegram
} from "react-icons/fa";

import styles from "./Team.module.css";


export default function Team({

 members

}:{
 members:any[]
}){


return (

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
 (members || []).map(
  (member,index)=>(

   <motion.div

    key={member.github}

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

     alt={member.display_name}

    />



    <div className={styles.info}>


     <h3>
      {member.display_name}
     </h3>

     <p>
     {member.developer || member.role || "AyakaUI Contributor"}
     </p>

     <div className={styles.social}>


      <a

       href={`https://github.com/${member.github}`}

       target="_blank"

       rel="noopener noreferrer"

      >

       <FaGithub/>

      </a>



      {
       member.telegram && (

        <a

         href={`https://t.me/${member.telegram}`}

         target="_blank"

         rel="noopener noreferrer"

        >

         <FaTelegram/>

        </a>

       )
      }


     </div>


    </div>


   </motion.div>

  )
 )
}


</div>


</section>

)

}
