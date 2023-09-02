import prisma from "../../prisma/client";
import MoleculeGallery from "@components/Pagination";

export default async function Home() {

  const itemsPerPage = 20;
  const molecules = await prisma.active_compounds.findMany({});
  
  return (
    <main>
      <div className="flex right-0 ml-80 pl-60">
        <MoleculeGallery itemsPerPage={itemsPerPage} data={molecules} />
      </div>
    </main>
  );
}
