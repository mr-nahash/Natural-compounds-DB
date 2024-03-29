"use client";
import React from "react";
import SearchBar from "../SearchBar";
import { useState,useEffect } from "react";


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
  ExclamationTriangleIcon
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SearchByBioactivity from "./byBioactivity";


// ... (other imports)

export default function SidebarFilter() {
  const [open, setOpen] = React.useState(0);
  const [originOptions, setOriginOptions] = useState([]);
  const [bioactivityOptions, setBioactivityOptions] = useState([]);
  const [LipinskiLimits, setLipinskiLimits] = useState();


  useEffect(() => {
    const fetchOriginOptions = async () => {
      try {
        const response = await fetch("/api/originOptions");
        if (response.ok) {
          const data = await response.json();
          setOriginOptions(data);
        } else {
          console.error("Error fetching origin options");
        }
      } catch (error) {
        console.error("Error fetching origin options:", error);
      }
    };


    const fetchBioactivityOptions = async () => {
      try {
        const response = await fetch("/api/optionsBioactivity"); // Change this to your API endpoint
        if (response.ok) {
          const data = await response.json();
          setBioactivityOptions(data);
        } else {
          console.error("Error fetching origin options");
        }
      } catch (error) {
        console.error("Error fetching origin options:", error);
      }
    };

    const fetchLimitsLipinski = async () => {
      try {
        const response = await fetch("/api/limits");
        if (response.ok) {
          const data = await response.json();
          setLipinskiLimits(data);
        } else {
          console.error("Error fetching descriptor limits");
        }
      } catch (error) {
        console.error("Error fetching descriptor limits:", error);
      }
    }

    fetchBioactivityOptions();
    fetchOriginOptions();
    fetchLimitsLipinski();

  }, []);

  // Initialize as an empty object
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="relative flex pb-4 w-full max-w-[40rem] p-4 shadow-xl shadow-blue-gray-900/5 overflow-y-auto">
      <div className="mb-2 p-4 self-center">
        <Typography variant="h5" color="blue-gray">
          Advance Search
        </Typography>
      </div>
      <List>
        {/* Searchbar*/}
        <div className="mb-5">
          <SearchBar className="mx-.1"></SearchBar>
        </div>
        {/* Search by Origin functionality */}
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <MapPinIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Source of NP
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            {open === 1 && (
              <div className="overflow-y-auto max-h-[200px]">
                <p>Search by kingdom</p>
                <SearchByOrigin optionsData={originOptions}/>
              </div>
            )}
          </AccordionBody>
        </Accordion>
        {/* Search by Bioactivity functionality */}
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <ExclamationTriangleIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
               Potential Bioactivity
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            {open === 2 && (
              <div className="overflow-y-auto max-h-[200px]">
                <p>Search by Bioactivity</p>
                <SearchByBioactivity optionsData={bioactivityOptions}/>
              </div>
            )}
          </AccordionBody>
        </Accordion>
        {/* Search by chemical Descriptors functionality */}
        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 3 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 3}>
            <AccordionHeader
              onClick={() => handleOpen(3)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <ChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Chemical Descriptors
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-0">
            {open === 3 && (
              <div className="overflow-y-auto h-auto">
                <SearchByLipinski LipinskiLimits={LipinskiLimits}/>
              </div>
            )}
          </AccordionBody>
        </Accordion>
        {/* Search by Drawer */}
        <Link href="/draw">
          <Accordion
          open={open === 3}
          icon={
            <ChevronRightIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
            />
            }
          >

            <AccordionHeader className="border-b-0 p-3">
              <ListItemPrefix>
                <PencilSquareIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Similarity Search
              </Typography>
            </AccordionHeader>
          </Accordion>
        </Link>
      </List>
    </Card>
  );
}
