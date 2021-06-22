const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusList = ['public', 'private'];

const postSchema = new Schema({
  title: { type: String, minLength: 3, maxLength: 100, required: true },
  text: { type: String, minLength: 3, maxLength: 300, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now, required: true },
  status: {
    type: String,
    required: true,
    enum: statusList,
    default: 'private',
  },
});

module.exports = mongoose.model('Post', postSchema);
