var mongoose = require('mongoose');

var User = mongoose.model('User');

module.exports = {
  index: function(req,res){
    User.find({},function(err,users){
      res.json(users);
    })
  },
  show: function(req,res){
    User.findOne({_id: req.params.id}, function(err,user){
      res.json(user);
    })
  },
  create: function(req,res){
    var newUser = new User({
      name: req.body.name
    })
    newUser.save(function(err){
      if(err){
        console.log(err);
      } else {
        res.json(newUser.id);
      }
    })
  }
}
