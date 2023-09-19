const Cheminformatics = require('cheminformatics');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function compareSMILESToDatabase(userSMILES) {
  // Fetch all molecules from the database
  const allMolecules = await prisma.molecule.findMany();

  const similarityTable = [];

  // Calculate Tanimoto coefficients for each molecule
  for (const molecule of allMolecules) {
    const databaseSMILES = molecule.smiles;

    // Calculate Tanimoto coefficient
    const tanimotoCoefficient = Cheminformatics.similarity.tanimoto(
      userSMILES,
      databaseSMILES
    );

    // Add the result to the similarity table
    similarityTable.push({
      moleculeId: molecule.id,
      moleculeName: molecule.name,
      tanimotoCoefficient,
    });
  }

  // Sort the similarity table in descending order
  similarityTable.sort((a, b) => b.tanimotoCoefficient - a.tanimotoCoefficient);

  // Return the sorted similarity table
  return similarityTable;
}

// Example usage:
const userSMILES = 'CCO'; // Replace with the user's SMILES input
compareSMILESToDatabase(userSMILES)
  .then((result) => {
    console.table(result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
