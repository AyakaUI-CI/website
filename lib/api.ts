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



 if(!data || !Array.isArray(data.devices)){

  console.error(
   "[AyakaUI API] Invalid devices.json structure"
  );


  return {
   devices:[]
  };

 }



 return data;


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



 if(
  !data ||
  !Array.isArray(data.response)
 ){

  console.error(

   `[AyakaUI API] Invalid updater: ${codename}`

  );


  return null;

 }



 return data;


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
