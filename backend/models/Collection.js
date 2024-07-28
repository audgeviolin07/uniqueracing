const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  collectionId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  symbol: { type: String, required: true },
  coverImage: { type: String, required: true },
  owner: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
