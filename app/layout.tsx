import "./globals.css";
import ThemeProvider, { themeInitScript } from "../components/Theme/ThemeProvider";

export const metadata = {
 title:"AyakaUI",
 description:"AOSP Android experience"
};

export default function Layout({children}:{children:React.ReactNode}){
 return (
  <html lang="en" suppressHydrationWarning>
   <head>
    <script dangerouslySetInnerHTML={{__html: themeInitScript}} />
   </head>
   <body>
    <ThemeProvider>
     {children}
    </ThemeProvider>
   </body>
  </html>
 );
}
