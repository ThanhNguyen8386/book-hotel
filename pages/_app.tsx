import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppPropsWithLayout } from '../models/layout'
import SiteLayout from '../components/Layout'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const LayoutWrapper = Component.Layout ?? SiteLayout
  return (
    // <ThemeProvider theme={theme}>
    <LayoutWrapper>
      <Component {...pageProps} />
    </LayoutWrapper>
    // </ThemeProvider>
  )
}

export default MyApp
