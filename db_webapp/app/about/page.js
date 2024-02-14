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
import Profile_Fernando from "@public/profile_pic.jpg"
import Profile_Medina from "@public/DrMedina.jpg"
import Image from "next/image";

const About = () => {
  const [openStates, setOpenStates] = React.useState({
    accordion1: true, // Set initial state for each accordion
    accordion2: true,
    accordion3: true,
    accordion4: true,
  });
  const handleOpen = (accordionName) => {
    setOpenStates({
      ...openStates,
      [accordionName]: !openStates[accordionName], // Toggle state without using previous state
    });
  };

  const profiles = [
    { id: 1, name: "Fernando Martínez-Urrutia", title: "Lead Software Developer", subtitle:"Creator of BIOMX-DB", imgSrc: Profile_Fernando },
    { id: 2, name: "Dr. Jose Luis Medina-Franco", title: "Director of DIFACQUIM Reasearch Group", subtitle:"Project Supervisor", imgSrc: Profile_Medina },
    // Add more profiles as needed
  ];

  return (
    <div>
    <div className="grid justify-center grid-cols-2" style={{ gridTemplateColumns: '2fr 1fr' }}>
      
        <Card className="m-10 max-w-full gap-2 lg:items-center">
              <div className="mb-2 p-4 self-center">
                <Typography variant="h5" color="blue-gray">
                  About the Project
                </Typography>
              </div>
              <List>
                <Accordion
                  open={openStates.accordion1}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 ${
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
                      className={`mx-auto h-4 w-4 ${
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
                      className={`mx-auto h-4 w-4 ${
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
                  <AccordionBody className="py-1 px-5">
                    {openStates.accordion3 && (
                      <div className="overflow-y-auto max-h-[200px]">
                        <p>
                        DIFACQUIM (Computer-Aided Drug Design at the School of Chemistry) is an academic group focused on development and application of computer-aided drug design 
                          approaches with emphasis on chemoinformatics, molecular modeling, and artificial intelligence. Full details of our group are at www.difacquim.com
                          </p> <a
                              href="https://www.difacquim.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: 'blue', textDecoration: 'underline' }}
                            >
                              www.difacquim.com
                            </a>.
                                   
                      </div>
                      
                    )}
                  </AccordionBody>              
                </Accordion>
                <Accordion
                  open={openStates.accordion4} 
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 ${
                        openStates.accordion4 ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem className="p-0" selected={openStates.accordion4}>
                    <AccordionHeader
                      onClick={() => handleOpen("accordion4")}
                      className="border-b-0 p-3"
                    >

                      <Typography color="blue-gray" className="mr-auto font-normal font-bold">
                       Creators
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1 px-5">
                    {openStates.accordion4 && (
                                      <div className="grid grid-cols-2 gap-4">
                                      {profiles.map((profile) => (
                                        <div key={profile.id} className="flex flex-col items-center text-center">
                                          <Image
                                            src={profile.imgSrc}
                                            alt={`${profile.name}'s pic`}
                                            width={150}
                                            height={150}
                                            className="rounded-full object-cover"
                                          />
                                          <div className="mt-2">
                                            <p className="font-semibold">{profile.name}</p>
                                            <p className="text-sm">{profile.title}</p>
                                            <p className="text-s">{profile.subtitle}</p>
                                          </div>
                                        </div>
                                      ))}
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
