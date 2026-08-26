import styles from "./CTA.module.css";

import Link from "next/link";

export default function CTA(){

 return (

  <section className={styles.cta}>

   <h2>
    Ready to experience AyakaUI?
   </h2>


   <p>
    Get the latest build for your device
   </p>

<Link 
 href="/devices"
 className={styles.button}
>
 Download now
</Link>


  </section>

 )

}
