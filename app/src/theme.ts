/* eslint-disable no-unused-vars */
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

declare module '@mui/material/styles' {
    interface Theme {
        padding: string;
    }
    interface ThemeOptions {
        padding?: string;
    }
}

// a custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#d65a55',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
    padding: '10px',
});

export default theme;
