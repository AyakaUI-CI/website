import Link from "next/link";

import styles from "./Blog.module.css";



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



export default function BlogList({

posts

}:{

posts:any[]

}){


return(

<section className={styles.blog}>


<span className={styles.label}>
Blog
</span>


<h1 className={styles.title}>
AyakaUI <span>Blog</span>
</h1>


<p className={styles.subtitle}>
News, updates and everything about
AyakaUI development.
</p>



<div className={styles.list}>


{

posts.length === 0 &&

<p className={styles.empty}>

No blog posts yet.

</p>

}



{

posts.map(
 (post:any)=>(

  <Link

  key={post.slug}

  href={`/blog/${post.slug}`}

  className={styles.card}

  >


  <div className={styles.cardHeader}>


  <h2>
  {post.title}
  </h2>



  {

  post.tag &&

  <span className={styles.tag}>
  {post.tag}
  </span>

  }


  </div>



  {

  post.excerpt &&

  <p className={styles.excerpt}>
  {post.excerpt}
  </p>

  }



  {

  post.date &&

  <span className={styles.date}>
  {formatDate(post.date)}
  </span>

  }


  </Link>

 )
)

}


</div>


</section>

)

}
