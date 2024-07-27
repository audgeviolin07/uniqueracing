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
  const currentAccount = Array.from(accounts.values())[0];

  return (
    <>
      <div className="page flex-vertical">
      <div className="uniquerace">uniquerace</div>
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
              {currentAccount ? (
                <Link to="/game">
                  <button>Let's Play</button>
                </Link>
              ) : (
                <button onClick={fetchPolkadotAccounts}>
                  Connect Polkadot Wallet
                </button>
              )}
            </div>
          </div>
          <div className="column"></div>
        </div>
      </div>
    </>
  );
};
