import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@components/NavBar';
import SimpleFooter from '@components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Natural Compounds DataBase',
  description: 'WebApp developed by Fernando Martinez',
}

export default function RootLayout({ children }) {
  return (
    // const Theme = { }
    <html lang="en">
      <head>
        <title> BIOMX DB </title>
      </head> 
      <body>
        <NavBar/> 
        <SimpleFooter/>
        <div className="flex flex-col items-center w-full">{children}</div>
      </body>
    </html>
  )
}
