import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import BlogPost from "@/components/Blog/BlogPost";

import {
 getBlogPost
} from "@/lib/api";



export default async function BlogPostPage({

params

}:{

params:Promise<{
 slug:string
}>

}){


const {
 slug
} = await params;


const post =
 await getBlogPost(slug);



if(!post){

return(

<>

<Navbar/>

<main>

<h1

style={{

textAlign:"center",

padding:"180px 20px 100px"

}}

>

Post not found

</h1>

</main>

<Footer/>

</>

)

}



return(

<>

<Navbar/>


<main>

<BlogPost

post={post}

/>

</main>


<Footer/>

</>

)

}
