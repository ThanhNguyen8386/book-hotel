import '../styles/globals.css'
import { AppPropsWithLayout } from '../models/layout'
import SiteLayout from '../components/Layout'
import { LayoutProvider } from '../contexts/LayoutContext'


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const LayoutWrapper = Component.Layout ?? SiteLayout
  return (
    // <ThemeProvider theme={theme}>
    <LayoutProvider>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </LayoutProvider>
    // </ThemeProvider>
  )
}

export default MyApp
