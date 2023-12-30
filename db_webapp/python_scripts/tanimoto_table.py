from flask import Flask, request, jsonify
import json
import logging
from rdkit import Chem
from rdkit.Chem import MACCSkeys
from rdkit import DataStructs

logging.basicConfig(filename='fingerprint_extraction.log', level=logging.DEBUG)

app = Flask(__name__)

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

@app.route('/api/tanimoto', methods=['POST'])
def calculate_tanimoto():
    try:
        smiles = request.json.get('smiles')

        # Access database fingerprints directly from request data
        database_fingerprints_list = request.json.get('database_fingerprints')

        query_maccs = MACCSkeys.GenMACCSKeys(Chem.MolFromSmiles(smiles))
        tanimoto_scores = calculate_tanimoto_coefficients(query_maccs, database_fingerprints_list)
        sorted_scores = dict(sorted(tanimoto_scores.items(), key=lambda item: item[1], reverse=True))

        return jsonify(sorted_scores)

    except Exception as e:
        logging.error(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)  # Adjust for production environment
