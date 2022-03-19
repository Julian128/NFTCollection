#### Generate Metadata for each Image    

import json

# Changes this IMAGES_BASE_URL to yours 
IMAGES_BASE_URL = "https://gateway.pinata.cloud/ipfs/QmNwN8H9SsPNFy69k4b85DkMdhPpRSEzT6VBR14ZqG88zZ/"
PROJECT_NAME = "NFTCollection"
NUMBER_OF_TOKENS = 100
for id in range(NUMBER_OF_TOKENS):

    token = {
        "image": IMAGES_BASE_URL + str(id) + '.png',
        "tokenId": id,
        "name": f'{PROJECT_NAME} {str(id)}',
        "attributes": [],
    }



    # print(text)
    with open(f'./metadata/jsonfiles/{str(id)}.json', 'w') as outfile:
        json.dump(token, outfile, indent=4)