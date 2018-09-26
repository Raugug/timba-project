const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reviewSchema = Schema({
  content: String,
  authorId: { type: Schema.Types.ObjectId, ref: "User" },
  vision:  Number,
  selfControl: Number,
  courage: Number,
  sharp: Number
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}
);
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;