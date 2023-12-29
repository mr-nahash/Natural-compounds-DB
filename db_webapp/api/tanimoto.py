from flask import Flask, request, jsonify
import prisma
import json
import subprocess

app = Flask(__name__)

# Prisma client initialization
prisma = prisma.Prisma()  # Adjust connection details as needed

@app.route('/api/tanimoto', methods=['POST'])
def calculate_tanimoto():
  try:
    smiles = request.json.get('smiles')

    # Fetch database fingerprints
    database_fingerprints = prisma.active_compounds.find_many(
      select={
        'id': True,
        'fingerprint': {
          select: {
            'MACCS': True,
          },
        },
      }
    )

    # Create temporary file for JSON data
    with open('temp.json', 'w') as f:
      json.dump(database_fingerprints, f)

    # Call Python script using subprocess
    result = subprocess.run(
      ['python', 'python_scripts/tanimoto_table.py', smiles],
      input=json.dumps(database_fingerprints),
      capture_output=True,
      text=True
    )

    if result.returncode == 0:
      tanimoto_results = json.loads(result.stdout)
      molecule_ids = list(tanimoto_results.keys())

      # Retrieve molecules from database
      molecules = prisma.active_compounds.find_many(
        where={
          'id': {
            in_: molecule_ids
          }
        }
      )

      # Combine tanimoto scores and molecule data
      tanimoto_with_molecules = [
        {
          'tanimoto': tanimoto_results[molecule.id],
          'molecule': molecule
        }
        for molecule in molecules
      ]

      return jsonify(tanimoto_with_molecules)
    else:
      return jsonify({'error': 'tanimoto score failed'}), 500

  except Exception as e:
    return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
  app.run(debug=True)  # Adjust for production environment
