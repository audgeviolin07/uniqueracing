const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

const uploadToPinata = async (filePath) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const data = new FormData();
  data.append('file', fs.createReadStream(filePath));

  const response = await axios.post(url, data, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      'pinata_api_key': PINATA_API_KEY,
      'pinata_secret_api_key': PINATA_SECRET_API_KEY
    }
  });

  return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
};

module.exports = { uploadToPinata };
