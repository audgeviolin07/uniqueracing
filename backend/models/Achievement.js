const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  achievementId: {
    type: Number,
    required: true,
    unique: true
  },
  AchievementcollectionId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  victories: {
    type: Number,
    default: 0
  },
  defeats: {
    type: Number,
    default: 0
  },
  bestLap: {
    type: String,
    default: ''
  },
  totalTime: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    default: 0
  },
  position: {
    type: Number,
    default: 0
  }
});

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;
