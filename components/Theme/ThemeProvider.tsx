"use client";

import {
 createContext,
 useContext,
 useEffect,
 useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
 theme: Theme;
 toggleTheme: () => void;
};

const STORAGE_KEY = "ayakaui-theme";

const ThemeContext = createContext<ThemeContextValue>({
 theme: "light",
 toggleTheme: () => {},
});

export function useTheme() {
 return useContext(ThemeContext);
}

// script rodado antes da hidratação pra evitar "flash" do tema errado
export const themeInitScript = `
(function(){
 try{
  var saved = localStorage.getItem("${STORAGE_KEY}");
  var theme = saved
   ? saved
   : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
 }catch(e){}
})();
`;

export default function ThemeProvider({
 children,
}: {
 children: React.ReactNode;
}) {

 const [theme, setTheme] = useState<Theme>("light");

 useEffect(() => {

  const current = document.documentElement.getAttribute("data-theme");

  if (current === "dark" || current === "light") {
   setTheme(current);
  }

 }, []);

 function toggleTheme() {

  const next: Theme = theme === "light" ? "dark" : "light";

  setTheme(next);

  document.documentElement.setAttribute("data-theme", next);

  try {
   localStorage.setItem(STORAGE_KEY, next);
  } catch (e) {}

 }

 return (
  <ThemeContext.Provider value={{ theme, toggleTheme }}>
   {children}
  </ThemeContext.Provider>
 );
}
