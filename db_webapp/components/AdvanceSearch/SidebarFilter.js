import React from "react";
import SearchBar from "../SearchBar";

import { Slider } from "@material-tailwind/react";
import SearchByOrigin from "./byOrigin";
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
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
 
const handleCheckboxChange = (option) => {
  const updatedOptions = [...selectedOptions];

  // Toggle the selected state
  if (updatedOptions.includes(option)) {
    updatedOptions.splice(updatedOptions.indexOf(option), 1);
  } else {
    updatedOptions.push(option);
  }

  setSelectedOptions(updatedOptions);
};



export default function SidebarFilter() {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className="fixed top-10 pb-2 left-4 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Advance Search
        </Typography>
      </div>
      <List>
      <div className="mb-5"><SearchBar className='mx-.1'></SearchBar></div>

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
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Origin
              </Typography>
            </AccordionHeader>  
          </ListItem>
          <AccordionBody className="py-1">
          <p>Search by kingdom</p>
          <SearchByOrigin></SearchByOrigin>

          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Lipinski Descriptors
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
              <p>Molar Mass</p>
              <div className="w-96">
                <Slider defaultValue={50} />
              </div>

              </ListItem>
        
            </List>
          </AccordionBody>
        </Accordion>
      </List>
    </Card>
  );
}