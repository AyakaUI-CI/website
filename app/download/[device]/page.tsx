import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import Download from "@/components/Download/Download";

import {
 getDevice,
 getUpdater,
 getInstructions,
 getAdditionalImages
} from "@/lib/api";

export default async function Page({

params

}:{

params:Promise<{
 device:string
}>

}){



const {
 device:codename

}=await params;

const instructions =
 await getInstructions(codename);

const device =
 await getDevice(codename);



const updater =
 await getUpdater(codename);

const build =
 updater?.response?.[0];


const additionalImages =
 Array.isArray(build?.additional_images) &&
 build.additional_images.length > 0
 ? build.additional_images
 : await getAdditionalImages(
  build?.url
 );

if(!device){

return(

<>

<Navbar/>

<main>

<h1>
Device not found
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

<Download

device={device}

build={build}

instructions={instructions}

additionalImages={additionalImages}

/>
</main>


<Footer/>


</>

)

}
