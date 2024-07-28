const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { connectSdk } = require('./utils/connect-sdk');
const { uploadToPinata } = require('./utils/upload-to-pinata');
const multer = require('multer');
const dotenv = require('dotenv');
const Collection = require('./models/Collection');
const Car = require('./models/Car');
const Achievement = require('./models/Achievement'); // Import Achievement model

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
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    console.error('Check your MongoDB URI and ensure your IP address is whitelisted in MongoDB Atlas');
  });

// Endpoint to update car attributes
app.post('/api/update-nft', async (req, res) => {
  console.log('Update NFT request received:', req.body);
  const { collectionId, tokenId, attributes } = req.body;

  try {
    console.log('Connecting to SDK');
    const { sdk } = await connectSdk();
    console.log('SDK connected');

    // Fetch current properties
    const { properties } = await sdk.token.properties({ collectionId, tokenId });

    let currentSpeed = 0;
    let currentControl = 0;

    // Parse current properties
    if (properties?.length) {
      properties.forEach((prop) => {
        if (prop.key === 'Speed') currentSpeed = parseInt(prop.value, 10);
        if (prop.key === 'Control') currentControl = parseInt(prop.value, 10);
      });
    }

    // Calculate new attributes
    const newSpeed = currentSpeed + (attributes.speed || 0);
    const newControl = currentControl + (attributes.control || 0);

    // Update NFT attributes on the blockchain
    await sdk.token.setProperties({
      collectionId,
      tokenId,
      properties: [
        { key: 'Speed', value: newSpeed.toString() },
        { key: 'Control', value: newControl.toString() },
      ],
    });

    // Update in your database if necessary
    const car = await Car.findOne({ carTokenId: tokenId, CarcollectionId: collectionId });
    if (car) {
      car.speed = newSpeed;
      car.control = newControl;
      await car.save();
    }

    res.status(200).send('NFT attributes updated successfully.');
  } catch (error) {
    console.error('Error updating NFT attributes:', error);
    res.status(500).send('Failed to update NFT attributes.');
  }
});

// Endpoint to create a new collection
app.post('/api/create-collection', upload.single('image'), async (req, res) => {
  console.log('Create collection request received:', req.body);
  try {
    const { CarcollectionId } = req.body;
    console.log('Collection created, ID:', CarcollectionId);

    // Save collection to the database
    const newCollection = new Collection({
      CarcollectionId,
      name: req.body.name,
      description: req.body.description,
      symbol: req.body.symbol,
      coverImage: req.body.url,
      owner: req.body.owner, // Assuming 'account' has the user's address
    });

    await newCollection.save();
    console.log('Collection saved to database:', newCollection);

    res.json({ CarcollectionId });
  } catch (error) {
    console.error('Error creating collection:', error);
    res.status(500).json({ error: 'Failed to create collection' });
  }
});

// Endpoint to create a car
app.post('/api/create-car', upload.single('image'), async (req, res) => {
  console.log('Create car request received:', req.body);
  try {
    console.log('Uploading image to Pinata:', req.file.path);
    const imageUrl = await uploadToPinata(req.file.path);
    console.log('Image uploaded to Pinata:', imageUrl);

    const { CarcollectionId, walletAddress, name } = req.body;
    console.log('Connecting to SDK');
    const { account, sdk } = await connectSdk();
    console.log('SDK connected, account:', account);

    console.log('Creating car with SDK');
    const { parsed } = await sdk.token.createV2({
      CarcollectionId,
      image: imageUrl,
      owner: walletAddress,
      attributes: [
        { trait_type: 'Name', value: name },
        { trait_type: 'Victories', value: 0 },
        { trait_type: 'Defeats', value: 0 },
        { trait_type: 'Speed', value: 0 },
        { trait_type: 'Control', value: 0 },
      ],
    });

    if (!parsed) {
      console.error('Failed to parse car creation response');
      return res.status(500).json({ error: 'Cannot create car' });
    }

    const carTokenId = parsed.tokenId;
    console.log('Car created, Token ID:', carTokenId);

    console.log(req.body);

    // Save car to the database
    const newCar = new Car({
      carTokenId,
      CarcollectionId, // Store as string directly
      name,
      image: imageUrl,
      owner: walletAddress,
      victories: 0,
      defeats: 0,
      speed: 0,
      control: 0,
    });

    await newCar.save();
    console.log('Car saved to database:', newCar);

    res.json({ carTokenId });
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: 'Failed to create car' });
  }
});

