"use client";
import { useState } from "react";
import { Carousel, Typography, Button } from "@material-tailwind/react";

export function HomeCarousel() {
  const [index, setIndex] = useState(0);

  const imageUrls = [
    "cenote.jpg"
  ];

  const handleSlideChange = (newIndex) => {
    setIndex(newIndex);
  };

  return (
    <Carousel 
    activeSlide={index} onChange={handleSlideChange}>
    {imageUrls.map((imageUrl, index) => (
      <div
        key={index}
        className="relative h-full w-full"
      >
        <img
          src={imageUrl}
          alt={`image ${index + 1}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-1/2 place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4 text-slate-50 pt-5">
            <Typography
              variant="4"
              color="white"
              className="mb-4 text-3xl md:text-3xl lg:text-5xl"
            >
              EXPLORE THE MEXICAN BIODIVERSITY
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Welcome to BIOMX DB, the biggest curated Mexican Natural Products Database. Composed by 605 compounds coming from 
              plants, fungi and even animals.
            </Typography>
            <div className=" justify-center gap-2">
              <Button size="lg" color="white" href="/about">
                About the proyect
              </Button>

            </div>
          </div>
        </div>
        
      </div>
      
  ))}
</Carousel>
);
}