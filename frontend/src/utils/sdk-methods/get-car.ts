import { useContext, useState } from "react";
import { connectSdk } from "../connect-sdk";
import { GetCarParams, GetCarResult } from "./types";
import { TokenWithInfoV2Dto } from "@unique-nft/sdk";

export const useGetCar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [car, setCar] = useState<TokenWithInfoV2Dto| null>(null);

  const getCar = async ({
    collectionId,
    tokenId
  }: GetCarParams): Promise<GetCarResult> => {
    setLoading(true);
    setError(null);

    try {
      const { sdk } = await connectSdk();
      const carDetails = await sdk.token.getV2({ collectionId, tokenId })
      
      setCar(carDetails);
      return { car: carDetails };
    } catch (error: any) {
      setError(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { getCar, loading, error, car };
};