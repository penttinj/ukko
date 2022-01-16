/* eslint-disable no-unused-vars */
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

declare module '@mui/material/styles' {
    interface Theme {
        padding: string;
        item: {
            padding: string;
            radius: string;
            background?: string;
        }
    }
    interface ThemeOptions {
        padding?: string;
        item?: {
            padding?: string;
            radius?: string;
            background?: string;
        }
    }
}

// a custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#d65a55',
        },
        secondary: {
            main: '#6a6a6a',
        },
        error: {
            main: red.A400,
        },
    },
    item: {
        padding: '0.5rem',
        radius: '1rem',
        background: 'MediumAquaMarine',
    },
});

export default theme;
