import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { List, ListItem } from "@material-tailwind/react";
import { Slider } from "@mui/material";
import { Button } from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

const SearchByLipinski = ({LipinskiLimits}) => {
  const router = useRouter();
  const [descriptorValues, setDescriptorValues] = useState({});


  const descriptors = [
    { var: "MW", label: "Molecular Weight", marks: null },
    { var: "LogP", label: "LogP", marks: null },
    { var: "TPSA", label: "Topological Surface Area (TPSA)", marks: null },
    { var: "HBA", label: "Hydrogen Bond Acceptors", marks: true },
    { var: "HBD", label: "Hydrogen Bond Donors", marks: true },
    { var: "RB", label: "Rotable Bonds", marks: true },
  ];

  const assignDefaultValuesToUntouchedSliders = () => {
    const defaultValues = {};
    descriptors.forEach((descriptor) => {
      defaultValues[descriptor.var] = [
        LipinskiLimits?.[descriptor.var]?.min || 0,
        LipinskiLimits?.[descriptor.var]?.max || 100,
      ];
    });
    setDescriptorValues(defaultValues);
  };


  useEffect(() => {
    if (!LipinskiLimits) {
      fetchDataFromAPI();
    } else {
      assignDefaultValuesToUntouchedSliders();
    }
  }, [LipinskiLimits]);

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

    const encodedQueryParams = new URLSearchParams(queryParams).toString();
    router.push(`/search?${encodedQueryParams}`);
  };

  const handleSliderChange = (varName, values) => {
    setDescriptorValues((prevValues) => ({
      ...prevValues,
      [varName]: values,
    }));
  };

  const handleSearch = () => {
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
                min={LipinskiLimits?.[descriptor.var]?.min}
                max={LipinskiLimits?.[descriptor.var]?.max}
                defaultValue={[
                  LipinskiLimits?.[descriptor.var]?.min || 0,
                  LipinskiLimits?.[descriptor.var]?.max || 100,
                ]}
                valueLabelDisplay="auto"
                value={
                  descriptorValues[descriptor.var] || [
                    LipinskiLimits?.[descriptor.var]?.min || 0,
                    LipinskiLimits?.[descriptor.var]?.max || 100,
                  ]
                }
                onChange={(event, values) =>
                  handleSliderChange(descriptor.var, values)
                }
              />
            </div>
            {LipinskiLimits?.[descriptor.var] && (
              <div className="flex justify-between bottom">
                <p>{LipinskiLimits[descriptor.var].min}</p>
                <p>{LipinskiLimits[descriptor.var].max}</p>
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
