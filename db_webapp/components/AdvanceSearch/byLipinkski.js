import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { List, ListItem } from "@material-tailwind/react";
import { Slider } from "@mui/material";
import { Button } from "@material-tailwind/react";
import {
  CloudArrowUpIcon,
  ArrowLongRightIcon,
  ArrowPathIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

const SearchByLipinski = () => {
  // Use the useRouter hook
  const router = useRouter();
  const [descriptorLimits, setDescriptorLimits] = useState({});
  const [descriptorValues, setDescriptorValues] = useState({});

  const descriptors = [
    { var: "MW", label: "Molecular Weight", marks: null },
    { var: "LogP", label: "LogP", marks: null },
    { var: "TPSA", label: "Topological Surface Area (TPSA)", marks: null },
    { var: "HBA", label: "Hydrogen Bond Acceptors", marks: true },
    { var: "HBD", label: "Hydrogen Bond Donors", marks: true },
    { var: "RB", label: "Rotable Bonds", marks: true },
  ];

  // Function to assign default values to untouched sliders
  const assignDefaultValuesToUntouchedSliders = () => {
    const defaultValues = {};
    descriptors.forEach((descriptor) => {
      if (!descriptorValues[descriptor.var]) {
        defaultValues[descriptor.var] = [
          descriptorLimits[descriptor.var]?.min || 0,
          descriptorLimits[descriptor.var]?.max || 100,
        ];
      }
    });
    setDescriptorValues((prevValues) => ({
      ...prevValues,
      ...defaultValues,
    }));
  };

  // Fetch lipinski descriptors by retrieving information from the api/limits API
  useEffect(() => {
    const fetchDescriptorLimits = async () => {
      try {
        const response = await fetch("/api/limits"); // Change this to your API endpoint
        if (response.ok) {
          const data = await response.json();
          setDescriptorLimits(data);
          assignDefaultValuesToUntouchedSliders(); // Call this function when limits are available
        } else {
          console.error("Error fetching descriptor limits");
        }
      } catch (error) {
        console.error("Error fetching descriptor limits:", error);
      }
    };

    fetchDescriptorLimits();
  }, []);

  // Function to update URL with slider parameters
  const updateURLWithSliderValues = () => {
    const queryParams = {};
    descriptors.forEach((descriptor) => {
      if (descriptorValues[descriptor.var]) {
        queryParams[`min${descriptor.var}`] =
          descriptorValues[descriptor.var][0];
        queryParams[`max${descriptor.var}`] =
          descriptorValues[descriptor.var][1];
      }
    });
    // Create a new query object with the updated slider values

    // Encode the query parameters
    const encodedQueryParams = new URLSearchParams(queryParams).toString();
    // Push the updated query to the URL
    router.push(`/search?${encodedQueryParams}`);
  };

  const handleSliderChange = (varName, values) => {
    setDescriptorValues((prevValues) => ({
      ...prevValues,
      [varName]: values,
    }));
  };

  const handleSearch = () => {
    // Call the function to update the URL with slider parameters
    updateURLWithSliderValues();
  };

  return (
    <List className="p-0">
      {descriptors.map((descriptor) => (
        <ListItem key={descriptor.var}>
          <div className="w-96">
            <p>{descriptor.label}</p>
            <div className="slider-container">
              <Slider
                min={descriptorLimits[descriptor.var]?.min}
                max={descriptorLimits[descriptor.var]?.max}
                defaultValue={[descriptorLimits[descriptor.var]?.min, descriptorLimits[descriptor.var]?.max]}
                
                valueLabelDisplay="auto"
                
                value={
                  descriptorValues[descriptor.var] || [
                    descriptorLimits[descriptor.var]?.min || 0,
                    descriptorLimits[descriptor.var]?.max || 100,
                  ]
                }
                
                onChange={(event, values) =>
                  handleSliderChange(descriptor.var, values)
                }
              />
            </div>
            {descriptorLimits[descriptor.var] && (
              <div className="flex justify-between bottom">
                <p>{descriptorLimits[descriptor.var].min}</p>
                <p>{descriptorLimits[descriptor.var].max}</p>
              </div>
            )}
          </div>
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

export default SearchByLipinski;
