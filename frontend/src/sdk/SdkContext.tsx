import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ChainPropertiesResponse } from "@unique-nft/sdk";
import { Sdk, CHAIN_CONFIG } from "@unique-nft/sdk/full";
import { Sr25519Account } from "@unique-nft/sr25519";

export type SdkContextValueType = {
  sdk: Sdk | undefined;
  chainProperties: ChainPropertiesResponse | undefined;
};

export const SdkContext = createContext<SdkContextValueType>({
  sdk: undefined,
  chainProperties: undefined,
});

const baseUrl = CHAIN_CONFIG.opal.restUrl;

export const SdkProvider = ({ children }: PropsWithChildren) => {
  const [sdk, setSdk] = useState<Sdk>();
  const [chainProperties, setChainProperties] =
    useState<ChainPropertiesResponse>();

  useEffect(() => {
    const account = Sr25519Account.fromUri(
     process.env.REACT_APP_MNEMONIC as string
    );

    const sdk = new Sdk({
      baseUrl,
      account,
    });
    setSdk(sdk);

    void (async () => {
      const chainProperties = await sdk?.common.chainProperties();
      setChainProperties(chainProperties);
    })();
  }, []);

  return (
    <SdkContext.Provider
      value={useMemo(() => ({ sdk, chainProperties }), [sdk, chainProperties])}
    >
      {children}
    </SdkContext.Provider>
  );
};
