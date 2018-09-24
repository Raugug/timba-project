const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = require("./review");
const requestSchema = require("./request");

const userSchema = Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isHost: { type: Boolean, default: false },
    photo: { type: String, default: "../uploads/defaultimageuser" },
    level: { type: Number, default: 1 },
    reviews: [reviewSchema.schema],
    vision: { type: Number, default: 1 },
    selfControl: { type: Number, default: 1 },
    courage: { type: Number, default: 1 },
    sharp: { type: Number, default: 1 },
    //stats: {type: [], default: [1, 1, 1, 1] },
    requests: [requestSchema.schema],
    totalGames: Number,
    validGames: Number
    //  location: { type: { type: String }, coordinates: [Number] }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

//userSchema.index({ location: '2dsphere' });
const User = mongoose.model("User", userSchema);
module.exports = User;
