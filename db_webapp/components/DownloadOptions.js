"use clien";
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
            <div className="relative flex justify-center w-max flex-col gap-4">
                <ButtonGroup 
                variant="outlined">
                    <Button
                    className="p4"
                    onClick={csvDownload}
                    >.csv</Button>
                    <Button
                    className="p4"
                    onClick={sdfDownload}
                    >.sdf</Button>
                </ButtonGroup>
            </div>        
    );
};
export default OptionsDownloadButton;