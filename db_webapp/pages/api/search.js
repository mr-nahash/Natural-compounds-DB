//Import the PrismaClient constructor from the @prisma/client node module
import { PrismaClient } from "@prisma/client";
import cuid from 'cuid';


export default async function handler(req, res) {
  const prisma=new PrismaClient()
  if (req.method === "GET") {
    try {
      const { name, kingdom } = req.query;

      /**
       * Build the filter object based on the provided query parameters
       */

      const filters = {};

      if (name) {
        filters.name = {
          contains: name,
          mode: "insensitive",
        };
      }

      if (kingdom) {
        filters.origin = {
          is: {
            kingdom: {
              contains: kingdom,
              mode: "insensitive",
            },
          },
        };
      }

      /**
       * Search posts
       */
      const molecules = await prisma.active_compounds.findMany({
        where: {
          OR: [filters],
        },
      });

      /**
       * Save search
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
    } finally {
      await prisma.$disconnect();}
  }
};

