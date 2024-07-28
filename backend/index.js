const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { connectSdk } = require('./utils/connect-sdk');
const { uploadToPinata } = require('./utils/upload-to-pinata');
const multer = require('multer');
const dotenv = require('dotenv');
const Collection = require('./models/Collection');
const Car = require('./models/Car');

dotenv.config(); // Make sure this is at the top

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

const PORT = process.env.PORT || 3001;

// Enable debug mode for Mongoose
mongoose.set('debug', true);

console.log('Connecting to MongoDB with URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    console.error('Check your MongoDB URI and ensure your IP address is whitelisted in MongoDB Atlas');
  });


// Endpoint to create a new collection
app.post('/api/create-collection', upload.single('image'), async (req, res) => {
  console.log('Create collection request received:', req.body);
  try {

    const { collectionId } = req.body;
    console.log('Collection created, ID:', collectionId);

    // Save collection to the database
    const newCollection = new Collection({
      collectionId,
      name: req.body.name,
      description: req.body.description,
      symbol: req.body.symbol,
      coverImage: req.body.url,
      owner: req.body.owner, // Assuming 'account' has the user's address
    });

    await newCollection.save();
    console.log('Collection saved to database:', newCollection);

    res.json({ collectionId });
  } catch (error) {
    console.error('Error creating collection:', error);
    res.status(500).json({ error: 'Failed to create collection' });
  }
});

// Returns the unique collection id
app.post("/api/get-car-collection", async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const collections = await Collection.find({ owner: walletAddress, name: "Racing Dreams" }).lean();
    res.json({ id: collections[0] });

  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: 'Failed to create car' });
  }
})

// Endpoint to create a car
app.post('/api/create-car', upload.single('image'), async (req, res) => {
  console.log('Create car request received:', req.body);
  try {
    console.log('Uploading image to Pinata:', req.file.path);
    const imageUrl = await uploadToPinata(req.file.path);
    console.log('Image uploaded to Pinata:', imageUrl);

    const { collectionId, walletAddress, name } = req.body;
    console.log('Connecting to SDK');
    const { account, sdk } = await connectSdk();
    console.log('SDK connected, account:', account);

    console.log('Creating car with SDK');
    const { parsed } = await sdk.token.createV2({
      collectionId,
      image: imageUrl,
      owner: walletAddress,
      attributes: [
        { trait_type: 'Name', value: name },
        { trait_type: 'Victories', value: 0 },
        { trait_type: 'Defeats', value: 0 },
      ],
    });

    if (!parsed) {
      console.error('Failed to parse car creation response');
      return res.status(500).json({ error: 'Cannot create car' });
    }

    const carTokenId = parsed.tokenId;
    console.log('Car created, Token ID:', carTokenId);

    console.log(req.body)

    // Save car to the database
    const newCar = new Car({
      carTokenId,
      collectionId: new mongoose.Types.ObjectId(parseInt(collectionId)), // Convert to ObjectId
      name,
      image: imageUrl,
      owner: walletAddress,
      victories: 0,
      defeats: 0,
    });

    await newCar.save();
    console.log('Car saved to database:', newCar);

    res.json({ carTokenId });
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: 'Failed to create car' });
  }
});

// Endpoint to fetch car details
app.post('/api/get-car', async (req, res) => {
  console.log('Get car request received:', req.body);
  const { collectionId, tokenId } = req.body;

  try {
    console.log('Connecting to SDK');
    const { sdk } = await connectSdk();
    console.log('SDK connected');

    console.log('Fetching car details from SDK');
    const carDetails = await sdk.token.getV2({ collectionId, tokenId });
    console.log('Car details fetched:', carDetails);

    res.json({ carDetails });
  } catch (error) {
    console.error('Failed to fetch car details:', error);
    res.status(500).json({ error: 'Failed to fetch car details' });
  }
});

// Endpoint to fetch user collections from the database
app.post('/api/get-collections', async (req, res) => {
  const { walletAddress } = req.body;
  console.log('Fetching collections for wallet address:', walletAddress);

  try {
    console.log('Finding collections in database');
    console.log(walletAddress)
    const collections = await Collection.find({ owner: walletAddress }).lean();
    console.log('Collections found:', collections);

    console.log('Fetching cars for each collection');
    const collectionsWithCars = await Promise.all(collections.map(async (collection) => {
      try {
        const cars = await Car.find({ collectionId: mongoose.Types.ObjectId(collection.collectionId) }).lean();
        console.log('Cars found for collection:', collection.collectionId, cars);
        return { ...collection, cars: cars || [] };
      } catch (carError) {
        console.error(`Failed to fetch cars for collection ${collection.collectionId}:`, carError.message);
        return { ...collection, cars: [] }; // Handle this case gracefully
      }
    }));

    console.log('Fetched collections with cars from DB:', collectionsWithCars);
    res.json({ collections: collectionsWithCars });
  } catch (error) {
    console.error('Failed to fetch collections:', error.message);
    console.error(error.stack);
    res.status(500).json({ error: 'Failed to fetch collections' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
