'use client';
import React from "react";
import { Checkbox } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
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
  CloudArrowUpIcon,
  ArrowLongRightIcon,
  ArrowPathIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRouter } from "next/navigation";


const SearchByOrigin = () => {
    const router = useRouter();
    const [selectedOptions, setSelectedOptions] = useState([]);
  
    const handleSearch = () => {
      const query = selectedOptions.join(',');
      const encondedquery=encodeURI(query)
  
      // Update the URL
      router.push(`/search?kingdom=${encondedquery}`);
    };
  
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
  
    return (
      <List className="p-0">
        <ListItem>
          <ListItemPrefix>
            <Checkbox label="Plant" onChange={() => handleCheckboxChange('Plant')} />
          </ListItemPrefix>
          <ListItemPrefix>
            <Checkbox label="Fungi" onChange={() => handleCheckboxChange('Fungus')} />
          </ListItemPrefix>
          <ListItemPrefix>
            <Checkbox label="Animal" onChange={() => handleCheckboxChange('Animal')} />
          </ListItemPrefix>
        </ListItem>
        <Button variant="text" className="flex items-center gap-2" onClick={handleSearch}>
          Search <ArrowLongRightIcon strokeWidth={2} className="h-5 w-5" />
        </Button>
      </List>
    );
  };
  
  export default SearchByOrigin;