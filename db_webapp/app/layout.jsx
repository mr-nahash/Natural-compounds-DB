import './globals.css'
import { Inter } from 'next/font/google'
import SearchBar from '@components/SearchBar';
import { ThemeProvider } from "@material-tailwind/react";
import navbar from '@material-tailwind/react';
import _default from '@material-tailwind/react/components/List/ListItem';
import tailwindConfig from '@/tailwind.config';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Natural Compounds DataBase',
  description: 'WebApp developed by Fernando Martinez',
}

export default function RootLayout({ children }) {
  return (
    // const Theme = { }
    <html lang="en">
      <head />
      <body className="text-zinc-900 bg-zinc-200">
        <NavBar/> 
        <div className="flex flex-col gap-10 items-center p-6">
          <SearchBar></SearchBar>
          <div className="flex flex-col items-center w-full">{children}</div>
        </div>
      </body>
      
    </html>
  )
}
