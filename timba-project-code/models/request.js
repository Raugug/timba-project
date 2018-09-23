const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const requestSchema = Schema({
  status:{type: String, enum: ['Pending', 'Accepted', 'Denied'], default: 'Pending'} ,
  authorId: { type: Schema.Types.ObjectId, ref: "User" },
  gameId: { type: Schema.Types.ObjectId, ref: "Game" }
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}
);
const Request = mongoose.model('Request', requestSchema);
module.exports = Request;