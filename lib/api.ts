const API =
"https://raw.githubusercontent.com/AyakaUI/official_devices/refs/heads/seventeen/API";



async function safeJson(
 res:Response,
 name:string
){

 try{

  return await res.json();

 }

 catch(error){

  console.error(
   `[AyakaUI API] Invalid JSON: ${name}`,
   error
  );


  return null;

 }

}

export async function getAdditionalImages(
 buildUrl:string
){

 if(!buildUrl){
  return [];
 }


const base =
 buildUrl.substring(
  0,
  buildUrl.lastIndexOf("/")
 );


const images = [
 "boot.img",
 "vendor_boot.img",
 "dtbo.img",
 "init_boot.img",
 "recovery.img"
];


const result:any[] = [];


for(const image of images){


 const url =
 `${base}/${image}`;


 try{


  const res =
  await fetch(
   url,
   {
    method:"HEAD",
    cache:"no-store"
   }
  );


  if(res.ok){

   result.push({

    name:image,

    url

   });

  }


 }catch{

 }


}


return result;

}


function validateDevice(
 device:any
){

 if(!device)
  return false;


 return (

  typeof device.codename === "string" &&
  typeof device.model === "string" &&
  typeof device.vendor === "string"

 );

}





export async function getDevices(){


 const res = await fetch(

  `${API}/devices.json`,

  {
   next:{
    revalidate:60
   }
  }

 );



 if(!res.ok){

  console.error(
   "[AyakaUI API] Failed devices.json"
  );

  return {
   devices:[]
  };

 }



 const data =
 await safeJson(
  res,
  "devices.json"
 );



 const devices =
 Array.isArray(data)
 ? data
 : data?.devices;



 if(!Array.isArray(devices)){

  console.error(
   "[AyakaUI API] Invalid devices.json structure"
  );


  return {
   devices:[]
  };

 }



 return {
  devices
 };


}








export async function getDevice(
 codename:string
){


 const res = await fetch(

  `${API}/devices/${codename}.json`,

  {
   next:{
    revalidate:60
   }
  }

 );



 if(!res.ok){

  console.error(
   `[AyakaUI API] Device not found: ${codename}`
  );


  return null;

 }



 const data =
 await safeJson(
  res,
  `devices/${codename}.json`
 );



 if(!validateDevice(data)){


  console.error(

   `[AyakaUI API] Invalid device data: ${codename}`

  );


  return null;

 }



 return data;


}









function normalizeBuild(
 entry:any
){

 if(!entry)
  return null;


 // Novo formato: metadata do zip vem dentro de "files"
 if(Array.isArray(entry.files)){

  const zip =
   entry.files.find(
    (f:any)=>f.filename?.endsWith(".zip")
   ) || entry.files[0];


  if(!zip)
   return null;


  return {
   ...entry,
   filename:zip.filename,
   url:zip.url,
   size:zip.size,
   sha256:zip.sha256,
   os_patch_level:zip.os_patch_level,
   os_sdk_level:zip.os_sdk_level
  };

 }


 // Formato antigo: já vem tudo solto no objeto
 return entry;

}



export async function getUpdater(
 codename:string
){


 const res = await fetch(

  `${API}/updater/${codename}.json`,

  {
   next:{
    revalidate:60
   }
  }

 );



 if(!res.ok){

  console.error(
   `[AyakaUI API] Updater not found: ${codename}`
  );


  return null;

 }



 const data =
 await safeJson(

  res,

  `updater/${codename}.json`

 );



 const list =
 Array.isArray(data)
 ? data
 : data?.response;



 if(!Array.isArray(list)){

  console.error(

   `[AyakaUI API] Invalid updater: ${codename}`

  );


  return null;

 }



 return {
  response:list
   .map(normalizeBuild)
   .filter(Boolean)
 };


}









export async function getInstructions(
 codename:string
){


 const res = await fetch(

  `${API}/instructions/${codename}.md`,

  {
   next:{
    revalidate:300
   }
  }

 );



 if(!res.ok){

  console.warn(

   `[AyakaUI API] Instructions missing: ${codename}`

  );


  return null;

 }



 return await res.text();


}









