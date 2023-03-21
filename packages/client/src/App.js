import Views from "./components/Views";
import "./vars.css";
import UserContext from "./components/AccountContext";
import { useState, useMemo } from "react";


import { CssBaseline, Switch } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const App = () => {
  const [mode, setMode] = useState("light");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        }
      }),
    [mode]
  );


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Switch onChange={() => setMode(mode === "light" ? "dark" : "light")} />
      <UserContext>
        <Views />
      </UserContext>
    </ThemeProvider>
    
  );
}

export default App;