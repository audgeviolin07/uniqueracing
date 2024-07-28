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
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className="page flex-vertical">
        <div className="uniquerace">uniquerace</div>
        <div className="columns">
          <div className="column"></div>
          <div className="column center">
            <div className="white-box">
              <div className="uniqueracemini">collections</div>
              <button onClick={toggleMenu}>show collections</button>
              <button>create collection</button>
              {showMenu && (
                <div className="menu">
                  <ul>
                    <li>Collection 1</li>
                    <li>Collection 2</li>
                    <li>Collection 3</li>
                  </ul>
                </div>
              )}
            </div>
            <Logo />
            <div className="white-box">
              <div className="uniqueracemini">my nft racecar</div>
              <button className="nft-box">
              <img src="racecar.png" alt="Top Image" className="top-image" />
              </button>
             
            </div>
            <div className="play-button">
              {currentAccount ? (
                <Link to="/game">
                  <button>play</button>
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
