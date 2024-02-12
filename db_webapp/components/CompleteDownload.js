"use client";
import { Button, Card } from '@material-tailwind/react';
import React from 'react';

const GetAllDBButton = () => {
  const handleDownload = () => {
    const csvUrl = 'https://drive.google.com/file/d/1C1cyu7KOb4fpBHoJAMfo_F9r-w0H0eCg/view?usp=drive_link';

    fetch(csvUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'BIOFACQUIM_605_Version.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Error downloading CSV:', error);
      });
  };

  return (
    <Card className='p-6 m-5 relative flex shadow-blue-gray-900/5'>

    <button onClick={handleDownload} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
    Download complete DB
    </button>
    
  </Card>
    
  );
};

export default GetAllDBButton;
