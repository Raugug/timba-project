const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reviewSchema = Schema({
  authorId: { type: Schema.Types.ObjectId, ref: "User" },
  ownerId: { type: Schema.Types.ObjectId, ref: "User" },
  content: String,
  vision:  Number,
  selfc: Number,
  courage: Number,
  sharp: Number,
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}
);
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;