// Endpoint to create an achievement
app.post('/api/create-achievement', upload.single('image'), async (req, res) => {
  console.log('Create achievement request received:', req.body);
  try {
    console.log('Uploading image to Pinata:', req.file.path);
    const imageUrl = await uploadToPinata(req.file.path);
    console.log('Image uploaded to Pinata:', imageUrl);

    const { AchievementcollectionId, walletAddress, name } = req.body;
    console.log('Connecting to SDK');
    const { account, sdk } = await connectSdk();
    console.log('SDK connected, account:', account);

    console.log('Creating achievement with SDK');
    const { parsed } = await sdk.token.createV2({
      AchievementcollectionId,
      image: imageUrl,
      owner: walletAddress,
      attributes: [
        { trait_type: 'BestLap', value: name },
        { trait_type: 'TotalTime', value: 0 },
        { trait_type: 'Score', value: 0 },
        { trait_type: 'Position', value: 0 },
      ],
    });

    if (!parsed) {
      console.error('Failed to parse achievement creation response');
      return res.status(500).json({ error: 'Cannot create achievement' });
    }

    const achievementId = parsed.tokenId;
    console.log('Achievement created, Token ID:', achievementId);

    console.log(req.body);

    // Save achievement to the database
    const newAchievement = new Achievement({
      achievementId,
      AchievementcollectionId, // Store as string directly
      name,
      image: imageUrl,
      owner: walletAddress,
      victories: 0,
      defeats: 0,
    });

    await newAchievement.save();
    console.log('Achievement saved to database:', newAchievement);

    res.json({ achievementId });
  } catch (error) {
    console.error('Error creating achievement:', error);
    res.status(500).json({ error: 'Failed to create achievement' });
  }
});

// Endpoint to fetch achievement details
app.post('/api/get-achievement', async (req, res) => {
  console.log('Get achievement request received:', req.body);
  const { AchievementcollectionId, tokenId } = req.body;

  try {
    console.log('Connecting to SDK');
    const { sdk } = await connectSdk();
    console.log('SDK connected');

    console.log('Fetching achievement details from SDK');
    const achievementDetails = await sdk.token.getV2({ AchievementcollectionId, tokenId });
    console.log('Achievement details fetched:', achievementDetails);

    res.json({ achievementDetails });
  } catch (error) {
    console.error('Failed to fetch achievement details:', error);
    res.status(500).json({ error: 'Failed to fetch achievement details' });
  }
});

// Endpoint to update car attributes
app.post('/api/update-nft', async (req, res) => {
  console.log('Update NFT request received:', req.body);
  const { collectionId, nftId, attributes } = req.body;

  try {
    console.log('Connecting to SDK');
    const { sdk } = await connectSdk();
    console.log('SDK connected');

    // Fetch current attributes
    const { data: currentSpeed } = await sdk.nftAttributes(collectionId, nftId, 'Speed');
    const { data: currentControl } = await sdk.nftAttributes(collectionId, nftId, 'Control');

    // Calculate new attributes
    const newSpeed = (currentSpeed.toNumber() || 0) + (attributes.speed || 0);
    const newControl = (currentControl.toNumber() || 0) + (attributes.control || 0);

    // Update NFT attributes on the blockchain
    await sdk.setAttribute({ collectionId, nftId, key: 'Speed', value: newSpeed });
    await sdk.setAttribute({ collectionId, nftId, key: 'Control', value: newControl });

    // Update in your database if necessary
    const car = await Car.findOne({ carTokenId: nftId });
    if (car) {
      car.speed = newSpeed;
      car.control = newControl;
      await car.save();
    }

    res.status(200).send('NFT attributes updated successfully.');
  } catch (error) {
    console.error('Error updating NFT attributes:', error);
    res.status(500).send('Failed to update NFT attributes.');
  }
});

// Endpoint to fetch user collections from the database
app.post('/api/get-collections', async (req, res) => {
  const { walletAddress } = req.body;
  console.log('Fetching collections for wallet address:', walletAddress);

  try {
    console.log('Finding collections in database');
    console.log(walletAddress);
    const collections = await Collection.find({ owner: walletAddress }).lean();
    console.log('Collections found:', collections);

    console.log('Fetching cars for each collection');
    const collectionsWithCars = await Promise.all(collections.map(async (collection) => {
      try {
        const cars = await Car.find({ collectionId: collection.CarcollectionId }).lean();
        console.log('Cars found for collection:', collection.CarcollectionId, cars);
        return { ...collection, cars: cars || [] };
      } catch (carError) {
        console.error(`Failed to fetch cars for collection ${collection.CarcollectionId}:`, carError.message);
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

// Endpoint to fetch user achievements from the database
app.post('/api/get-achievements', async (req, res) => {
  const { walletAddress } = req.body;
  console.log('Fetching achievements for wallet address:', walletAddress);

  try {
    console.log('Finding achievements in database');
    const achievements = await Achievement.find({ owner: walletAddress }).lean();
    console.log('Achievements found:', achievements);

    res.json({ achievements });
  } catch (error) {
    console.error('Failed to fetch achievements:', error.message);
    console.error(error.stack);
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
