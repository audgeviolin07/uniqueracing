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
  