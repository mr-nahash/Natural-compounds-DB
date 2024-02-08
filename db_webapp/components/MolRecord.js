"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowDownOnSquareStackIcon,
  DocumentDuplicateIcon
} from "@heroicons/react/24/solid";
import "./styles/mol_records.css"
import Image from "next/image";

const MoleculeRecord = ({ molecule }) => {
  const [csvData, setCsvData] = useState(null);
  const [showLegend, setShowLegend] = useState(false);
  

  useEffect(() => {
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
  }, [molecule]);

  const generateCSV = () => {
    if (!molecule) {
      return;
    }

  
    const {
      name,
      origin: { kingdom, genus, species },
      moleculeId,
      metadata: { journal, reference, year, doi },
      location: { mxState, location },
      bioactivity,
      lipinski,
    } = molecule;

    const csvContent = `Name,Kingdom,Genus,Species,ID,Journal,Reference,Year,DOI,State,Site,Activity\n`;
    const csvRow = `${name},${kingdom},${genus},${species},${moleculeId},${journal},${reference},${year},${doi},${state},${site}\n`;
    
    setCsvData(csvContent + csvRow);
  };

  const downloadCSV = () => {
    if (csvData) {
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${molecule.moleculeId}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="MoleculeRecord-container">
      <div className="Molecule-information">
          <ArrowDownOnSquareStackIcon
              className="h-7 w-7 text-black float-right"
              onClick={() => { generateCSV(); downloadCSV(); }}
              onMouseEnter={() => setShowLegend(true)}
              onMouseLeave={() => setShowLegend(false)}
              >
              {showLegend && (
              <div className="legend">Download the molecule data in CSV format.</div>
            )}
            </ArrowDownOnSquareStackIcon>        
        <Image
          className="Molecule-image"
          data-smiles={molecule.structure.SMILES}
          data-smiles-options={JSON.stringify({ width: 500, height: 500 })}
          alt={`Molecule ${molecule.moleculeId}`}
          priority 
        />
        

        <div className="Molecule-info-row">
          <div className="Molecule-info-label">Common Name</div>
          <div className="Molecule-info-value">{molecule.name}</div>
        </div>
        <div className="Molecule-info-row">
          <div className="Molecule-info-label">Chemical Formula</div>
          <div className="Molecule-info-value">{molecule.lipinski.MolFormula}</div>
        </div>
        <div className="Molecule-info-row">
          <div className="Molecule-info-label">Molecular Weight</div>
          <div className="Molecule-info-value">{molecule.lipinski.MW}</div>
        </div>
        <div className="Molecule-info-row">
          <div className="Molecule-info-label">HBD</div>
          <div className="Molecule-info-value">{molecule.lipinski.HBD}</div>
        </div>
        <div className="Molecule-info-row">
          <div className="Molecule-info-label">HBA</div>
          <div className="Molecule-info-value">{molecule.lipinski.HBA}</div>
        </div>
        <div className="Molecule-info-row">
          <div className="Molecule-info-label">RB</div>
          <div className="Molecule-info-value">{molecule.lipinski.RB}</div>
        </div>
        <div className="Molecule-info-row">
          <div className="Molecule-info-label">TPSA</div>
          <div className="Molecule-info-value">{molecule.lipinski.TPSA}</div>
        </div>
      </div>

      <div className="Molecule-details">
      <div className="Molecule-details-row">
          <div className="Molecule-details-label">Common Name</div>
          <div className="Molecule-details-value">{molecule.name}</div>
        </div>
        <div className="Molecule-details-row">
          <div className="Molecule-details-label">BIOFACQUIM ID</div>
          <div className="Molecule-details-value">{molecule.moleculeId}</div>
        </div>
        <div className="Molecule-details-row">
          <div className="Molecule-details-label">Isomeric SMILES
            <DocumentDuplicateIcon
                className="h-7 w-7 float-right"
                onClick={() => navigator.clipboard.writeText(molecule.structure.SMILES)}
                onMouseEnter={() => setShowLegend(true)}
                onMouseLeave={() => setShowLegend(false)}
                >
                {showLegend && (
                <div className="legend">copy to clipboard</div>
              )}
              </DocumentDuplicateIcon>    
          </div>
            <div className="Molecule-details-value">
            {molecule.structure.SMILES}
            </div>
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
        <div className="Molecule-details-row">
          <div className="Molecule-details-label">Specimen Location</div>
          <div className="Molecule-details-value"></div>
        </div>
        <div className="Molecule-details-row">
          <div className="Molecule-details-label indent-10">Mexican State:</div>
          <div className="Molecule-details-value">{molecule.location.mxState}</div>
        </div>
        <div className="Molecule-details-row">
          <div className="Molecule-details-label indent-10">Location:</div>
          <div className="Molecule-details-value">{molecule.location.location}</div>
        </div>
        <div className="Molecule-details-row">
          <div className="Molecule-details-label">First Report</div>
          <div className="Molecule-details-value"></div>
        </div>
        <div className="Molecule-details-row">
          <div className="Molecule-details-label indent-10">Reference:</div>
          <div className="Molecule-details-value">{molecule.metadata.reference}</div>
        </div>
        <div className="Molecule-details-row">
          <div className="Molecule-details-label indent-10">Journal:</div>
          <div className="Molecule-details-value">{molecule.metadata.journal}</div>
        </div>
        <div className="Molecule-details-row">
          <div className="Molecule-details-label indent-10">DOI:</div>
          <div className="Molecule-details-value">{molecule.metadata.doi}</div>
        </div>
        <div className="Molecule-details-row">
          <div className="Molecule-details-label">Bioactivity Reported</div>
          <div className="Molecule-details-value">{molecule.bioactivity}</div>
        </div>
      </div>
    </div> 
          );
        };
        
        export default MoleculeRecord;
