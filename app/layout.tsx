import "./globals.css";

export const metadata = {
 title:"AyakaUI",
 description:"AOSP Android experience"
};

export default function Layout({children}:{children:React.ReactNode}){
 return <html lang="en"><body>{children}</body></html>;
}