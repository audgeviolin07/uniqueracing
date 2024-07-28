import { Sdk } from "@unique-nft/sdk/full";

export default function getCollection(sdk: Sdk | undefined) {
  // const { walletAddress } = req.body;
  // console.log('Fetching collections for wallet address:', walletAddress);

  // try {
  //   console.log('Finding collections in database');
  //   console.log(walletAddress)
  //   const collections = await Collection.find({ owner: walletAddress }).lean();
  //   console.log('Collections found:', collections);

  //   console.log('Fetching cars for each collection');
  //   const collectionsWithCars = await Promise.all(collections.map(async (collection) => {
  //     try {
  //       const cars = await Car.find({ collectionId: mongoose.Types.ObjectId(collection.collectionId) }).lean();
  //       console.log('Cars found for collection:', collection.collectionId, cars);
  //       return { ...collection, cars: cars || [] };
  //     } catch (carError) {
  //       console.error(`Failed to fetch cars for collection ${collection.collectionId}:`, carError.message);
  //       return { ...collection, cars: [] }; // Handle this case gracefully
  //     }
  //   }));

  //   console.log('Fetched collections with cars from DB:', collectionsWithCars);
  //   res.json({ collections: collectionsWithCars });
  // } catch (error) {
  //   console.error('Failed to fetch collections:', error.message);
  //   console.error(error.stack);
  //   res.status(500).json({ error: 'Failed to fetch collections' });
  // }
}