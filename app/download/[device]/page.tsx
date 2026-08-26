import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import Download from "@/components/Download/Download";

import {
 getDevice,
 getUpdater,
 getInstructions
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

build={
 updater?.response?.[0]
}

instructions={instructions}

/>

</main>


<Footer/>


</>

)

}
