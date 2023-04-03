import Views from "./components/Views";
import UserContext from "./components/AccountContext";
import { useMemo } from "react";

import useMediaQuery from '@mui/material/useMediaQuery';
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const App = () => {
  const preferDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: preferDarkMode ? "dark" : "light",
        }
      }),
    [preferDarkMode]
  );


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <UserContext>
        <Views />
      </UserContext>
    </ThemeProvider>
    
  );
}

export default App;