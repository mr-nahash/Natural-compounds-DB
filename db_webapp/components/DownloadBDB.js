"use client";
import React from 'react';
import { Button, Card } from '@material-tailwind/react';

const DownloadSDF = () => {
  const handleDownload = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = '/biofacquim_605_corr_sdf.sdf'; // Path to the file in the public directory
    link.download = 'BIOFACQUIM_DB.sdf'; // Set the download attribute to force download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className='p-6 relative flex shadow-blue-gray-900/5'>
      <button
        onClick={handleDownload}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Download complete DB (.sdf)
      </button>
    </Card>
  );

};

export default DownloadSDF;
