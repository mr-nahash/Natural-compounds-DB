import sys
import rdkit

def calculate_tanimoto_coefficient(smiles_1, smiles_2):
  """Calculates the Tanimoto coefficient between two SMILES strings.

  Args:
    smiles_1: The first SMILES string.
    smiles_2: The second SMILES string.

  Returns:
    The Tanimoto coefficient between the two SMILES strings.
  """

  molecule_1 = rdkit.Chem.MolFromSmiles(smiles_1)
  molecule_2 = rdkit.Chem.MolFromSmiles(smiles_2)

  fingerprint_1 = rdkit.Chem.RDKFingerprint(molecule_1)
  fingerprint_2 = rdkit.Chem.RDKFingerprint(molecule_2)

  tanimoto_coefficient = rdkit.Chem.TanimotoSimilarity(fingerprint_1, fingerprint_2)

  return tanimoto_coefficient

if __name__ == '__main__':
  user_smiles = sys.argv[1]
  database_smiles = sys.argv[2]

  tanimoto_coefficient = calculate_tanimoto_coefficient(user_smiles, database_smiles)

  print(tanimoto_coefficient)