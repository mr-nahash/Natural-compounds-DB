import prisma from "prisma/client";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const originOptions = await fetchOriginOptions();
    res.status(200).json(originOptions);
  } catch (error) {
    console.error('Error fetching origin options:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function fetchOriginOptions() {
    try {
      const allCompounds = await prisma.active_compounds.findMany({
        select: {
          origin: {
            select: {
              kingdom: true,
            },
          },
        },
      });
  
      const uniqueKingdoms = Array.from(new Set(allCompounds.map(compound => compound.origin.kingdom)));
      return uniqueKingdoms;
    } catch (error) {
      console.error('Error fetching kingdom options:', error);
      throw error;
    }
  }