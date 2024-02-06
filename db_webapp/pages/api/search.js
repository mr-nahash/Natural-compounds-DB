//Import the PrismaClient constructor from the @prisma/client node module
import prisma from 'prisma/client';
import cuid from 'cuid';

export default async function handler(req, res) {

  if (req.method === "GET") {
    try {
      const {
        name,
        kingdom,
        bioactivity,
        minMW,
        maxMW,
        minLogP,
        maxLogP,
        minHBD,
        maxHBD,
        minHBA,
        maxHBA,
        minTPSA,
        maxTPSA,
        minRB,
        maxRB,
      } = req.query;

      /**
       * Build the filter object based on the provided query parameters
       */
      const filter_name = {};
      const filter_origin = {};
      const filter_lipinski = {};
      const filter_bioactivity ={};

      if (name) {
        filter_name.name = {
          contains: name,
          mode: "insensitive",
        };
      }
      if (bioactivity) {
        filter_bioactivity.bioactivity = {
          contains: bioactivity,
          mode: "insensitive",
        };
      }

      if (kingdom) {
        filter_origin.origin = {
          is: {
            kingdom: {
              contains: kingdom,
              mode: "insensitive",
            },
          },
        };
      }


      
      function isValidNumber(value) {
        return !isNaN(parseFloat(value)) && value !== null;
      }
      // Create the lipinski object if it doesn't exist
      // Create the lipinski object if it doesn't exist
      if (
        isValidNumber(minMW) &&
        isValidNumber(maxMW) &&
        isValidNumber(minLogP) &&
        isValidNumber(maxLogP) &&
        isValidNumber(minHBD) &&
        isValidNumber(maxHBD) &&
        isValidNumber(minHBA) &&
        isValidNumber(maxHBA) &&
        isValidNumber(minTPSA) &&
        isValidNumber(maxTPSA) &&
        isValidNumber(minRB) &&
        isValidNumber(maxRB)
      ) {
          filter_lipinski.lipinski = {
          is:{
              HBA: { gte: (minHBA), lte: (maxHBA) },
          }},
          filter_lipinski.lipinski={
            is:{
              HBD: { gte: parseInt(minHBD), lte: parseInt(maxHBD) },
            }
          },
          filter_lipinski.lipinski={
            is:{
              LogP: { gte: parseFloat(minLogP), lte: parseFloat(maxLogP) },
            }
          },
          filter_lipinski.lipinski={
            is:{
              TPSA: { gte: parseFloat(minTPSA), lte: parseFloat(maxTPSA) },
            }
          },
          filter_lipinski.lipinski={
            is:{
              RB: { gte: parseInt(minRB), lte: parseInt(maxRB) },
            }
          },
          filter_lipinski.lipinski={
            is:{
              MW: { gte: parseFloat(minMW), lte: parseFloat(maxMW) },
            }
          }
      }
      /**
       * Search molecules
       */
      const molecules = await prisma.active_compounds.findMany({
        where: {
          OR: [
            filter_name,
            filter_origin,
            filter_bioactivity,
            {AND:[filter_lipinski]}
          ],
        },
      });

      /**
       * Save search words typed into the search bar
       */
      await prisma.searchQuery.create({
        data: {
          id: cuid(),
          query: JSON.stringify(req.query),
        },
      });

      res.status(200).json({ molecules });
    } catch (error) {
      console.log(error);
      res.status(500).end();
    } 
    finally {
      // Close the PrismaClient instance to release resources
      await prisma.$disconnect();
    }
  }
}
