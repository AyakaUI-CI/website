import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import Team from "@/components/Team/Team";

import {
 getTeam
} from "@/lib/api";


export default async function TeamPage(){


const team = await getTeam();


return(
<>

<Navbar/>

<main>

<Team
 members={team}
/>

</main>

<Footer/>

</>
)

}
