import Link from "next/link";
import React, { useEffect } from "react";
import "./styles/mol_records.css"


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
                <div className="grid grid-cols-2 mx-3 p-1 my-1 ml-5 rounded-xl border-[1px] border-zinc-600 bg-white shadow-white">
                    <img
                      data-smiles={molecule.structure.SMILES}
                      data-smiles-options={JSON.stringify({ width: 500, height: 500 })}
                      alt="Molecule"
                    />
                  <div className="gap-0">
                    <div className="text-xl font-semibold">{molecule.name}</div>
                  <div className="Molecule-details-row">
                    <div className="Molecule-details-label">Tanimoto</div>
                    <div className="Molecule-details-value">{item.tanimoto}</div>
                  </div>
                  <div className="Molecule-details-row">
                    <div className="Molecule-details-label">Origin</div>
                    <div className="Molecule-details-value"></div>
                  </div>
                  <div className="Molecule-details-row">
                    <div className="Molecule-details-label indent-10">Kingdom:</div>
                    <div className="Molecule-details-value">{molecule.origin.kingdom}</div>
                  </div>
                  <div className="Molecule-details-row">
                    <div className="Molecule-details-label indent-10">Genus:</div>
                    <div className="Molecule-details-value">{molecule.origin.genus}</div>
                  </div>
                  <div className="Molecule-details-row">
                    <div className="Molecule-details-label indent-10">Species:</div>
                    <div className="Molecule-details-value">{molecule.origin.species}</div>
                  </div>
                    
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
                <div className="grid grid-cols-2 mx-3 p-3 my-1 rounded-xl border-[1px] border-zinc-600 bg-white shadow-white">
                 
                    <img
                      data-smiles={molecule.structure.SMILES}
                      data-smiles-options={JSON.stringify({ width: 500, height: 500 })}
                      alt="Molecule"
                    />
                  <div className="gap-2">
                    <div className="text-xl font-semibold">{molecule.name}</div>
                    <p></p>
                    <div className="Molecule-details-label">Bioactivity:</div>
                    <div className="Molecule-details-value indent-5">{molecule.bioactivity||"undiscovered"}</div>

                    <div className="Molecule-details-label">Origin: </div>
                    <div className="Molecule-details-value indent-5">{molecule.origin.kingdom}</div>
                    <div className="Molecule-details-value indent-5">{molecule.origin.species}</div>
   
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
