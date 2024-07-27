import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SdkContext } from "../sdk/SdkContext";
import { SignByLocalSignerModalContext } from "../signModal/SignByLocalSignerModalContext";
import { noop } from "../utils/common";
import { getLocalAccounts, getMetamaskAccount, getPolkadotAccounts } from "./AccountsManager";
import { Account, AccountsContextValue } from "./types";

export const AccountsContext = createContext<AccountsContextValue>({
  accounts: new Map(),
  setAccounts: noop,
  fetchPolkadotAccounts: noop,
});

export const AccountsContextProvider = ({ children }: PropsWithChildren) => {
  const [accounts, setAccounts] = useState<Map<string, Account>>(new Map());
  const { openModal } = useContext(SignByLocalSignerModalContext);
  const { sdk } = useContext(SdkContext);



  const fetchPolkadotAccounts = useCallback(async () => {
    if (!sdk) return;
    const polkadotAccounts = await getPolkadotAccounts();
    for (let [address, account] of polkadotAccounts) {
      const balanceResponse = await sdk.balance.get({ address });
      account.balance = Number(balanceResponse.availableBalance.amount);
      polkadotAccounts.set(address, account);
    }
    const accountsToUpdate = new Map([...accounts, ...polkadotAccounts]);
    setAccounts(accountsToUpdate);
  }, [sdk, accounts]);

  useEffect(() => {
    fetchPolkadotAccounts();
  }, [sdk])

  const contextValue = useMemo(() => ({
    accounts,
    setAccounts,
    fetchPolkadotAccounts,
  }), [accounts, fetchPolkadotAccounts]);

  return <AccountsContext.Provider value={contextValue}>{children}</AccountsContext.Provider>;
}