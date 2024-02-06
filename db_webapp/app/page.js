import MoleculeGallery from "@components/MolGallery";
import { HomeCarousel } from "@components/WelcomeBox";
import prisma from "prisma/client";
import SidebarFilter from "@components/AdvanceSearch/SidebarFilter";
import { Suspense } from "react";

export default async function Home({lipinskiLimits}) {
  const itemsPerPage = 10;  
  
  try {
    // Fetch data from the database
    const molecules = await prisma.active_compounds.findMany({});
    
    return (
      <div>
        <div className="grid grid-rows-2 p-3" style={{ gridTemplateRows: '350px 1fr' }}>
        <div className="flex">
          <HomeCarousel></HomeCarousel>
        </div>
        <div>
          <div className="grid justify-center grid-cols-2" style={{ gridTemplateColumns: '600px 1fr' }}>
            <div className="justify-center py-6">
              <Suspense><SidebarFilter/></Suspense>
              
            </div>
            <Suspense><MoleculeGallery itemsPerPage={itemsPerPage} data={molecules} /></Suspense>
            
          </div>
        </div>
      </div>
      </div>
    );
  } catch (error) {
    // Handle any errors that may occur during database query
    console.error("Error fetching data:", error);
  } finally {
    // Close the PrismaClient instance to release resources
    await prisma.$disconnect();
  }
}


