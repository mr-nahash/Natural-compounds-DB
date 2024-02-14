"use client";
// Import the necessary dependencies
import { useEffect, useRef, useState } from 'react';
import { Button } from '@material-tailwind/react';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import MoleculeGallery from './MolGallery';

export default function SearchByTanimoto() {
  const itemsPerPage = 20;
  const editorRef = useRef(null);
  const [tanimotoWithMolecules, setTanimotoWithMolecules] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let editor = editorRef.current;

    const script = document.createElement('script');
    script.src = 'https://molsoft.com/lib/moledit.js';
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => {
      editor = new ChemicalView('c1ccccc1', 'myEditor');
      document.moledit = editor;
      editorRef.current = editor;
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [router.pathname]); // Add router.pathname as a dependency




  const calculateTanimoto = async (smiles) => {
    try {
      setIsLoading(true); // Set loading state to true
      const response = await axios.post('/api/calculate_tanimoto', { smiles });
      const tanimotoWithMolecules = response.data;
      setTanimotoWithMolecules(tanimotoWithMolecules);
      console.log('Tanimoto data:', tanimotoWithMolecules);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const handleGetSmiles = () => {
    if (editorRef.current) {
      const smiles = editorRef.current.getSmiles();
      console.log('SMILES:', smiles);
      calculateTanimoto(smiles);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 w-full h-full p-10">
      {/* Left Column */}
      <div className="col-span-1" style={{ height: '500px' }}>
        <div id="myEditor" style={{ width: '100%', height: '100%', border: '2px solid gray' }}></div>
        <div>
          <Button
            variant="text"
            className="flex items-center gap-2 relative"
            onClick={handleGetSmiles}
          >
            Search <ArrowLongRightIcon strokeWidth={2} className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {/* Right Column */}
      <div className="col-span-2">
        <div>
          {isLoading ? (
            // Render a loading indicator here if data is loading
            <p>Loading...</p>
          ) : tanimotoWithMolecules ? (
            // Conditionally render the MoleculeGallery component when data is available
            <MoleculeGallery data={tanimotoWithMolecules} itemsPerPage={itemsPerPage} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
