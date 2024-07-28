import { Polkadot } from '@unique-nft/utils/extension';
import { Signer } from "@unique-nft/sdk";

// Define enum of signer types
enum SignerTypeEnum {
  Local = 'Local',
  Polkadot = 'Polkadot',
  Metamask = 'Metamask'
}

interface Account {
  name: string;
  address: string;
  signerType: SignerTypeEnum;
  signer: Signer;
}

export const getPolkadotAccounts = async () => {
  try {
    console.log("Attempting to enable and load all wallets...");

    // Enable and load all wallets
    const { accounts } = await Polkadot.enableAndLoadAllWallets();

    console.log("Accounts loaded:", accounts);

    // Create a Map of accounts
    const accountsMap = new Map<string, Account>(
      accounts.map(({ name, address, signer }: { name: string, address: string, signer: Signer }) => {
        return [
          address, // address as map key
          {
            name,
            address,
            signerType: SignerTypeEnum.Polkadot,
            signer,
          }
        ];
      })
    );

    console.log("Accounts map created:", accountsMap);

    // Log account details to the console
    accounts.forEach((account: { name: string, address: string, signer: Signer }) => {
      console.log(`Name: ${account.name}`);
      console.log(`Address: ${account.address}`);
      console.log(`Signer: ${account.signer}`);
      console.log('-------------------');
    });

    return accountsMap;
  } catch (e: any) {
    if (e.extensionNotFound) {
      console.error('Please install some polkadot.js compatible extension');
    } else if (e.accountsNotFound) {
      if (e.userHasWalletsButHasNoAccounts) {
        console.error('Please, create an account in your wallet');
      } else if (e.userHasBlockedAllWallets) {
        console.error('Please, grant access to at least one of your accounts');
      }
    } else {
      console.error(`Connection to polkadot extension failed: ${e.message}`);
    }
  }
  return new Map();
};

// Call the function to get and log Polkadot accounts
getPolkadotAccounts().then((accountsMap) => {
  console.log("Final accounts map:", accountsMap);
}).catch((error) => {
  console.error("Error in getting Polkadot accounts:", error);
});
