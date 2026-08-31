"use client";

import {
 FaFileAlt,
 FaTimes,
 FaCalendarAlt,
 FaMagic
} from "react-icons/fa";

import styles from "./Changelog.module.css";

export default function Changelog({

 open,

 onClose,

 codename,

 version,

 date,

 items

}:{

 open:boolean;

 onClose:()=>void;

 codename:string;

 version?:string;

 date?:string;

 items?:string[];

}){


 if(!open)
  return null;


 return(

<div

 className={styles.backdrop}

 onClick={onClose}

>


<div

 className={styles.sheet}

 onClick={
  (e)=>e.stopPropagation()
 }

>

<div className={styles.handle}/>


<div className={styles.header}>

<div className={styles.headerLeft}>

<div className={styles.icon}>
<FaFileAlt/>
</div>


<div>

<h2>
Changelog
</h2>


<p>

AyakaUI {version || "17.0"} | {codename}

</p>

</div>

</div>



<button

 className={styles.close}

 onClick={onClose}

 aria-label="Close"

>

<FaTimes/>

</button>


</div>



{
date &&

<div className={styles.datePill}>

<FaCalendarAlt/>

Build Date: {date}

</div>

}



<div className={styles.body}>


{

items && items.length > 0 ?

<div className={styles.section}>

<h3>

<FaMagic/>

Changes

</h3>


<ul>

{

items.map(
 (item,index)=>(

  <li key={index}>
  {item}
  </li>

 )
)

}

</ul>


</div>

:

<p className={styles.empty}>

Changelog unavailable for this build.

</p>

}


</div>


</div>


</div>

)

}
