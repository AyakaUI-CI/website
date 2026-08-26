"use client";

import devices from "@/data/devices.json";
import styles from "./Devices.module.css";


export default function Devices(){

 return(
  <section className={styles.devices}>


   <span className={styles.label}>
    Devices
   </span>


   <h1 className={styles.title}>
    Supported
    <span> Devices</span>
   </h1>


   <p className={styles.subtitle}>
    Download AyakaUI builds for your device.
   </p>



   <div className={styles.filters}>


    <button>
     Motorola
    </button>


    <button>
     Select your device
    </button>


   </div>



   <div className={styles.list}>


    {
     devices.map((device)=>(

      <div
       className={styles.card}
       key={device.codename}
      >


       <img
        src={device.image}
        alt={device.name}
       />



       <div className={styles.info}>


        <h2>
         {device.name}
        </h2>


        <span>
         {device.codename}
        </span>



        <div className={styles.details}>


         <div>
          <small>
           Android
          </small>

          <b>
           {device.android}
          </b>
         </div>



         <div>
          <small>
           Status
          </small>

          <b>
           {device.status}
          </b>
         </div>



         <div>
          <small>
           Maintainer
          </small>

          <b>
           {device.maintainer}
          </b>
         </div>


        </div>



        <button className={styles.download}>
         Download
        </button>


       </div>


      </div>

     ))
    }


   </div>


  </section>
 )

}
