import { useState } from "react";
import { CreateCollectionResult } from "./types";

interface Collection {
  collectionId: string;
  name: string;
  description: string;
  symbol: string;
  coverImage: string;
  owner: string;
  cars: any[];
}

interface FetchCollectionsResult {
  collections?: Collection[];
  error?: string;
}

export const useFetchCollections = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [collections, setCollections] = useState<Collection[] | null>(null);

  const fetchCollections = async (walletAddress: string): Promise<FetchCollectionsResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/get-collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch collections');
      }

      const data = await response.json();
      setCollections(data.collections);
      return { collections: data.collections };
    } catch (error: any) {
      setError(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { fetchCollections, loading, error, collections };
};
