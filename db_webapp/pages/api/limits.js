import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).end(); // Method Not Allowed
  }

  try {
    // Fetch and calculate the descriptor limits from your Prisma models
    const descriptorLimits = await calculateDescriptorLimits(); // Define this function

    res.status(200).json(descriptorLimits);
  } catch (error) {
    console.error('Error fetching descriptor limits:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Define your function to calculate descriptor limits from Prisma models
async function calculateDescriptorLimits() {
    const prisma=new PrismaClient()
    const descriptors = [
    'HBA', 'HBD', 'LogP', 'MW', 'RB', 'TPSA'
  ];

  const descriptorLimits = {};

  for (const descriptor of descriptors) {
    const minMax = await prisma.active_compounds.findMany({
      orderBy: {
        lipinski: {
          [descriptor]: 'asc'
        }
      }
    });

    if (minMax.length > 0) {
        const descriptorValues = minMax.map(item => item.lipinski[descriptor]);
        descriptorLimits[descriptor] = {
          min: Math.min(...descriptorValues),
          max: Math.max(...descriptorValues)
        };
      }
  }


  return descriptorLimits;
}

