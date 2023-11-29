//Import the PrismaClient constructor from the @prisma/client node module
import prisma from "prisma/client";
import MoleculeRecord from "@components/MolRecord";
import SidebarFilter from "@components/AdvanceSearch/SidebarFilter";

export default async function Page({ params }) {
  try {
    const molecule = await prisma.active_compounds.findUnique({
      where: {
        id: params.id,
      },
    });

    return (
      <div>
        <div className="grid justify-center grid-cols-2" style={{ gridTemplateColumns: '600px 1fr' }}>
          <div className="justify-center py-6 pl-8">
            <SidebarFilter></SidebarFilter>
          </div>
          <MoleculeRecord molecule={molecule} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle the error as needed
  }finally {
    // Close the PrismaClient instance to release resources
    await prisma.$disconnect();
  }
}