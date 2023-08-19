//Import the PrismaClient constructor from the @prisma/client node module
import { Prisma, PrismaClient } from "@prisma/client";
import { active_compounds } from "@prisma/client";
import cuid from 'cuid';


export default async function handler(req, res) {
  const prisma=new PrismaClient()
  if (req.method === "GET") {
    try {
      const { q: query } = req.query;

      if (typeof query !== "string") {
        throw new Error("Invalid request");
      }

      /**
       * Search molecule Index by name
       */
      const molecules = await prisma.active_compounds.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
      });

      /**
       * Save search
       */
      await prisma.searchQuery.create({
        data: {
          id: cuid(),
          query
        },
      });

      res.status(200).json({ molecules });
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  }
};

