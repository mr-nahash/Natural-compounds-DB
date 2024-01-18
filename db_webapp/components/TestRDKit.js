"use client";
import React, { useEffect } from 'react';
import initRDKitModule from '@public/rdkit/RDKit_minimal';

const RDKitDemo = () => {
  useEffect(() => {
    const initRDKIT = async () => {
      try {
        const rdkitInstance = await initRDKitModule();
        console.log('version: ' + rdkitInstance.version());
        processChemicalInfo(rdkitInstance);
      } catch (error) {
        console.error('Error initializing RDKit:', error);
      }
    };

    const processChemicalInfo = async (rdkitInstance) => {
        const smiles = "CC(=O)Oc1ccccc1C(=O)O";
        const mol = rdkitInstance.get_mol(smiles);
        const val = mol[`get_morgan_fp`]();
        console.log(val)
      
      };

    initRDKIT();
  }, []);

  return <div id="example-8-output"></div>;
};

export default RDKitDemo;
