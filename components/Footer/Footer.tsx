import { FaGithub, FaTelegram, FaDiscord } from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer(){

 return(
  <footer className={styles.footer}>

   <div className={styles.logo}>
    ✦ AyakaUI
   </div>

   <p>
    © 2026 AyakaUI Project
   </p>

   <div className={styles.social}>

    <a href="https://github.com/AyakaUI">
    <FaGithub />
    </a>

    <a href="https://t.me/AyakaUI">
     <FaTelegram />
    </a>

    <a href="#">
     <FaDiscord />
    </a>

   </div>

  </footer>
 )

}
