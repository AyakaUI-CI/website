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
