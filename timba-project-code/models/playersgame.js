const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playersgameSchema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    gameId: { type: Schema.Types.ObjectId, ref: "Game" }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const PlayersGame = mongoose.model("Playersgame", playersgameSchema);
module.exports = PlayersGame;
