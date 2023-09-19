import MoleculeGallery from "@components/MolGallery";
import { PrismaClient } from "@prisma/client";

export default async function Home() {
  const itemsPerPage = 20;
  
  // Initialize a new instance of PrismaClient
  const prisma = new PrismaClient();

  try {
    // Fetch data from the database
    const molecules = await prisma.active_compounds.findMany({});
    
    return (
      <main>
        <div className="flex right-0 ml-80 pl-60">
          <MoleculeGallery itemsPerPage={itemsPerPage} data={molecules} />
        </div>
      </main>
    );
  } catch (error) {
    // Handle any errors that may occur during database query
    console.error("Error fetching data:", error);
  } finally {
    // Close the PrismaClient instance to release resources
    await prisma.$disconnect();
  }
}

