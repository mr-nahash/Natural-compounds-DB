"use client";
import { Button, Card } from '@material-tailwind/react';
import React from 'react';

const GetAllDBButton = () => {
  const handleRedirect = () => {
    const fileId = '1C1cyu7KOb4fpBHoJAMfo_F9r-w0H0eCg'; // Extracted from the original URL
    const fileUrl = `https://drive.google.com/file/d/${fileId}/view`;

    window.open(fileUrl, '_blank');
  };

  return (
    <Card className='p-6 m-5 relative flex shadow-blue-gray-900/5'>
      <button
        onClick={handleRedirect}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Downloaded complete DB in a new tab (CSV)
      </button>
    </Card>
  );
};

export default GetAllDBButton;
