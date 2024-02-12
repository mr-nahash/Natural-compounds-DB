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
  const [openStates, setOpenStates] = React.useState({
    accordion1: true, // Set initial state for each accordion
    accordion2: true,
    accordion3: true,
  });
  const handleOpen = (accordionName) => {
    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      [accordionName]: !prevOpenStates[accordionName], // Toggle state
    }));
  };

  return (
    <div>
    <div className="grid justify-center grid-cols-2" style={{ gridTemplateColumns: '2fr 1fr' }}>
      
        <Card className="m-10 max-w-full gap-2 lg:items-center">
              <div className="mb-2 p-4 self-center">
                <Typography variant="h5" color="blue-gray">
                  About the Proyect 
                </Typography>
              </div>
              <List>
                <Accordion
                  open={openStates.accordion1}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        openStates.accordion1 ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem className="p-0" selected={openStates.accordion1}>
                    <AccordionHeader
                      onClick={() => handleOpen("accordion1")}
                      className="border-b-0 p-3"
                    >

                      <Typography color="blue-gray" className="mr-auto font-normal font-bold">
                        The Need for BIOMX DB
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1 px-5 overflow-y-auto h-auto">
                    {openStates.accordion1 && (
                      <div className="overflow-y-auto max-h-[200px]">
                        <p>BIOMX DB is proposed as an intuitive, web-based database, offering an array of advanced search, 
                      filtering, and download capabilities to enhanced the existing Mexican natural product database BIOFACQUIM<br /><br />
                      This initiative aims to catalyze research endeavors and facilitate the dissemination of knowledge 
                      within the realm of natural product discovery in Mexico. Additionally, it aspires to serve as a 
                      prominent platform for highlighting the rich natural diversity within our country.</p>
                      </div>
                    )}
                  </AccordionBody>
                </Accordion>
                <Accordion
                  open={openStates.accordion2} 
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        openStates.accordion2 ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem className="p-0" selected={openStates.accordion2}>
                    <AccordionHeader
                      onClick={() => handleOpen("accordion2")}
                      className="border-b-0 p-3"
                    >

                      <Typography color="blue-gray" className="mr-auto font-normal font-bold">
                        Data provenance and content
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1 px-5">
                    {openStates.accordion2 && (
                      <div className="overflow-y-auto max-h-[200px]">
                        <p>
                            The database for BIOMEX DB was based on BIOFACQUIM´s latest dataset release (2023),
                            which comprises a 605 compound version instead of the 400 version released in 2019.
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
                <Accordion
                  open={openStates.accordion3} 
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        openStates.accordion3 ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem className="p-0" selected={openStates.accordion3}>
                    <AccordionHeader
                      onClick={() => handleOpen("accordion3")}
                      className="border-b-0 p-3"
                    >
                      <Typography color="blue-gray" className="mr-auto font-normal font-bold">
                        About the team
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-0 px5">
                    {openStates.accordion3 && (
                      <div className="overflow-y-auto h-auto">
                      </div>
                    )}
                  </AccordionBody>
                </Accordion>
                
              </List>
        </Card>
          <Card className="m-10">
            <QuiltedImageList></QuiltedImageList>

          </Card>
                    
      </div>
      </div>
  );
};

export default About;
