import { useContext, useState } from "react";
import { SdkContext } from "../../sdk/SdkContext";
import { uploadToPinata } from "../../utils/upload-to-pinata";
import { connectSdk } from "../connect-sdk";
import { CreateCollectionParams, CreateCollectionResult } from "./types";

export const useCreateCollection = () => {
  const { sdk } = useContext(SdkContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [collectionId, setCollectionId] = useState<number | null>(null);

  const createCollection = async ({
    name,
    description,
    symbol,
    file,
  }: CreateCollectionParams): Promise<CreateCollectionResult> => {
    setLoading(true);
    setError(null);

    try {
      const imageUrl = await uploadToPinata(file);
      const { account, sdk } = await connectSdk();

      const { parsed } = await sdk.collection.createV2({
        name,
        description,
        symbol,
        cover_image: { url: imageUrl },
        permissions: { nesting: { collectionAdmin: true } },
        encodeOptions: {
          overwriteTPPs: [
            {
              key: 'tokenData',
              permission: {
                collectionAdmin: true,
                tokenOwner: false,
                mutable: true,
              },
            },
          ],
        },
      });

      if (!parsed) {
        throw new Error('Cannot create collection');
      }

      setCollectionId(parsed.collectionId);
      return { collectionId: parsed.collectionId.toString() };
    } catch (error: any) {
      setError(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { createCollection, loading, error, collectionId };
};
