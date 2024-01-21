import prisma from 'prisma/client';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { smiles } = req.body;

      // Fetch database fingerprints from the Prisma client
      
      const databaseFingerprints = await prisma.active_compounds.findMany({
        select: {
          id: true,
          fingerprint: {
            select: {
              MACCS: true,
            },
          },
        },
      });
      
      // Get the current working directory of the Node.js process
      const projectRoot = process.cwd();

      // Create a temporary file to store the JSON data
      const tempFilePath = path.join(projectRoot, 'python_scripts/temp.json');
      fs.writeFileSync(tempFilePath, JSON.stringify(databaseFingerprints));
      
      // Log debugging information
      console.log('Temporary file path:', tempFilePath);
      
      // Construct absolute path to Python script
      const pythonScriptPath = path.join(projectRoot, 'python_scripts', 'tanimoto_table.py');
      
      const pythonExecutablePath = '/root/miniconda3/envs/rdkit_env/bin/python';

      // Spawn the Python script and pass the path to the temporary file as an argument
      const pythonProcess = spawn(pythonExecutablePath,[pythonScriptPath,smiles,tempFilePath, // Pass the path to the temporary JSON file
]);

      

      let tanimoto = '';

      pythonProcess.stdout.on('data', (data) => {
        tanimoto += data;
      });

      // Create a promise to await the child process completion
      const processPromise = new Promise((resolve, reject) => {
        pythonProcess.on('close', async (code) => {
          console.log('Python script execution started...',code);
          if (code === 0) {
            // Successfully calculated tanimoto score
            try {
              const tanimotoResults = JSON.parse(tanimoto);
              const moleculeIds = Object.keys(tanimotoResults);

              // Retrieve molecules by ID from the database
              const molecules = await prisma.active_compounds.findMany({
                where: {
                  id: {
                    in: moleculeIds,
                  },
                },
              });

              // Create a dictionary of molecules by ID for easier access
              const moleculesById = {};
              molecules.forEach((molecule) => {
                moleculesById[molecule.id] = molecule;
              });

              // Create an array of objects with the desired format
              const tanimotoWithMolecules = moleculeIds.map((id) => ({
                tanimoto: tanimotoResults[id],
                molecule: moleculesById[id],
              }));

              // Remove the temporary file
              fs.unlinkSync(tempFilePath);

              // Send the response with tanimoto scores and molecule information
              res.status(200).json(tanimotoWithMolecules);
            } catch (error) {
              reject(error);
            }
          } else {
            // Error occurred in the Python script
            reject(new Error('tanimoto score failed'));
          }
        });
      });

      // Wait for the child process to complete
      await processPromise;
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    finally {
      // Close the PrismaClient instance to release resources
      await prisma.$disconnect();
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}