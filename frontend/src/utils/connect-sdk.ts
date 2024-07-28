import { Sdk, CHAIN_CONFIG } from "@unique-nft/sdk/full";
import { Sr25519Account } from "@unique-nft/sr25519";
import * as dotenv from 'dotenv';
dotenv.config();

const getConfig = () => {
  const { MNEMONIC } = process.env;
  if (!MNEMONIC) throw Error('Create .env from .env-example and set MNEMONIC env');
  return { mnemonic: MNEMONIC };
};

const config = getConfig();

const connectSdk = async () => {
  const account = Sr25519Account.fromUri(config.mnemonic);

  const sdk = new Sdk({
    baseUrl: CHAIN_CONFIG.opal.restUrl, 
    account,
   });

  return { account, sdk };
};

module.exports = { connectSdk };
