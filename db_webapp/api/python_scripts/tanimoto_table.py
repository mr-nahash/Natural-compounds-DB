import os
import sys
import json
import logging
from rdkit import Chem
from rdkit.Chem import MACCSkeys
from rdkit import DataStructs

logging.basicConfig(filename='fingerprint_extraction.log', level=logging.DEBUG)

def extract_id_and_fingerprint(molecule_data):
    molecule_id = molecule_data["id"]
    db_maccs_string = molecule_data["fingerprint"]["MACCS"]
    return molecule_id, db_maccs_string

def calculate_tanimoto_coefficients(query_maccs, database_maccs_list):
    tanimoto_scores = {}

    for molecule_data in database_maccs_list:
        molecule_id, db_maccs_string = extract_id_and_fingerprint(molecule_data)
        db_maccs = DataStructs.CreateFromBitString(db_maccs_string)
        score = round(DataStructs.TanimotoSimilarity(query_maccs, db_maccs), 4)
        tanimoto_scores[molecule_id] = score

    return tanimoto_scores

if __name__ == "__main__":
    try:
        
        # Read JSON data from environment variable
        input_data = os.environ.get('DATABASE_FINGERPRINTS')
        database_fingerprints_list = json.loads(input_data)

        # smiles variable comes from molecule Edit view (from POST argument)
        smiles = sys.argv[1]

        # MACCS keys are obtained for the SMILES string drawn, the object is a BitVector
        query_maccs = MACCSkeys.GenMACCSKeys(Chem.MolFromSmiles(smiles))

        tanimoto_scores = calculate_tanimoto_coefficients(query_maccs, database_fingerprints_list)

        # Sort the scores in descending order by their values
        sorted_scores = dict(sorted(tanimoto_scores.items(), key=lambda item: item[1], reverse=True))

        # Print the sorted_scores as JSON
        print(json.dumps(sorted_scores))
    except Exception as e:
        logging.error(f"Error: {str(e)}")
