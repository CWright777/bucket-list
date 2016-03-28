var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
  name: String,
  partners: [{type: mongoose.Schema.ObjectId, ref:"ListItem"}],
  users: [{type: mongoose.Schema.ObjectId, ref:"ListItem"}],
  created_at: { type: Date, default: Date.now }
})

var User = mongoose.model('User', UsersSchema);
