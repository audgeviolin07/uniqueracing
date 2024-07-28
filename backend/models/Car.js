const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carTokenId: { type: String, required: true, unique: true },
  collectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  owner: { type: String, required: true },
  victories: { type: Number, default: 0 },
  defeats: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
