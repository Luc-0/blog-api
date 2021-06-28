const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 30 },
  text: { type: String, required: true, minLength: 3, maxLength: 300 },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  timestamp: { type: Date, default: Date.now, required: true, immutable: true },
});

module.exports = mongoose.model('Comment', commentSchema);
