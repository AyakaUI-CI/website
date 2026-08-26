"use client";

import styles from "./Download.module.css";
import Accordion from "./Accordion";


export default function Download({

 device,

 build,

 instructions

}:{

 device:any;

 build:any;

 instructions:string|null;

}){


const maintainers =
 device.maintainer
 ?.map(
  (m:any)=>m.display_name
 )
 .join(", ");



const size =
 build?.size
 ? `${(build.size / 1024 / 1024 / 1024).toFixed(2)} GB`
 : "Unknown";



return(

<section className={styles.container}>


<div className={styles.deviceCard}>


<div className={styles.phone}>

<img

src="/devices/phone.webp"

alt={device.model}

/>

</div>



<div className={styles.info}>


<span className={styles.status}>

{
device.active
?
"Official"
:
"Inactive"
}

</span>



<h1>

{device.model}

</h1>



<p className={styles.codename}>

{device.codename}

</p>




<div className={styles.details}>


<p>

<b>Vendor</b>

{device.vendor}

</p>



<p>

<b>Android</b>

{build?.version || device.version}

</p>



<p>

<b>Maintainer</b>

{maintainers}

</p>



<p>

<b>Release</b>

{device.release}

</p>



<p>

<b>Last Updated</b>

{
build?.datetime
?
new Date(
build.datetime * 1000
)
.toISOString()
.split("T")[0]
:
"Unknown"
}

</p>


</div>





<div className={styles.buttons}>


{

build?.url ?


<a

href={build.url}

className={styles.primary}

>

Download Latest Build

</a>


:


<span

className={styles.disabled}

>

Build unavailable

</span>


}





{
device.xda &&

<a

href={device.xda}

className={styles.secondary}

>

View on XDA

</a>

}



</div>


</div>


</div>





<div className={styles.sections}>


<Accordion

title="Latest Build Info"

>

<p>

Version:
{" "}
{build?.version}

</p>


<p>

Filename:
{" "}
{build?.filename}

</p>



<p>

Size:
{" "}
{size}

</p>


</Accordion>





<Accordion

title="Device Information"

>


<ul>

<li>
Codename: {device.codename}
</li>


<li>
Vendor: {device.vendor}
</li>


<li>
Model: {device.model}
</li>


</ul>


</Accordion>





<Accordion

title="Maintainers"

>


<ul>

{

device.maintainer?.map(

(m:any)=>(

<li key={m.github}>

{m.display_name}

</li>

)

)

}

</ul>


</Accordion>





<Accordion
title="Instructions"
>

<pre className={styles.instructions}>

{
instructions ||
"Instructions unavailable"
}

</pre>


</Accordion>



</div>


</section>

)

}
