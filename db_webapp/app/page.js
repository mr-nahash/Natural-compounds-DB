import prisma from "../prisma/client";
import MoleculeInfo from "@components/MoleculePrisma";


export default async function Home() {
  const molecules = await prisma.active_compounds.findMany({});

  return (
    <main>
      <div className="grid grid-cols-3 mx-80 my-0 pr-0">
        <MoleculeInfo molecules={molecules} />
      </div>
    </main>
    
  );
};