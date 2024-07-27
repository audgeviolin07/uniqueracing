const { Sdk, CHAIN_CONFIG } = require('@unique-nft/sdk/full');
const { Sr25519Account } = require('@unique-nft/sr25519');
const dotenv = require('dotenv');

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
