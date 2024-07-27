import { useCallback, useContext, useEffect, useState } from "react";
import { AccountsContext } from "../accounts/AccountsContext";
import { Account } from "../accounts/types";
import { List } from "../components/List";
import { CreateLocalAccountModal } from "../modals/CreateLocalAccountModal";
import { SignMessageModal } from "../modals/SignMessageModal";
import { TransferAmountModal } from "../modals/TransferAmountModal";
import { SdkContext } from "../sdk/SdkContext";

export const TestPage = () => {
  const { accounts, fetchPolkadotAccounts,  } = useContext(AccountsContext);
  const account = Array.from(accounts.values());
  const [currentAccount, setCurrentAccount] = useState<Account>();
  const [transferAmountIsVisible, setTransferAmountIsVisible] = useState(false);
  const [signMessageIsVisible, setSignMessageIsVisible] = useState(false);
  const [createAccountIsVisible, setCreateAccountIsVisible] = useState(false);
  const { sdk } = useContext(SdkContext);

  useEffect(() => {
    setCurrentAccount(account[0]);
  });

  const test = sdk?.nfts.account;
  console.log(test)

  return (
    <div className="page">
      <div className="top-bar">
        {currentAccount ? (
          <div>
            <h1>{currentAccount.name}</h1>
            <h1>{currentAccount.address}</h1>
            <h1>{currentAccount.balance?.toFixed(2) || "0"}</h1>
            <button onClick={async () => {
            }}>Create new collection? (test)</button>
          </div>
        ) : (
          <button onClick={fetchPolkadotAccounts}>
            Connect Polkadot Wallet
          </button>
        )}
      </div>

      {/* <TransferAmountModal 
      isVisible={transferAmountIsVisible} 
      sender={currentAccount}
      onClose={onCloseTransferAmount}
    />
    <SignMessageModal 
      isVisible={signMessageIsVisible} 
      account={currentAccount}
      onClose={onCloseSignMessage}
    />
    <CreateLocalAccountModal 
      isVisible={createAccountIsVisible} 
      onClose={onCloseCreateAccount}
    /> */}
    </div>
  );
};
