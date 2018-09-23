const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const reviewSchema = require('./review');
const reviewSchema = require('./request');

const userSchema = Schema({
  username: {type: String, required: true, unique: true},
  email:    {type: String, required: true, unique: true},
  password: {type: String, required: true},
  photo: {type: String, default:'../uploads/defaultimageuser'},
  level: {type: Number, default: 1},
  reviews: [reviewSchema],
  stats: [Number],
  requests: [requestSchema],
  totalGames: Number,
  validGames: Number,
  location: { type: { type: String }, coordinates: [Number] }
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}
);

userSchema.index({ location: '2dsphere' });
const User = mongoose.model('User', userSchema);
module.exports = User;