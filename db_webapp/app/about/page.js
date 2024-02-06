"use client";
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Card,
  Typography,
  List,
  ListItem,

} from "@material-tailwind/react";

import {ChevronDownIcon } from "@heroicons/react/24/outline";
import { ImageList, ImageListItem } from "@mui/material";
import QuiltedImageList from "@components/AboutTheProyect/ImageQuilt";

const About = () => {
  const [open, setOpen] = React.useState(100);

  const handleOpen = (value) => {
    if (open === value) {
      setOpen(0);
    } else {
      setOpen(value);
    }
  };

  return (
    <div className="grid justify-center grid-cols-2" style={{ gridTemplateColumns: '600px 1fr' }}>
      <div className="justify-center pl-20">
          <QuiltedImageList></QuiltedImageList>
      </div>
        <Card className="max-w-full gap-2 lg:flex-row lg:items-center">
              <div className="mb-2 p-4 self-center">
                <Typography variant="h5" color="blue-gray">
                  About the Proyect 
                </Typography>
              </div>
              <List>
                {/* Searchbar*/}

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

                      <Typography color="blue-gray" className="mr-auto font-normal">
                        The Need for BIOMX DB
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1 px-5 overflow-y-auto h-auto">
                    {open === 1 && (
                      <div className="overflow-y-auto max-h-[200px]">
                        <p>BIOMX DB is proposed as an intuitive, web-based database, offering an array of advanced search, 
                      filtering, and download capabilities to address the existing limitations of the BIOFACQUIM dataset. 
                      This initiative aims to catalyze research endeavors and facilitate the dissemination of knowledge 
                      within the realm of natural product discovery in Mexico. Additionally, it aspires to serve as a 
                      prominent platform for highlighting the rich natural diversity within our country.</p>
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

                      <Typography color="blue-gray" className="mr-auto font-normal">
                        Data provenance and content
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1 px-5">
                    {open === 2 && (
                      <div className="overflow-y-auto max-h-[200px]">
                        <p>
                            The database for BIOMEX DB was based on BIOFACQUIM´s latest dataset release (2023),
                            which comprises a 600 compound version instead of the 400 version released in 2019.
                          </p>
                          <br />
                          <p>
                            The raw data for the entire database can be downloaded{" "}
                            <a
                              href="https://www.difacquim.com/d-databases/"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: 'blue', textDecoration: 'underline' }}
                            >
                              here
                            </a>.
                          </p>            
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
                      <Typography color="blue-gray" className="mr-auto font-normal">
                        About the team
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-0 px5">
                    {open === 3 && (
                      <div className="overflow-y-auto h-auto">
                      </div>
                    )}
                  </AccordionBody>
                </Accordion>
                
              </List>
        </Card>
            
      </div>
  );
};

export default About;
