// pages/documentation.js
"use client";
import React from 'react';
import { Card, Typography } from '@material-tailwind/react';
import GetAllDBButton from '@components/CompleteDownload';

const Documentation = () => {
  return (
    <div className='px-20'>
      <Card className='p-5 m-5'>
        <Typography variant='h1'>Introduction</Typography><br></br>
        <p style={{ textIndent: '1.5em' }}>
          Welcome to the documentation for our web application <strong>BIOMX-DB</strong>. This page will guide you through the key features and functionalities of the application.<br></br>
          BIOMX-DB was created to enhance the current <strong>curated</strong> Mexican natural product database <strong>BIOFACQUIM</strong>, which was last updated in 2023. Here you can find the most recent compilation of this dabase which currently holds over 605 molecules!<br></br>
          Molecular data is displayed in BIOMX-DB mainly in two ways:

            <li>By <strong>Molecular cards</strong>:<br></br> which contain only the most basic molecular information, like common name and source of extraction along with a picture of the molecule.</li>
            <li>By <strong>Molecular records</strong>:<br></br> which comprise all of the information known on the molecule, like the molecule´s physico-chemical characteristics, geographical data, its reference in scientific literature, the biological source of extraction, etc..</li>

        </p>
      </Card>

      <Card className='p-5 m-5'>
        <Typography variant='h1'>Features</Typography><br></br>
        <ul style={{ textIndent: '1.5em' }}>
          <li><strong>Molecular Gallery:</strong>
            <ul>
              <li>Intended for users to explore the database without a specific molecule in mind, the molecular gallery allows users to navigate through <strong>molecular cards</strong>.</li>
              <li>If the user wishes to expand on the cards, a click would allow the user to consult more information about the molecule by redirecting the user to the <strong>molecular record</strong>.</li>
              <li>This functionality prevails even through the search pages.</li>
            </ul>
          </li><br></br>

          <li><strong>Search by name:</strong>
            <ul>
              <li>Using the 'search by name' search bar, the user can find all records in BIOFACQUIM´s database that match the searched word with the common name of the molecule. This feature is not case sensitive.</li>
            </ul>
          </li><br></br>

          <li><strong>Search by source of extraction:</strong>
            <ul>
              <li>Find specific molecules in BIOFACQUIM's database based on the taxonomical kingdom of the organism from which the natural product was originally extracted.</li>
            </ul>
          </li><br></br>

          <li><strong>Search by potential bioactivity:</strong>
            <ul>
              <li>Find specific molecules in BIOFACQUIM's database based on their potential bioactivity. The bioactivities were determined by the molecules´ activities over certain receptors.</li>
              <li>For more details about the values of the reported activities, the cited referenced in the molecular record can be consulted.</li>
            </ul>
          </li><br></br>
          <li><strong>Search by chemical descriptors</strong>
            <ul>
              <li>Find specific molecules in BIOFACQUIM's database based on their Lipinki and Berg descriptors.</li>
              <li>To filter by physico-chemical descriptors just use the sliders to define the minimun and maximum desired values, and then click 'search'. All records complying with the selected criteria should appear in a few seconds</li>
            </ul>
          </li><br></br>

          <li><strong>Similarity Search:</strong>
            <ul>
              <li>By using the similarity search filter, users are redirected to a page where they can draw any desired molecule by using the molsoft plugin.</li>
              <li>Records in BIOFACQUIM's database are then retrieved in descending order according to the common scoring function 'Tanimoto coefficient'.</li>
              <li>Currently, the Tanimoto coefficient is calculated using MACCs fingerprints, but future releases plan to allow users to choose the type of molecular fingerprint to use.</li>
            </ul>
          </li>
        </ul>
      </Card>

      <Card className='p-5 m-5'>
        <Typography variant='h2'>BIOFACQUI's Data Curation Process</Typography>
        <p><br></br>
          The database for BIOMX DB was based on BIOFACQUIM´s latest dataset release (2023)  which comprises a 605-compound version instead of the 400-version released in 2019. 
          Downloaded from: https://www.difacquim.com/d-databases/ <br></br>
          This dataset was enriched by calculating each molecule´s Lipinski and Berg Descriptors along with their corresponding fingerprints in the form of MACCS keys. The two-dimensional descriptors and the fingerprints were calculated using RDKit as it is described in the python library documentation
          Since MongoDB was chosen as a storage platform, and it stores documents in the form of keys and values, the entries of the CSV file had to be transformed into JSON objects. </p>
          <GetAllDBButton></GetAllDBButton>  
      </Card>


      <Card className='p-5 m-5'>
        <Typography variant='h2'>How to cite us </Typography>
        <p>You can find all scripts and github code in the published paper at:</p>
        <ol>
          <li>chemarchive: doi:XXXXXX</li>
        </ol><br></br>
        <p>Additionally please cite the original paper where BIOFACQUIM was firstly introduced</p>
        <ol>
          <li>
            <a className='hover:text-blue-500' href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6358837/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer', borderBottom: '1px solid transparent', transition: 'color 0.3s, border-bottom 0.3s' }}>
              B. A. Pilón-Jiménez, F. I. Saldívar-González, B. I. Díaz-Eufracio, and J. L. Medina-Franco, “BIOFACQUIM: A Mexican compound database of natural products,” Biomolecules, vol. 9, no. 1, 2019, doi: 10.3390/biom9010031
            </a>
          </li>
        </ol>
      </Card>
    </div>
  );
};

export default Documentation;
