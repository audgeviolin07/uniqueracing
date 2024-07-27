import { useCallback, useContext, useEffect, useState } from "react";
import { AccountsContext } from "../accounts/AccountsContext";
import { Account } from "../accounts/types";
import { List } from "../components/List";
import { CreateLocalAccountModal } from "../modals/CreateLocalAccountModal";
import { SignMessageModal } from "../modals/SignMessageModal";
import { TransferAmountModal } from "../modals/TransferAmountModal";
import { Logo } from "./logo";
import { Link } from "react-router-dom";

export const AccountsPage = () => {
  const { accounts, fetchPolkadotAccounts } = useContext(AccountsContext);
  const accountsArray = Array.from(accounts.values());
  const [currentAccount, setCurrentAccount] = useState<Account>();
  const [transferAmountIsVisible, setTransferAmountIsVisible] = useState(false);
  const [signMessageIsVisible, setSignMessageIsVisible] = useState(false);
  const [createAccountIsVisible, setCreateAccountIsVisible] = useState(false);

  useEffect(() => {
    // Add any necessary useEffect logic here
  }, []);

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
    <>
      <div className="page flex-vertical">
        <div className="connect-bar flex-vertical">
          <button onClick={fetchPolkadotAccounts}>Connect Polkadot Wallet</button>
          <button onClick={onCreateAccountClick}>Create local account</button>
        </div>
        {currentAccount ? (
          <div>
            <h1>{currentAccount.name}</h1>
            <h1>{currentAccount.address}</h1>
            <h1>{currentAccount.balance?.toFixed(2) || "0"}</h1>
          </div>
        ) : (
          <div className="uniquerace">uniquerace</div>
        )}
        <div className="columns">
          <div className="column"></div>
          <div className="column center">
            <div className="white-box">
              <img src="players.png" alt="Top Image" className="top-image" />
              <input type="text" placeholder="Enter text here" className="text-input" />
            </div>
            <Logo />
            <div className="white-box">
              <img src="players.png" alt="Top Image" className="top-image" />
              <input type="text" placeholder="Enter text here" className="text-input" />
            </div>
            <div className="play-button">
              <Link to="/game">
                <button>Let's Play</button>
              </Link>
            </div>
          </div>
          <div className="column"></div>
        </div>
      </div>
      <List>
        {accountsArray.map(account => {
          return (
            <List.Item key={account.address}>
              <span>{account.signerType}</span>
              <span>{account.name}</span>
              <span>{account.address}</span>
              <span>{account.balance?.toFixed(2) || '0'}</span>
              <button onClick={onSend(account)}>Send amount</button>
              <button onClick={onSignMessage(account)}>Sign message</button>
            </List.Item>
          );
        })}
      </List>
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
    </>
  );
};
