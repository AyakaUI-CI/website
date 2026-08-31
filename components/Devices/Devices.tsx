"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Devices.module.css";


export default function Devices({
 devices
}:{
 devices:any[]
}){


const [selectedOEM,setSelectedOEM] = useState("All");



const oems = [
 "All",
 ...new Set(
  devices.map(
   device => device.vendor
  )
 )
];



const filteredDevices =

selectedOEM === "All"

?

devices

:

devices.filter(
 device =>
 device.vendor === selectedOEM
);



return(
 <section className={styles.devices}>


  <span className={styles.label}>
   Supported Devices
  </span>



  <h1 className={styles.title}>
   Choose your
   <span> device</span>
  </h1>



  <p className={styles.subtitle}>
   Get the latest AyakaUI build for your device.
  </p>




  <div className={styles.select}>


   <span>
    Select your OEM
   </span>



   <div className={styles.oems}>


    {
     oems.map(
      vendor=>(

       <button

        key={vendor}

        className={
         selectedOEM === vendor
         ?
         styles.selected
         :
         ""
        }


        onClick={()=>
         setSelectedOEM(vendor)
        }

       >

        {vendor}

       </button>

      )
     )
    }


   </div>


  </div>





  <div className={styles.list}>


   {
    filteredDevices

    .filter(
     device=>device.active !== false
    )

    .map(
     (device,index)=>(


      <motion.div


       key={device.codename}


       className={styles.card}



       initial={false}



       animate={{
        opacity:1,
        y:0
       }}



       transition={{
        duration:.5,
        delay:index*.1
       }}



      >



       <div className={styles.phone}>


        <img

         src="/devices/phone.webp"

         alt={device.model}

        />


       </div>





       <div className={styles.info}>


        <h2>
         {device.model}
        </h2>



        <span className={styles.codename}>
         {device.codename}
        </span>





        <div className={styles.details}>


         <p>
          Vendor:

          <strong>
           {device.vendor}
          </strong>

         </p>



         <p>
          Version:

          <strong>
           {device.version}
          </strong>

         </p>



         <p>
          Release:

          <strong>
           {device.release}
          </strong>

         </p>



         <p>
          Maintainer:

          <strong>
           {device.maintainer_name}
          </strong>

         </p>



        </div>





        <Link

         href={`/download/${device.codename}`}

         className={styles.downloadButton}

        >

         Download Latest Build

        </Link>



       </div>


      </motion.div>


     )
    )
   }



  </div>



 </section>
)

}
