"use client";

import styles from "./Download.module.css";
import Accordion from "./Accordion";
import ReactMarkdown from "react-markdown";

export default function Download({

 device,

 build,

 instructions,

 additionalImages
}:{

 device:any;

 build:any;

 instructions:string|null;

additionalImages:any[];

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


<div className={styles.buildInfo}>


<div className={styles.buildItem}>

<span>
Version
</span>

<strong>
{build?.version || "Unknown"}
</strong>

</div>



<div className={styles.buildItem}>

<span>
Filename
</span>

<strong className={styles.filename}>
{build?.filename || "Unknown"}
</strong>

</div>



<div className={styles.buildItem}>

<span>
Size
</span>

<strong>
{size}
</strong>

</div>


</div>


</Accordion>




<Accordion

title="Device Information"

>


<div className={styles.deviceInfo}>


<div className={styles.infoItem}>

<span>
Codename
</span>

<strong>
{device.codename}
</strong>

</div>



<div className={styles.infoItem}>

<span>
Vendor
</span>

<strong>
{device.vendor}
</strong>

</div>



<div className={styles.infoItem}>

<span>
Model
</span>

<strong>
{device.model}
</strong>

</div>



<div className={styles.infoItem}>

<span>
Release
</span>

<strong>
{device.release}
</strong>

</div>


</div>


</Accordion>


{
additionalImages?.length > 0 && (

<Accordion
title="Additional Images"
>


<div className={styles.packages}>

{
additionalImages.map(

(image:any)=>(

<div

key={image.name}

className={styles.package}

>


<div className={styles.packageIcon}>
↓
</div>


<div className={styles.packageInfo}>


<span>

{
image.name
.replace(".img","")
.replace("_"," ")
}

</span>


<p>

{image.name}

</p>


</div>



<a

href={image.url}

className={styles.packageButton}

>

Download

</a>


</div>

)

)

}

</div>


</Accordion>

)
}


<Accordion

title="Maintainers"

>


<div className={styles.maintainers}>


{

device.maintainer?.map(

(m:any)=>(


<div

key={m.github}

className={styles.maintainerCard}

>


<img

src={`https://github.com/${m.github}.png`}

alt={m.display_name}

/>



<div className={styles.maintainerInfo}>


<strong>

{m.display_name}

</strong>



<span>

Maintainer

</span>


</div>


</div>


)

)

}


</div>


</Accordion>



<Accordion
title="Instructions"
>

<div className={styles.instructions}>

<ReactMarkdown>

{
instructions ||
"Instructions unavailable"
}

</ReactMarkdown>


</div>

</Accordion>



</div>


</section>

)

}
