var mongoose = require('mongoose');

var ListItemsSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: Boolean,
  _user: {type: mongoose.Schema.ObjectId, ref:"User"},
  _partner: {type: mongoose.Schema.ObjectId, ref:"User"},
  created_at: { type: Date, default: Date.now }
})

var ListItem = mongoose.model('ListItem', ListItemsSchema);
