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
    <html lang="en">
      <head>
        <title>BIOMX DB</title>
        {/* Link your CSS file here */}
        <link rel="stylesheet" href="path/to/your/styles.css" />
      </head>
      <body className="flex flex-col min-h-screen">
        <div className="flex-shrink-0">
          <NavBar />
        </div>
        <main className="flex-grow flex flex-col items-center w-full">
          {/* Your main content goes here */}
          {children}
        </main>
        <div className="flex-shrink-0">
          <SimpleFooter />
        </div>
        {/* Include your scripts here */}
        <script type="text/javascript" src="https://unpkg.com/smiles-drawer@2.0.1/dist/smiles-drawer.min.js"></script>
        <script>
          SmiDrawer.apply();
        </script>
      </body>
      
    </html>
  );
};
