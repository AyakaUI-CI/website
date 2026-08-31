"use client";

import { useTheme } from "./ThemeProvider";
import styles from "../Navbar/Navbar.module.css";

export default function ThemeToggle() {

 const { theme, toggleTheme } = useTheme();

 return (
  <button
   className={styles.themeToggle}
   onClick={toggleTheme}
   aria-label={
    theme === "light"
     ? "Ativar modo escuro"
     : "Ativar modo claro"
   }
  >

   {theme === "light" ? (

    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
     <path d="M12 1.5V4M12 20v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M1.5 12H4M20 12h2.5M4.2 19.8L6 18M18 6l1.8-1.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>

   ) : (

    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
     <path d="M17 3.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6.6-1.4Z" fill="currentColor"/>
    </svg>

   )}

  </button>
 );
}
