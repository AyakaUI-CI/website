import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import Devices from "@/components/Devices/Devices";

import {
 getDevices
} from "@/lib/api";



export default async function DevicesPage(){


const data =
 await getDevices();



return(

<>

<Navbar/>


<main>

<Devices

devices={
 data.devices
}

/>

</main>


<Footer/>


</>

)

}
