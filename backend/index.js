const express = require('express');
const cors = require('cors');
const { connectSdk } = require('./utils/connect-sdk');
const { uploadToPinata } = require('./utils/upload-to-pinata');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

const PORT = process.env.PORT || 3001;

// Endpoint to create a new collection
app.post('/api/create-collection', upload.single('image'), async (req, res) => {
  try {
    const imageUrl = await uploadToPinata(req.file.path);
    const { account, sdk } = await connectSdk();

    const { parsed } = await sdk.collection.createV2({
      name: req.body.name,
      description: req.body.description,
      symbol: req.body.symbol,
      cover_image: { url: imageUrl },
      permissions: { nesting: { collectionAdmin: true } },
      encodeOptions: {
        overwriteTPPs: [
          {
            key: 'tokenData',
            permission: {
              collectionAdmin: true, tokenOwner: false, mutable: true
            }
          }
        ],
      },
    });

    if (!parsed) return res.status(500).json({ error: 'Cannot create collection' });

    const collectionId = parsed.collectionId;
    console.log('Collection ID:', collectionId);
    res.json({ collectionId });
  } catch (error) {
    console.error('Error creating collection:', error);
    res.status(500).json({ error: 'Failed to create collection' });
  }
});

// Endpoint to create a car
app.post('/api/create-car', upload.single('image'), async (req, res) => {
  try {
    const imageUrl = await uploadToPinata(req.file.path);
    const { collectionId, walletAddress, name } = req.body;
    const { account, sdk } = await connectSdk();

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

    if (!parsed) return res.status(500).json({ error: 'Cannot create car' });

    const carTokenId = parsed.tokenId;
    res.json({ carTokenId });
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: 'Failed to create car' });
  }
});

// Endpoint to fetch car details
app.post('/api/get-car', async (req, res) => {
  const { collectionId, tokenId } = req.body;
  const { sdk } = await connectSdk();

  try {
    const carDetails = await sdk.token.getV2({ collectionId, tokenId });
    res.json({ carDetails });
  } catch (error) {
    console.error('Failed to fetch car details:', error);
    res.status(500).json({ error: 'Failed to fetch car details' });
  }
});

//Endpoint to fetch user collections
app.post('/api/get-collections', async (req, res) => {
  const { walletAddress } = req.body;
  console.log('Fetching collections for wallet address:', walletAddress);
  const { sdk } = await connectSdk();

  try {
    console.log('Connecting to SDK');
    const collections = await sdk.collection.list({ owner: walletAddress });

    // Fetch detailed collection properties for each collection
    const detailedCollections = await Promise.all(
      collections.data.map(async (result) => {
        try {
          const collection = await sdk.collection.get({ idOrAddress: result.collectionId });
          return collection;
        } catch (error) {
          console.error('Error fetching collection details for:', result.collectionId, error);
          throw error; // propagate the error to the main catch block
        }
      })
    );

    console.log('Detailed collections fetched:', detailedCollections);
    res.json({ collections: detailedCollections });
  } catch (error) {
    console.error('Failed to fetch collections:', error.message);
    console.error(error.stack);
    res.status(500).json({ error: 'Failed to fetch collections' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});