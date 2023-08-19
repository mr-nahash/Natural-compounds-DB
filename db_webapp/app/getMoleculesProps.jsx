import { getMolecules } from "@lib/mongo/molecules_collection";

//The first function, fetchMolecules(), is an asynchronous function that 
//fetches a list of molecules from the database. The function first calls 
//the getMolecules() function, which is a helper function that is provided 
//by the @lib/mongo/molecules_collection module. The getMolecules() function 
//returns an array of molecules.

async function fetchMolecules() {
  const {molecules} = await getMolecules();
  if (!molecules) throw new Error('Failed to fetch molecules');

  return molecules
}
//getMoleculesProps(), is an asynchronous function that returns the props for the 
//HomePage component. The function first calls the fetchMolecules() function and 
//assigns the result to the molProp variable. The molProp variable will contain an 
//array of molecules if the fetchMolecules() function successfully fetches the molecules. Otherwise, the molProp variable will contain an empty array.
//The getMoleculesProps() function then returns an object with the props property. 
//The props property contains the molProp variable. This means that the HomePage 
//component can access the array of molecules by using the molProp prop.

export async function getMoleculesProps() {
  try {
    const molProp = await fetchMolecules();
    console.log('Molecules fetched successfully');

    return {
      props: {
        molProp, // Do not extract molecules until they are fetched
      },
    };
  } catch (error) {
    console.error(error); // Log the error for debugging purposes

    return {
      props: {
        molProp: [], // Return an empty array if an error occurs
      },
    };
  }
  //The molProp variable will be an array. The props variable will be an object.
}
