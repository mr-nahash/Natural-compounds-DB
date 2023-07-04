import Image from "next/image";

const MoleculeInfo = ({ molecules }) => {
  return (
    <>
      {molecules.map((molecule) => (
        <div className="flex p-3 gap-4 my-3 rounded-xl border-[1px] border-zinc-600 w-3/4">
          <div>
            <Image
              data-smiles="OC(C(=O)O[C@H]1C[N+]2(CCCOC3=CC=CC=C3)CCC1CC2)(C1=CC=CS1)C1=CC=CS1"
              data-smiles-options="{ 'width': 800, 'height': 800 }" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold">{molecule.name}</span>
            <span className="text-lg font-light">Origin: {molecule.origin.kingdom}, {molecule.origin.genus}, {molecule.origin.species}</span>
            <span className="text-lg font-light"></span>
          </div>
        </div>
      ))}
    </>
  );
};

export default MoleculeInfo;