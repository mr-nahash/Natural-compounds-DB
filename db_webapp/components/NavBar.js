'use client';
import { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import Link from "next/link";
import Logo from "public/Best_Option-removebg-preview.png"
import Image from "next/image";

export default function NavBar() {
  const [openNav, setOpenNav] = useState(false);
 
  useEffect(() => {
    
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);
 
  const navList = (
    <ul className="mx-1 mb-4 mt-2 flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6 text-neutral-100">
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <Link href="/about" className="flex items-center">
          About The Proyect
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          API
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Documentation
        </a>
      </Typography>
    </ul>
  );
 
  return (
    <Navbar className="flex ml-7 mx-auto max-full py-1 pl-20 bg-gradient-to-r from-teal-950 to-cyan-950">
      <Link href="/">
          <Image src={Logo} alt="" width="max" height="100"></Image>
      </Link>
      
      <div className="container mx-auto flex items-center justify-between text-neutral-100">
        <div className="hidden lg:block ml-28">{navList}</div>
        
      </div>
      
    </Navbar>
  );
}