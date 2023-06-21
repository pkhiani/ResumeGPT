import Navbar from '../components/Navbar'
import "../styles/global.css";
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Navbar/>
      <Component {...pageProps}></Component>
    </SessionProvider>
  )
}
