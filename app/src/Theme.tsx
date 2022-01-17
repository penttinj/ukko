/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

declare module '@mui/material/styles' {
    interface Theme {
        padding: string;
        item: {
            padding: string;
            radius: string;
            background?: string;
        };
        symbol: {
            size: string;
        };
    }
    interface ThemeOptions {
        padding?: string;
        item?: {
            padding?: string;
            radius?: string;
            background?: string;
        };
        symbol?: {
            size?: string;
        };
    }
}

// eslint-disable-next-line no-undef
export const Theme = ({ children }: { children: JSX.Element|JSX.Element[] }) => {
    // https://mui.com/customization/dark-mode/#system-preference
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    console.log('window object:', window);
    // a custom theme for this app

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
                item: {
                    padding: '0.5rem',
                    radius: '1rem',
                },
                symbol: {
                    size: '0.6rem',
                },
            }),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};

export default Theme;
