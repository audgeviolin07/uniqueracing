import { useCallback, useContext, useEffect, useState } from "react";
import { AccountsContext } from "../accounts/AccountsContext";
import { Account } from "../accounts/types";
import { List } from "../components/List";
import { CreateLocalAccountModal } from "../modals/CreateLocalAccountModal";
import { SignMessageModal } from "../modals/SignMessageModal";
import { TransferAmountModal } from "../modals/TransferAmountModal";
import { Logo } from "./logo";

export const AccountsPage = () => {
  const { accounts, fetchPolkadotAccounts } = useContext(AccountsContext);
  const account = Array.from(accounts.values());
  const [currentAccount, setCurrentAccount] = useState<Account>();
  const [transferAmountIsVisible, setTransferAmountIsVisible] = useState(false);
  const [signMessageIsVisible, setSignMessageIsVisible] = useState(false);
  const [createAccountIsVisible, setCreateAccountIsVisible] = useState(false);

  useEffect(() => {});

  const onSend = useCallback(
    (account: Account) => () => {
      setCurrentAccount(account);
      setTransferAmountIsVisible(true);
    },
    []
  );

  const onCloseTransferAmount = useCallback(() => {
    setCurrentAccount(undefined);
    setTransferAmountIsVisible(false);
  }, []);

  const onSignMessage = useCallback(
    (account: Account) => () => {
      setCurrentAccount(account);
      setSignMessageIsVisible(true);
    },
    []
  );

  const onCreateAccountClick = useCallback(() => {
    setCreateAccountIsVisible(true);
  }, []);

  const onCloseSignMessage = useCallback(() => {
    setCurrentAccount(undefined);
    setSignMessageIsVisible(false);
  }, []);

  const onCloseCreateAccount = useCallback(() => {
    setCreateAccountIsVisible(false);
  }, []);

  return (
    <div className="page">
      return{" "}
      <div className="page flex-vertical">
        <div className="connect-bar flex-vertical">
          <button onClick={fetchPolkadotAccounts}>
            Connect Polkadot Wallet
          </button>
          <button onClick={onCreateAccountClick}>Create local account</button>
        </div>
        {currentAccount ? (
          <div>
            <h1>{currentAccount.name}</h1>
            <h1>{currentAccount.address}</h1>
            <h1>{currentAccount.balance?.toFixed(2) || "0"}</h1>
          </div>
        ) : (
          <button onClick={fetchPolkadotAccounts}>
            Connect Polkadot Wallet
          </button>
        )}
        <Logo />
        <TransferAmountModal
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
        />
      </div>
      ;
    </div>
  );
};
