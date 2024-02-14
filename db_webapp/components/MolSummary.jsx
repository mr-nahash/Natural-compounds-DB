"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import "./styles/mol_records.css"
import Image from "next/image";


const MoleculeInfo = ({molecules}) => {
    useEffect(() => {
      // Define an asynchronous function to load the SmiDrawer script
      const loadSmiDrawerScript = async () => {
        // Check if SmiDrawer is already available in the global scope
        if (window.SmiDrawer) {
          // If SmiDrawer is available, apply it immediately
          window.SmiDrawer.apply();
        } else {
          // If SmiDrawer is not available, dynamically create a script element
          const script = document.createElement("script");
  
          // Set the source URL of the script to the SmiDrawer library
          script.src = "https://unpkg.com/smiles-drawer@2.0.1/dist/smiles-drawer.min.js";
  
          // Set the async attribute to true to load the script asynchronously
          script.async = true;
  
          // Append the script element to the head of the document
          document.head.appendChild(script);
  
          // Set up an event handler for the script's onload event
          script.onload = () => {
            // Once the script is loaded, apply SmiDrawer
            window.SmiDrawer.apply();
          };
        }
      };
  
      // Call the asynchronous function to load SmiDrawer script
      loadSmiDrawerScript();
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
                      alt="Molecule ${molecule}"
                    />
                  <div className="gap-0">
                  <div className="text-xl font-semibold" style={{ overflow: 'hidden', whiteSpace: 'normal', textOverflow: 'ellipsis' }}>
                      {molecule.name}</div>
                  <div className="Molecule-details-row">
                    <div className="Molecule-details-label">Tanimoto coefficient: </div>
                    <div className="Molecule-details-value">{item.tanimoto}</div>
                  </div>
                  <div className="text-m font-semibold" style={{ overflow: 'hidden', whiteSpace: 'normal', textOverflow: 'ellipsis' }}>{molecule.name}</div>
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
          } else if (item.id && item.origin && item.structure) {
            // Render molecule data without Tanimoto score (assumes molecule data structure)
            const molecule = item;

            return (
              <Link key={molecule.id} href={`/molecule/${molecule.id}`}>
                <div className="grid grid-cols-2 mx-3 my-1 p-3 my-1 rounded-xl border-[1px] border-zinc-600 bg-white shadow-white">
                 
                    <img
                      data-smiles={molecule.structure.SMILES}
                      data-smiles-options={JSON.stringify({ width: 500, height: 500 })}
                      alt="Molecule"
                    />
                  <div className="gap-2">
                    <div className="text-m font-semibold" style={{ overflow: 'hidden', whiteSpace: 'normal', textOverflow: 'ellipsis' }}>{molecule.name}</div>
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
