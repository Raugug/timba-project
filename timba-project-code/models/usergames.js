const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const usergameSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  gameId: { type: Schema.Types.ObjectId, ref: "Game" },
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}
);

const Usergame = mongoose.model('Usergame', usergameSchema);
module.exports = Usergame;