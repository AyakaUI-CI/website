const images = [
 "boot.img",
 "vendor_boot.img",
 "dtbo.img",
 "init_boot.img",
 "recovery.img"
];


export async function getAdditionalImages(
 zipUrl:string
){


const base =
zipUrl.substring(
 0,
 zipUrl.lastIndexOf("/")
);



const result = [];



for(const image of images){


 const url =
 `${base}/${image}`;



 try{


  const res =
  await fetch(
   url,
   {
    method:"HEAD"
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
