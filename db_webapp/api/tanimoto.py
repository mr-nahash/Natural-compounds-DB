import prisma
import json
import subprocess
from http.server import BaseHTTPRequestHandler, HTTPServer

# Prisma client initialization
prisma_client = prisma.Prisma()  # Adjust connection details as needed

class RequestHandler(BaseHTTPRequestHandler):
    def _send_response(self, status_code, body):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(body).encode('utf-8'))

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        request_data = json.loads(post_data.decode('utf-8'))

        try:
            smiles = request_data.get('smiles')

            # Fetch database fingerprints
            database_fingerprints = prisma_client.active_compounds.find_many(
                select={
                    'id': True,
                    'fingerprint': {
                        'select': {
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

                # Retrieve molecules from the database
                molecules = prisma_client.active_compounds.find_many(
                    where={
                        'id': {
                            'in_': molecule_ids
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

                self._send_response(200, tanimoto_with_molecules)
            else:
                self._send_response(500, {'error': 'tanimoto score failed'})

        except Exception as e:
            self._send_response(500, {'error': str(e)})

if __name__ == '__main__':
    server_address = ('', 8000)  # Change the port as needed
    httpd = HTTPServer(server_address, RequestHandler)
    print('Server running...')
    httpd.serve_forever()
