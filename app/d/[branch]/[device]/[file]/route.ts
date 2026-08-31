import { NextResponse } from "next/server";


export async function GET(
 request: Request,
 {
  params
 }: {
  params: Promise<{
   branch:string;
   device:string;
   file:string;
  }>
 }
){


 const {
  branch,
  device,
  file

 } = await params;



 try {


  const otaUrl =
   `https://raw.githubusercontent.com/AyakaUI/official_devices/${branch}/API/updater/${device}.json`;



  const response =
   await fetch(
    otaUrl,
    {
     next:{
      revalidate:60
     }
    }
   );



  if(!response.ok){

   return new NextResponse(
    "OTA feed not found",
    {
     status:404
    }
   );

  }



  const updates =
   await response.json();



  const update =
   updates.find(
    (item:any)=>
     item.files?.some(
      (f:any)=>
       f.filename === file
     )
   );



  if(!update){

   return new NextResponse(
    "Build not found",
    {
     status:404
    }
   );

  }



  const otaFile =
   update.files.find(
    (f:any)=>
     f.filename === file
   );



  if(!otaFile?.url){

   return new NextResponse(
    "Download URL missing",
    {
     status:404
    }
   );

  }



  return NextResponse.redirect(
   otaFile.url,
   302
  );



 }catch(error){


  console.error(
   "[AyakaUI Download Redirect]",
   error
  );


  return new NextResponse(
   "Internal Server Error",
   {
    status:500
   }
  );


 }

}
