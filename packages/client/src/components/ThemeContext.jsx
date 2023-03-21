import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';

import { useMemo, useState, createContext } from "react";

export const ColorModeContext = createContext();

const ThemeContext = ({ children }) => {
    const [mode, setMode] = useState('light');
    const colorMode = useMemo(
        () => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
        }),
        [],
    );

    const theme = useMemo(
        () =>
        createTheme({
            palette: {
            mode,
            },
        }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            {children}
        </ColorModeContext.Provider>
        
    );
}

export default ThemeContext;