const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isHost: { type: Boolean, default: false },
    photo: { type: String, default: "../uploads/defaultimageuser" },
    level: { type: Number, default: 1 },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    myreviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    games: [{ type: Schema.Types.ObjectId, ref: "Game" }],
    vision: { type: Number, default: 1 },
    selfControl: { type: Number, default: 1 },
    courage: { type: Number, default: 1 },
    sharp: { type: Number, default: 1 },
    totalGames: Number,
    validGames: Number,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
