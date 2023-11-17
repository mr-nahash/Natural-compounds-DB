"use client";
import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import MoleculeInfo from "@components/MolSummary";

export default function MoleculeGallery({ itemsPerPage, data }) {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [active, setActive] = React.useState(1);

  const next = () => {
    if (active === totalPages) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  const indexOfLastItem = active * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div className="grid grid-cols-2 place-items-center p-2">
        <MoleculeInfo molecules={currentItems} />
      </div>
      <div className="flex justify-center mt-4 mb-20">
        <div className="flex items-center gap-8">
          <IconButton
            size="sm"
            variant="outlined"
            color="blue-gray"
            onClick={prev}
            disabled={active === 1}
            className="justify-center"
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
          <Typography color="gray" className="font-normal">
            Page <strong className="text-blue-gray-900">{active}</strong> of{" "}
            <strong className="text-blue-gray-900">{totalPages}</strong>
          </Typography>
          <IconButton
            size="sm"
            variant="outlined"
            color="blue-gray"
            onClick={next}
            disabled={active === totalPages}
            className="justify-center"
          >
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
