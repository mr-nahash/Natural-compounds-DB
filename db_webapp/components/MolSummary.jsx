import Link from "next/link";
import React, { useEffect } from "react";

const MoleculeInfo = ({molecules}) => {
  useEffect(() => {
    // Apply SMILES to image transformation code whenever page changes
    if (window.SmiDrawer) {
      window.SmiDrawer.apply();
    }
  }, [molecules]);

  return (
    <>
      {Array.isArray(molecules) &&
        molecules.map((item) => {
          if (item.tanimoto && item.molecule) {
            // Render molecule data with Tanimoto score
            const molecule = item.molecule;

            return (
              <Link key={molecule.id} href={`/molecule/${molecule.id}`}>
                <div className="flex p-3 gap-2 my-1 rounded-xl border-[1px] border-zinc-600 bg-white shadow-white">
                  <div>
                    {/* The images will be generated by the SMILES to image transformation script */}
                    <img
                      data-smiles={molecule.structure.SMILES}
                      data-smiles-options={JSON.stringify({ width: 500, height: 500 })}
                      alt="Molecule"
                    />
                  </div>
                  <div className="gap-2">
                    <div className="text-xl font-semibold">{molecule.name}</div>
                    <span className="text-lg font-light">
                      Origin: {molecule.origin.kingdom}, {molecule.origin.genus}, {molecule.origin.species}
                    </span>
                    <span className="text-lg font-light">Tanimoto: {item.tanimoto}</span>
                    {/* Add other molecule properties as needed */}
                  </div>
                </div>
              </Link>
            );
          } else if (item.id && item.origin && item.structure) {
            // Render molecule data without Tanimoto score (assumes molecule data structure)
            const molecule = item;

            return (
              <Link key={molecule.id} href={`/molecule/${molecule.id}`}>
                <div className="flex p-3 gap-2 my-1 rounded-xl border-[1px] border-zinc-600 bg-white shadow-white">
                  <div>
                    {/* The images will be generated by the SMILES to image transformation script */}
                    <img
                      data-smiles={molecule.structure.SMILES}
                      data-smiles-options={JSON.stringify({ width: 500, height: 500 })}
                      alt="Molecule"
                    />
                  </div>
                  <div className="gap-2">
                    <div className="text-xl font-semibold">{molecule.name}</div>
                    <span className="text-lg font-light">
                      Origin: {molecule.origin.kingdom}, {molecule.origin.genus}, {molecule.origin.species}
                    </span>
                    {/* Add other molecule properties as needed */}
                  </div>
                </div>
              </Link>
            );
          } else {
            // Handle other data structures or invalid data
            return (
              <div key={item.id || "invalid"}>Invalid data structure</div>
            );
          }
        })}
    </>
  );
};

export default MoleculeInfo;
