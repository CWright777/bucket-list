var mongoose = require('mongoose');

var ListItemsSchema = new mongoose.Schema({
  title: String,
  description: String,
  _partner: {type: mongoose.Schema.ObjectId, ref:"User"},
  created_at: { type: Date, default: Date.now }
})

var ListItem = mongoose.model('ListItem', ListItemsSchema);
