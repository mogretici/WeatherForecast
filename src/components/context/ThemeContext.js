import { createContext,useEffect, useState, useContext } from "react";

const ThemeContext = createContext();
const ThemeProvider = ({children})=>{
    
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    useEffect(()=>{
        localStorage.setItem("theme", theme);
        console.log({theme})
    },[theme]);
    const values = {
        theme,
        setTheme
    }

    return(
        <ThemeContext.Provider value={values}>
            {children}
        </ThemeContext.Provider>
    )
}
const useTheme = ()=>useContext(ThemeContext);
export {useTheme, ThemeProvider};