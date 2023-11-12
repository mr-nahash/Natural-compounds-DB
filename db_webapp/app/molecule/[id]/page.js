//Import the PrismaClient constructor from the @prisma/client node module
import { PrismaClient } from "@prisma/client";
import MoleculeRecord from "@components/MolRecord";

export default async function Page({ params }) {
  const prisma = new PrismaClient()
  const molecule = await prisma.active_compounds.findUnique({
    where: {
      id: params.id,
    },
  })
  return (
    <div className="flex justify-end items-start h-screen top-8">
    <div className="w-3/4">
      <MoleculeRecord molecule={molecule} />
    </div>
  </div>
  );
  };