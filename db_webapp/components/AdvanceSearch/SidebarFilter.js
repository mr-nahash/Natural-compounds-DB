"use client";
import React from "react";
import SearchBar from "../SearchBar";


import SearchByOrigin from "./byOrigin";
import SearchByLipinski from "./byLipinkski";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,

} from "@material-tailwind/react";
import {
  ChartBarIcon,
  MapIcon,
  MapPinIcon,
  PencilIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Drawer from "../MoleculeEdit";
import Link from "next/link";


export default function SidebarFilter() {
  const [open, setOpen] = React.useState(0);
  
 // Initialize as an empty object
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  
  return (
    <Card className= "pb-4 h-full w-full max-w-[40rem] p-4 shadow-xl shadow-blue-gray-900/5 overflow-y-auto">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Advance Search
        </Typography>
      </div>
      <List>
        {/* Searchbar*/}
        <div className="mb-5"><SearchBar className='mx-.1'></SearchBar></div>
        {/* Search by Origin funtionality */}
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <MapPinIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Origin
              </Typography>
            </AccordionHeader>  
          </ListItem>
          <AccordionBody className="py-1">
            <div className="overflow-y-auto max-h-[200px]">
              <p>Search by kingdom</p>
              <SearchByOrigin></SearchByOrigin>
            </div>
          </AccordionBody>
        </Accordion>
         {/* Search by Lipinski Descriptors funtionality */}
        <Accordion open={open === 2} icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`} />} >
          <ListItem className="p-0" selected={open === 3}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal"> Lipinski Descriptors </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-0">
            <div className="overflow-y-auto max-h-[400px]">
              <SearchByLipinski></SearchByLipinski>
            </div>
          </AccordionBody>
        </Accordion>
        {/* Search by Drawer */}
        <Accordion
          open={open === 3}
          icon={
            <ChevronRightIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader className="border-b-0 p-3">
              <ListItemPrefix>
                <PencilSquareIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal" >
              <Link href='/draw'>Draw Molecule</Link>
              </Typography>
            </AccordionHeader>  
          </ListItem>
        </Accordion>
      </List>
    </Card>
  );
};
