import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

export const uploadToPinata = async (file: File): Promise<string> => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(url, formData, {
    headers: {
      'Content-Type': `multipart/form-data`,
      'pinata_api_key': PINATA_API_KEY!,
      'pinata_secret_api_key': PINATA_SECRET_API_KEY!
    }
  });

  return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
};
