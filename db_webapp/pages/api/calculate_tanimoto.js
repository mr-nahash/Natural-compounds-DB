import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { smiles } = req.body;

      // Initialize a new instance of PrismaClient
      const prisma = new PrismaClient();

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

      // Close the Prisma client instance to release resources
      await prisma.$disconnect();

      // Create a temporary file to store the JSON data
      const tempFilePath = path.join(__dirname, 'temp.json');
      fs.writeFileSync(tempFilePath, JSON.stringify(databaseFingerprints));

      // Spawn the Python script and pass the path to the temporary file as an argument
      const pythonProcess = spawn('python', [
        'python_scripts\\tanimoto_table.py',
        smiles,
        tempFilePath, // Pass the path to the temporary JSON file
      ]);

      console.log('Python script execution started...');

      let tanimoto = '';

      pythonProcess.stdout.on('data', (data) => {
        tanimoto += data;
      });

      // Create a promise to await the child process completion
      const processPromise = new Promise((resolve, reject) => {
        pythonProcess.on('close', async (code) => {
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
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
