import { RDKitModule } from "@rdkit/rdkit";

// Load the RDKit WASM module from a specific path on your server
const initRDKitModule = async () => {
  try {
    await window.initRDKitModule({
      locateFile: () => 'public/rdkit/rdkit_minimal.wasm',
    });

    // Ensure the RDKit module is ready before proceeding
    await RDKitModule.ready;

    // Log a message to confirm that the RDKit module is loaded
    console.log('RDKit module is ready');
  } catch (error) {
    console.error('Error loading RDKit module:', error);
    throw error; // Rethrow the error to be caught in the main handler
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { smiles } = req.body;
    // Check if 'smiles' key is present
    if (!smiles) {
      return res.status(400).json({ error: 'Missing "smiles" key in JSON' });
    }
    console.log('Received JSON:', req.body);

    // Load RDKit module before using it
    await initRDKitModule();

    // Call your RDKit module to get the Morgan fingerprint
    const morgan_fp = RDKitModule.get_morgan_fp(smiles);

    res.status(200).json({ morgan_fp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
