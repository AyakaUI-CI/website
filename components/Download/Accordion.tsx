"use client";

import {
useState
} from "react";

import styles from "./Accordion.module.css";


export default function Accordion({
title,
children
}:{
title:string,
children:React.ReactNode
}){


const [open,setOpen]=useState(false);


return(

<div className={styles.box}>


<button
onClick={()=>setOpen(!open)}
>

{title}

<span>
{open ? "−":"+"}
</span>

</button>


{
open &&
<div className={styles.content}>
{children}
</div>
}


</div>

)

}
