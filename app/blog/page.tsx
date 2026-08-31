import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import BlogList from "@/components/Blog/BlogList";

import {
 getBlogPosts
} from "@/lib/api";



export default async function BlogPage(){


const posts =
 await getBlogPosts();



return(

<>

<Navbar/>


<main>

<BlogList

posts={posts}

/>

</main>


<Footer/>

</>

)

}
