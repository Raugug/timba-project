const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const userSchema = require('./user');
const requestSchema = require('./request');

const gameSchema = Schema({
  hostId: { type: Schema.Types.ObjectId, ref: "User" },
  playersNum:  Number,
  blinds: String,
  photo: {type: String, default:'../uploads/defaultimagegame'},
  level: {type: Number, default: 1},
  requests: [requestSchema.schema],
  players: [userSchema.schema],
  status: { type: String, enum: ['Joining', 'Ready', 'Finished', 'Cancelled'], default: 'Joining' },
  date: Date,
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