import '../styles/globals.css'
import { ThemeProvider, CSSReset } from "@chakra-ui/core"
import { maybeInitStore } from '../services/store';

function MyApp({ Component, pageProps }) {
  maybeInitStore();
  return <ThemeProvider>
    <CSSReset />
    <Component {...pageProps} />
  </ThemeProvider>
}

export default MyApp
