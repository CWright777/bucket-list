var mongoose = require('mongoose');

var User = mongoose.model('User')
var ListItem = mongoose.model('ListItem');

var getListItems = function(req,res){
  ListItem.find({})
  .populate('_partner')
  .exec(function(err,listItems){
    if(err){
      console.log(err);
    } else {
      res.json(listItems);
    }
  })
}

module.exports = {
  create: function(req,res){
    var newListItem = new ListItem({
      title: req.body.title,
      description: req.body.description,
      _partner: req.body.partnerId
    })
    User.findOneAndUpdate({_id: req.body.partnerId},
    {$push: {"listItems": newListItem}},
    function(err,user){
      if(err){
        console.log(err);
      } else {
        newListItem.save(function(listItemErr){
          if(listItemErr){
            console.log(listItemErr);
          } else {
            getListItems(req,res);
          }
        })
      }
    })
  }
}
