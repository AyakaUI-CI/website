"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import {
 FaArrowLeft,
 FaBookmark,
 FaRegBookmark,
 FaRegCalendarAlt,
 FaRegClock
} from "react-icons/fa";

import styles from "./BlogPost.module.css";



function formatDate(
 dateStr:string|null
){

 if(!dateStr)
  return null;


 const date =
  new Date(`${dateStr}T00:00:00Z`);


 if(isNaN(date.getTime()))
  return dateStr;


 return date.toLocaleDateString(
  "en-US",
  {
   day:"numeric",
   month:"short",
   year:"numeric",
   timeZone:"UTC"
  }
 );

}



function estimateReadTime(
 text:string
){

 const words =
  text
  .split(/\s+/)
  .filter(Boolean)
  .length;


 return Math.max(
  1,
  Math.round(words / 200)
 );

}



export default function BlogPost({

post

}:{

post:any

}){


const [saved,setSaved] =
 useState(false);


const BANNER_TAG_REGEX =
 /<Banner[^>]*\ssrc=["']([^"']+)["'][^>]*\/?>/i;



const body =
 post.content
 .replace(BANNER_TAG_REGEX,"")
 .replace(/!\[[^\]]*\]\([^)]+\)/,"")
 .replace(/^#\s+.+$/m,"")
 .trim();


const readTime =
 estimateReadTime(body);



return(

<section className={styles.container}>


<div className={styles.topBar}>


<Link

href="/blog"

className={styles.back}

>

<FaArrowLeft/>

</Link>



<button

onClick={
 ()=>setSaved(!saved)
}

className={styles.bookmark}

aria-label="Save post"

>

{
saved ?
<FaBookmark/>
:
<FaRegBookmark/>
}

</button>


</div>



<div className={styles.hero}>


{

post.tag &&

<span className={styles.tag}>
{post.tag}
</span>

}



<h1>
{post.title}
</h1>



<div className={styles.meta}>


{

post.date &&

<span>

<FaRegCalendarAlt/>

{formatDate(post.date)}

</span>

}



<span>

<FaRegClock/>

{readTime} min read

</span>


</div>


</div>



{

post.banner &&

<div className={styles.banner}>

<img

src={post.banner}

alt={post.title}

/>

</div>

}



<div className={styles.body}>

<ReactMarkdown>

{body}

</ReactMarkdown>

</div>


</section>

)

}
