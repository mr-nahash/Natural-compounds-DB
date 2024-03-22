// pages/documentation.js
"use client";
import React from 'react';
import { Button, Card, Typography } from '@material-tailwind/react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import OptionsDownloadButton from '@components/DownloadOptions';


// Create styles for PDF rendering
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20,
  },
  section: {
    marginBottom: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold', // Set subtitles to bold
    marginBottom: 0,
  },
  paragraph: {
    fontSize: 12,
    lineHeight: 1,
  },
});

// Create Document Component
// Create Document Component for PDF
const MyDoc = ({ content }) => {
  if (!content) {
    console.error("MyDoc: Empty content provided!");
    return null;
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {content.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.title}>{section.section}</Text>
            <Text style={styles.paragraph}>{section.content}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

const DownloadPDFButton = ({ content }) => {
  const handleDownload = async () => {
    const pdfDoc = <MyDoc content={content} />;
    const blob = await pdf(pdfDoc).toBlob();
    saveAs(blob, 'BIOMX-DB_user_manual.pdf');
  };

  return (
    <Button
      className="rounded-full bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 shadow"
      onClick={handleDownload}
    >
      Download user manual (PDF)
    </Button>
  );
};

const Documentation = () => {
  const documentationContent = [
    { section: 'Introduction', content: `
    Welcome to the documentation for our web application BIOMX-DB. This page will guide you through the key features and functionalities of the application.

    BIOMX-DB was created to enhance the current curated Mexican natural product database BIOFACQUIM, which was last updated in 2023. Here you can find the most recent compilation of this database which currently holds over 605 molecules!

    Molecular data is displayed in BIOMX-DB mainly in two ways:
    - By Molecular cards: which contain only the most basic molecular information, like common name and source of extraction along with a picture of the molecule.
    - By Molecular records: which comprise all of the information known on the molecule, like the molecule's physico-chemical characteristics, geographical data, its reference in scientific literature, the biological source of extraction, etc.
  ` },
    { section: 'Features', 
    subtitle:'Molecular Gallery:',
    content: `
    - Intended for users to explore the database without a specific molecule in mind, the molecular gallery allows users to navigate through molecular cards.
    - If the user wishes to expand on the cards, a click would allow the user to consult more information about the molecule by redirecting the user to the molecular record.
    - This functionality prevails even through the search pages.
  
    Search by name:
    - Using the 'search by name' search bar, the user can find all records in BIOFACQUIM's database that match the searched word with the common name of the molecule. This feature is not case-sensitive.
  
    Search by source of extraction:
    - Find specific molecules in BIOFACQUIM's database based on the taxonomical kingdom of the organism from which the natural product was originally extracted.
  
    Search by potential bioactivity:
    - Find specific molecules in BIOFACQUIM's database based on their potential bioactivity. The bioactivities were determined by the molecules' activities over certain receptors.
    - For more details about the values of the reported activities, the cited referenced in the molecular record can be consulted.
  
    Search by chemical descriptors:
    - Find specific molecules in BIOFACQUIM's database based on their Lipinski and Berg descriptors.
    - To filter by physico-chemical descriptors just use the sliders to define the minimum and maximum desired values, and then click 'search'. All records complying with the selected criteria should appear in a few seconds.
  
    Similarity Search:
    - By using the similarity search filter, users are redirected to a page where they can draw any desired molecule by using the molsoft plugin.
    - Records in BIOFACQUIM's database are then retrieved in descending order according to the common scoring function 'Tanimoto coefficient'.
    - Currently, the Tanimoto coefficient is calculated using MACCs fingerprints, but future releases plan to allow users to choose the type of molecular fingerprint to use.
  ` },
    { section: 'BIOFACQUI\'s Data Curation Process', content: `
    The database for BIOMX DB was based on BIOFACQUIM's latest dataset release (2023) which comprises a 605-compound version instead of the 400-version released in 2019. 
    Downloaded from: https://www.difacquim.com/d-databases/
    
    This dataset was enriched by calculating each molecule's Lipinski and Berg Descriptors along with their corresponding fingerprints in the form of MACCS keys. The two-dimensional descriptors and the fingerprints were calculated using RDKit as it is described in the python library documentation.
    Since MongoDB was chosen as a storage platform, and it stores documents in the form of keys and values, the entries of the CSV file had to be transformed into JSON objects. 
  ` },
    { section: 'How to use the web application', content: `
      Instructions:
      1. Explore Molecular Data: Use the Molecular Gallery to browse through molecular cards and records. Click on any card to view detailed information about the molecule.
      2. Search Functionality: Utilize the search bar to find specific molecules by name, source of extraction, potential bioactivity, or chemical descriptors.
      3. Interact with Molecular Records: Click on any molecular record to explore comprehensive information about the molecule, including its physico-chemical characteristics, geographical data, and references in scientific literature.
      4. Utilize Additional Features: Explore features such as similarity search to find molecules based on molecular structure.
      5. Citation: If you use BIOMX-DB for your research, please cite our paper and the original paper introducing BIOFACQUIM.
    ` },
    { section: 'How to cite us', content: `
      You can find all scripts and GitHub code in the published paper at:
      1. Martínez-Urrutia, F., & Medina-Franco, J. L. (2024). BIOMX-DB: A web application for the BIOFACQUIM natural product database. https://doi.org/10.26434/CHEMRXIV-2024-M6716
      Additionally, please cite the original paper where BIOFACQUIM was firstly introduced:
      2. B. A. Pilón-Jiménez, F. I. Saldívar-González, B. I. Díaz-Eufracio, and J. L. Medina-Franco, “BIOFACQUIM: A Mexican compound database of natural products,” Biomolecules, vol. 9, no. 1, 2019, doi: 10.3390/biom9010031
    ` }
  ];
  
  
  return(
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
          <br></br>
            <p>
            The database for BIOMX DB was based on BIOFACQUIM´s latest dataset release (2023)  which comprises a 605-compound version instead of the 400-version released in 2019. 
            Downloaded from: https://www.difacquim.com/d-databases/ <br></br>
            This dataset was enriched by calculating each molecule´s Lipinski and Berg Descriptors along with their corresponding fingerprints in the form of MACCS keys. The two-dimensional descriptors and the fingerprints were calculated using RDKit as it is described in the python library documentation
            Since MongoDB was chosen as a storage platform, and it stores documents in the form of keys and values, the entries of the CSV file had to be transformed into JSON objects. 
            </p><br></br>
            <OptionsDownloadButton></OptionsDownloadButton>
        </Card>

        <Card className='p-5 m-5'>
        <Typography variant='h2'>How to cite us</Typography>
            <p>You can find all scripts and github code in the published paper at:</p>
            <ol style={{ listStyleType: 'disc' }}>
              <li>
                <a
                  className='...' // Keep other link styles
                  href='https://doi.org/10.26434/CHEMRXIV-2024-M6716'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span className='hover:text-blue-500'>  {/* Apply hover effect to span */}
                    Martínez-Urrutia, F., & Medina-Franco, J. L. (2024). BIOMX-DB: A web application for the BIOFACQUIM natural product database. https://doi.org/10.26434/CHEMRXIV-2024-M6716
                  </span>
                </a>
              </li>
            </ol>
        <br />
        <p>Additionally please cite the original paper where BIOFACQUIM was firstly introduced</p>
        <ol style={{ listStyleType: 'disc' }}>
              <li>
                <a
                  className='...' // Keep other link styles
                  href='https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6358837/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span className='hover:text-blue-500'>  {/* Apply hover effect to span */}
                  B. A. Pilón-Jiménez, F. I. Saldívar-González, B. I. Díaz-Eufracio, and J. L. Medina-Franco, “BIOFACQUIM: A Mexican compound database of natural products,” Biomolecules, vol. 9, no. 1, 2019, doi: 10.3390/biom9010031
                  </span>
                </a>
              </li>
            </ol>
      </Card>
      <div className="flex justify-center relative bottom-4 left-0 right-0">
      <DownloadPDFButton
        content={documentationContent}
      >
        Download User Manual (PDF)
      </DownloadPDFButton>
    </div>

    </div>
);
};

export default Documentation;
