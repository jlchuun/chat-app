import { library } from '@fortawesome/fontawesome-svg-core'
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import styles from "../App.module.css";



library.add(faToggleOn, faToggleOff);

const ToggleTheme = () => {
    const [theme, setTheme] = useState("lightMode");
    const [themeIcon, setThemeIcon] = useState("fa-toggle-off");

    const toggleTheme = () => {
        if (theme === "lightMode") {
        setTheme("darkMode");
        setThemeIcon("fa-toggle-on");
        } else {
        setTheme("lightMode");
        setThemeIcon("fa-toggle-off");
        }
    }

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.body.className = theme;
    }, [theme])
    return (
      <FontAwesomeIcon className={styles.themeToggle} onClick={toggleTheme} icon={themeIcon} size="3x" />
    )
}

export default ToggleTheme;