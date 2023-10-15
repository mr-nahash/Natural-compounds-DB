"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MoleculeRecord = ({ molecule }) => {
  const [csvData, setCsvData] = useState(null);

  useEffect(() => {
    if (window.SmiDrawer) {
      window.SmiDrawer.apply();
    }
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
      location: { state, site },
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
        <img
          className="Molecule-image"
          data-smiles={molecule.structure.SMILES}
          data-smiles-options={JSON.stringify({ width: 500, height: 500 })}
          alt={`Molecule ${molecule.moleculeId}`}
        />
        <div className="Molecule-info-row">
          <div className="Molecule-info-label">Chemical Formula</div>
          <div className="Molecule-info-value"></div>
        </div>
        <div className="Molecule-info-row">
          <div className="Molecule-info-label">Molecular Weight</div>
          <div className="Molecule-info-value">{molecule.lipinski.MW}</div>
        </div>
        <div className="Molecule-info-row">
          <div className="Molecule-info-label">LogP</div>
          <div className="Molecule-info-value">{molecule.lipinski.LogP}</div>
        </div>
        <div className="Molecule-info-row">
          <div className="Molecule-info-label">Topological Polar Surface Area (TPSA)</div>
          <div className="Molecule-info-value">{molecule.lipinski.TPSA}</div>
        </div>
        <div className="Molecule-info-row">
          <div className="Molecule-info-label">Hydrogen Bond Donors (HBD)</div>
          <div className="Molecule-info-value">{molecule.lipinski.HBD}</div>
        </div>
        <div className="Molecule-info-row">
          <div className="Molecule-info-label">Hydrogen Bond Acceptors (HBA)</div>
          <div className="Molecule-info-value">{molecule.lipinski.HBA}</div>
        </div>
        <div className="Molecule-info-row">
          <div className="Molecule-info-label">Rotable Bonds (RB)</div>
          <div className="Molecule-info-value">{molecule.lipinski.RB}</div>
        </div>
      </div>
      <div className="Molecule-details">
        <div className="Molecule-details-row">
          <div className="Molecule-details-label">BIOFACQUIM ID</div>
          <div className="Molecule-details-value">{molecule.moleculeId}</div>
        </div>
        <div className="Molecule-details-row">
          <div className="Molecule-details-label">Common Name</div>
          <div className="Molecule-details-value">{molecule.name}</div>
        </div>
        <div className="Molecule-details-row">
          <div className="Molecule-details-label">Isomeric SMILES</div>
          <div className="Molecule-details-value">SMILES</div>
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
          <div className="Molecule-details-value">{molecule.location.state}</div>
        </div>
        <div className="Molecule-details-row">
          <div className="Molecule-details-label indent-10">Site:</div>
          <div className="Molecule-details-value">{molecule.location.site}</div>
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
        <div className="Molecule-details-row">
          <div className="Molecule-details-label">Assay Activities</div>
          <div className="Molecule-details-value"></div>
        </div>
      </div>
      
      <button onClick={() => { generateCSV(); downloadCSV(); }}>Download Record (.CSV)</button>
      </div> 
      
          );
        };
        
        
        export default MoleculeRecord;