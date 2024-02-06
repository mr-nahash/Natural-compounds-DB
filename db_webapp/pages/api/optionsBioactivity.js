import prisma from "prisma/client";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const bioactivityOptions = await fetchBioactivityOptions();
    res.status(200).json(bioactivityOptions);
  } catch (error) {
    console.error('Error fetching origin options:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function fetchBioactivityOptions() {
    try {
      const allCompounds = await prisma.active_compounds.findMany({
        select: {
          bioactivity: true
        },
      });
  
      // Split each bioactivity option into words
      const bioactivityWords = allCompounds
        .flatMap(compound => compound.bioactivity ? compound.bioactivity.split(' ') : [])
        .filter(word => word !== null && word !== undefined && word !== '');
  
      // Deduplicate and return the result
      const uniqueBioactivity = Array.from(new Set(bioactivityWords));
      return uniqueBioactivity;
    } catch (error) {
      console.error('Error fetching kingdom options:', error);
      throw error;
    }
  }