function parseChangelog(
 markdown:string
){

 const sections =
  markdown
  .split(/\n(?=#\s)/)
  .map(block=>block.trim())
  .filter(Boolean);


 if(sections.length===0)
  return null;


 const [first] =
  sections;


 const lines =
  first.split("\n");


 const date =
  lines[0]
  .replace(/^#\s*/,"")
  .trim();


 const items =
  lines
  .slice(1)
  .map(line=>line.trim())
  .filter(line=>line.startsWith("-"))
  .map(line=>line.replace(/^-\s*/,"").trim());


 if(items.length===0)
  return null;


 return {
  date,
  items
 };

}



export async function getChangelog(
 codename:string
){


 const res = await fetch(

  `${API}/updater/changelogs/${codename}.md`,

  {
   next:{
    revalidate:300
   }
  }

 );



 if(!res.ok){

  console.warn(
   `[AyakaUI API] Changelog missing: ${codename}`
  );


  return null;

 }



 const text =
  await res.text();


 return parseChangelog(text);


}




export async function getTeam(){

 const res = await fetch(
  `${API}/team.json`,
  {
   next:{
    revalidate:300
   }
  }
 );


 if(!res.ok){

  console.warn(
   "[AyakaUI API] Team unavailable"
  );

  return [];

 }



 const data = await safeJson(
  res,
  "team.json"
 );



 if(!data){

  return [];

 }



 if(Array.isArray(data.team)){

  return data.team;

 }



 console.warn(
  "[AyakaUI API] Invalid team format"
 );


 return [];

}




const BLOG_REPO =
"https://api.github.com/repos/AyakaUI/blog/contents/blog";



function parseFrontmatter(
 raw:string
){

 const match =
  raw.match(
   /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/
  );


 if(!match){

  return {
   data:{},
   content:raw
  };

 }


 const [,frontmatter,content] =
  match;


 const data:Record<string,any> = {};


 for(const line of frontmatter.split("\n")){

  const m =
   line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);


  if(!m)
   continue;


  const [,key,rawValue] = m;

  let value:any =
   rawValue.trim();


  if(
   value.startsWith("[") &&
   value.endsWith("]")
  ){

   value =
    value
    .slice(1,-1)
    .split(",")
    .map((v:string)=>
     v.trim().replace(/^["']|["']$/g,"")
    )
    .filter(Boolean);

  }

  else{

   value =
    value.replace(/^["']|["']$/g,"");

  }


  data[key] = value;

 }


 return {
  data,
  content:content.trim()
 };

}



const BANNER_TAG_REGEX =
 /<Banner[^>]*\ssrc=["']([^"']+)["'][^>]*\/?>/i;



function parseBlogPost(
 filename:string,
 raw:string
){

 const slug =
  filename.replace(/\.md$/,"");


 const dateMatch =
  slug.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);


 const {
  data,
  content
 } = parseFrontmatter(raw);


 const banner =
  content.match(BANNER_TAG_REGEX)?.[1] ||
  content.match(/!\[[^\]]*\]\(([^)]+)\)/)?.[1] ||
  null;


 const h1Match =
  content.match(/^#\s+(.+)$/m);


 const title =
  data.title ||
  h1Match?.[1] ||
  (
   dateMatch
   ? dateMatch[2].replace(/-/g," ")
   : slug
  );


 const tag =
  data.tag ||
  (
   Array.isArray(data.tags)
   ? data.tags[0]
   : null
  );


 const bodyOnly =
  content
  .replace(BANNER_TAG_REGEX,"")
  .replace(/!\[[^\]]*\]\([^)]+\)/,"")
  .replace(/^#\s+.+$/m,"")
  .split("\n")
  .filter(line=>
   !/^#{1,6}\s+/.test(line.trim())
  )
  .join("\n")
  .trim();


 const firstParagraph =
  bodyOnly
  .split(/\n\s*\n/)
  .map(p=>
   p.trim().replace(/\s*\n\s*/g," ")
  )
  .find(p=>p.length > 0) || "";


 const excerpt =
  data.description ||
  (
   firstParagraph.length > 180
   ? firstParagraph.slice(0,180).trim() + "…"
   : firstParagraph
  );


 return {
  slug,
  title,
  tag,
  date:dateMatch?.[1] || null,
  excerpt,
  banner,
  content
 };

}



export async function getBlogPosts(){


 const res = await fetch(

  BLOG_REPO,

  {
   headers:{
    Accept:"application/vnd.github.raw+json"
   },

   next:{
    revalidate:300
   }
  }

 );



 if(!res.ok){

  console.warn(
   "[AyakaUI API] Blog list unavailable"
  );

  return [];

 }



 const files =
  await safeJson(
   res,
   "blog contents"
  );



 if(!Array.isArray(files)){

  return [];

 }



 const posts =
  await Promise.all(

   files
   .filter((f:any)=>
    f.type === "file" &&
    f.name.endsWith(".md")
   )
   .map(async(f:any)=>{

    try{

     const fileRes =
      await fetch(
       f.download_url,
       {
        next:{
         revalidate:300
        }
       }
      );


     if(!fileRes.ok)
      return null;


     const raw =
      await fileRes.text();


     return parseBlogPost(
      f.name,
      raw
     );

    }

    catch{

     return null;

    }

   })

  );


 return posts

  .filter(Boolean)

  .sort(
   (a:any,b:any)=>
   (b.date||"").localeCompare(a.date||"")
  );

}



export async function getBlogPost(
 slug:string
){


 const res = await fetch(

  `https://raw.githubusercontent.com/AyakaUI/blog/refs/heads/main/blog/${slug}.md`,

  {
   next:{
    revalidate:300
   }
  }

 );



 if(!res.ok){

  console.warn(
   `[AyakaUI API] Blog post not found: ${slug}`
  );

  return null;

 }



 const raw =
  await res.text();


 return parseBlogPost(
  `${slug}.md`,
  raw
 );

}
