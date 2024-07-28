import { TokenWithInfoV2Dto } from "@unique-nft/sdk";

// types.ts
export interface CreateCollectionParams {
    name: string;
    description: string;
    symbol: string;
    file: File;
  }
  
  export interface CreateCollectionResult {
    collectionId?: string;
    error?: string;
  }

  export interface GetCarParams {
    collectionId: string;
    tokenId: number;
  }
  
  export interface GetCarResult {
    car?: TokenWithInfoV2Dto;
    error?: string;
  }
