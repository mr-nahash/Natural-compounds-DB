import React, { useEffect, useRef } from 'react';
import { Button } from "@material-tailwind/react";
import {
  CloudArrowUpIcon,
  ArrowLongRightIcon,
  ArrowPathIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

export default function Drawer() {
  const editorRef = useRef(null); // Ref to store the editor instance

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://molsoft.com/lib/moledit.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      // Ensure that the script has loaded before initializing ChemicalView
      const editor = new ChemicalView('c1ccccc1', 'myEditor');
      document.moledit = editor; // Store the editor instance in the global object
      editorRef.current = editor; // Store the editor instance in the ref
    };
    document.body.appendChild(script);

    // Clean up the script element when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGetSmiles = () => {
    if (editorRef.current) {
      const smiles = editorRef.current.getSmiles(); // Call the getSmiles function
      // Log the SMILES string in the console
      console.log('SMILES:', smiles);
    }
  };

  return (
    <div id="myEditor" style={{ width: '100%', height: '100%', border: '2px solid gray'}}>
      {/* You can place content or additional elements here if needed */}
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={handleGetSmiles}>
        Search <ArrowLongRightIcon strokeWidth={2} className="h-5 w-5" />
      </Button>
    </div>
    
  );
}


