import React, { useState, useEffect } from "react";
import { Checkbox } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import {
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const SearchByBioactivity = ({ optionsData }) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSearch = () => {
    if (selectedOption) {
      const encodedQuery = encodeURI(selectedOption);
      // Update the URL
      router.push(`/search?bioactivity=${encodedQuery}`);
    }
  };

  const handleCheckboxChange = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  return (
    <List className="p-0">
      {optionsData.map((option) => (
        <ListItem key={option} className="p-0">
          <ListItemPrefix>
            <Checkbox
              label={option}
              checked={option === selectedOption}
              onChange={() => handleCheckboxChange(option)}
            />
          </ListItemPrefix>
        </ListItem>
      ))}
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={handleSearch}
      >
        Search <ArrowLongRightIcon strokeWidth={2} className="h-5 w-5" />
      </Button>
    </List>
  );
};

export default SearchByBioactivity;
