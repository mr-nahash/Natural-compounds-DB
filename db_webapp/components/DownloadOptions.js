"use client";
import React from "react";
import { ButtonGroup, Button, Card } from "@material-tailwind/react";


const OptionsDownloadButton=()=>{
    const csvDownload = () => {
        const fileId = '1C1cyu7KOb4fpBHoJAMfo_F9r-w0H0eCg'; // Extracted from the original URL
        const fileUrl = `https://drive.google.com/file/d/${fileId}/view`;
    
        window.open(fileUrl, '_blank');
      };
    const sdfDownload = () => {
        // Create a link element
        const link = document.createElement('a');
        link.href = '/biofacquim_605_corr_sdf.sdf'; // Path to the file in the public directory
        link.download = 'BIOFACQUIM_DB.sdf'; // Set the download attribute to force download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return(
      
        <div>
            <Card className='p-6 relative flex shadow-blue-gray-900/5'>  
              <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Download the database (605 molecules)</span>
              <ButtonGroup 
                fullWidth
                variant="outlined"
                size="md">
                    <Button
                    onClick={csvDownload}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"

                    >.csv</Button>
                    <Button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"

                    onClick={sdfDownload}
                    >.sdf</Button>
                </ButtonGroup>
            </Card>
        </div>
        
    );
};
export default OptionsDownloadButton;