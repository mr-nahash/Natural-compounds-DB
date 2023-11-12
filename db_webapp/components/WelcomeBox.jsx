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
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Welcome!
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Welcome to BIOMX DB, the biggest curated Mexican Natural Products Database &apos;s hearts, as for that subtle something, that quality
              of air that emanation from old trees, that so wonderfully changes
              and renews a weary spirit.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="lg" color="white">
                Explore
              </Button>

            </div>
          </div>
        </div>
        
      </div>
      
  ))}
</Carousel>
);
}