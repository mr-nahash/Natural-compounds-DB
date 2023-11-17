//Import the PrismaClient constructor from the @prisma/client node module
import { PrismaClient } from "@prisma/client";
import MoleculeRecord from "@components/MolRecord";
import SidebarFilter from "@components/AdvanceSearch/SidebarFilter";

export default async function Page({ params }) {
  const prisma = new PrismaClient()
  const molecule = await prisma.active_compounds.findUnique({
    where: {
      id: params.id,
    },
  })
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
  };