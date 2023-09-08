import '<erick>/styles/globals.css'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack';
import { lightTheme, darkTheme } from '../../themes'
import { UIProvider } from '../../context/ui'
import { EntriesProvider } from '../../context/entries'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={ 3 }>     
      <EntriesProvider>
        <UIProvider>
          {/* Componente que aplica el tema */}
          <ThemeProvider theme={ darkTheme }>
            {/* Componente necesario para mostrar tema */}
            <CssBaseline/>
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
    )
}
