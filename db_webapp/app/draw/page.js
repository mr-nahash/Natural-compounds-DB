"use client";
import Drawer from "@components/MoleculeEdit";

export default function MoleculeDraw() {
    return (
      <div className="grid grid-cols-3 gap-4 w-full h-full">
        {/* Left Column */}
        <div className="col-span-1">
          <Drawer />
        </div>
  
        {/* Right Column */}
        <div className="col-span-2">
          {/* Content for the right column */}
        </div>
      </div>
    );
  }