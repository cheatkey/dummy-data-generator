import type { AppProps } from 'next/app'
import GlobalStyles from '../styles/GlobalStyles'
import '../styles/index.css'

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyles />
    <Component {...pageProps} />
  </>
)

export default App
