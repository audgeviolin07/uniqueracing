const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  achievementId: { type: String, required: true, unique: true },
  AchievementcollectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  owner: { type: String, required: true },
  victories: { type: Number, default: 0 },
  defeats: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;
