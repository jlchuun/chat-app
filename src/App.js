import Views from "./components/Views";
import { useState, useEffect } from "react";
import styles from "./App.modules.css";


const App = () => {
  const [theme, setTheme] = useState("lightMode");
  // useEffect(() => {
  //   const btn = document.querySelector(`.${styles.themeToggle}`);
  //   btn.addEventListener("click", () => document.body.classList.toggle(`${styles.darkTheme}`));
  // }, []);

  // ${styles.darkTheme} || ${styles.lightTheme}
  // <button className={styles.themeToggle}>Toggle Mode</button>

  const toggleTheme = () => {
    if (theme === "lightMode") {
      setTheme("darkMode");
    } else {
      setTheme("lightMode");
    }
  }

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme])
    


  return (
    <div>
      <button className={styles.themeToggle} onClick={toggleTheme}>Toggle Mode</button>
      <Views />
    </div>
  );
}

export default App;
