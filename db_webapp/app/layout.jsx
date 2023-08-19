"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@components/NavBar';
import SimpleFooter from '@components/Footer';
import SidebarFilter from '@components/AdvanceSearch/SidebarFilter';

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
        <div className="absolute">
          <SidebarFilter />
        </div>
        
          <SimpleFooter></SimpleFooter>
        <div className="flex gap-5 items-center p-6">
          <div className="flex flex-col items-center w-full">{children}</div>
        </div>
        <script type="text/javascript" src="https://unpkg.com/smiles-drawer@2.0.1/dist/smiles-drawer.min.js"></script>
        <script>
          SmiDrawer.apply();
        </script>

      </body>
      
    </html>
  )
}
