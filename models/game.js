const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const gameSchema = Schema({
  hostId: { type: Schema.Types.ObjectId, ref: "User" },
  playersNum:  Number,
  blinds: String,
  photo: {type: String, default:'../uploads/defaultimagegame'},
  level: {type: Number, default: 1},
  players: [{ type: Schema.Types.ObjectId, ref: "User" }],
  joining: { type: Boolean, default: true },
  ready: { type: Boolean, default: false },
  closed: { type: Boolean, default: false },
  date: String,
  time: String,
  description: String,
  buyIn: String,
  location: { type: { type: String }, coordinates: [Number] }
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}
);

gameSchema.index({ location: '2dsphere' });
const Game = mongoose.model('Game', gameSchema);
module.exports = Game;