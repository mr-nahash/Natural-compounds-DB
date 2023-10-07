import requests

# Define the URL of your API endpoint
api_url = 'http://localhost:3000/api/calculate_fingerprint'  # Update with your actual URL

# Define the JSON payload to send in the POST request
payload = {
    'smiles': 'CCCCC'  # Update with your SMILES string
}

try:
    # Send the POST request
    response = requests.post(api_url, json=payload)

    # Check the response status code
    if response.status_code == 200:
        print('POST request was successful!')
        print('Response data:', response.json())
    else:
        print(f'POST request failed with status code: {response.status_code}')
        print('Response data:', response.text)

except Exception as e:
    print(f'An error occurred: {str(e)}')
