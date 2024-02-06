import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@components/NavBar';
import SimpleFooter from '@components/Footer';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Natural Compounds DataBase',
  description: 'WebApp developed by Fernando Martinez',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>BIOMX DB</title>

      </head>
      <body className="flex flex-col">
        <div className="flex-shrink-0">
          <NavBar/>
        </div>
        <div className="flex-grow flex flex-col items-center max-w-full">
          {/* Your main content goes here */}
          {children}
        </div>
        <div className="flex-shrink-0">
          <SimpleFooter />
        </div>
        {/* Include your scripts here */}
        <SpeedInsights />
      </body>
    </html>
  );
};
