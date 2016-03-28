var mongoose = require('mongoose');

var User = mongoose.model('User')
var ListItem = mongoose.model('ListItem');

var getListItems = function(req,res){
  ListItem.find({})
  .populate('_partner')
  .populate('_user')
  .exec(function(err,listItems){
    if(err){
      console.log(err);
    } else {
      res.json(listItems);
    }
  })
}

module.exports = {
  index: function(req,res){
    ListItem.find({})
    .populate('_partner')
    .populate('_user')
    .exec(function(err,listItems){
      if(err){
        console.log(err);
      } else {
        res.json(listItems);
      }
    })
  },
  show: function(req,res){
    ListItem.find({$or: [{'_user': req.params.id}, {'_partner': req.params.id}]})
    .populate('_partner')
    .populate('_user')
    .exec(function(err,listItems){
      if(err){
        console.log(err);
      } else {
        res.json(listItems);
      }
    })
  },
  complete: function(req,res){
    ListItem.find({$or: [{'_user': req.params.id}, {'_partner': req.params.id}]})
    .and([{"status": true}])
    .populate('_partner')
    .populate('_user')
    .exec(function(err,listItems){
      if(err){
        console.log(err);
      } else {
        res.json(listItems);
      }
    })
  },
  create: function(req,res){
    console.log(req.body)
    var newListItem = new ListItem({
      title: req.body.title,
      description: req.body.description,
      _partner: req.body.partnerId,
      _user: req.body.userId,
      status: false
    })
    console.log(newListItem)
    User.findOneAndUpdate({_id: req.body.userId},
    {$push: {"users": newListItem }},
    function(err,user){
      if(err){
        console.log(err);
      } else {
          User.findOneAndUpdate({_id: req.body.partnerId},
          {$push: {"partners": newListItem}},
          function(partnerErr,partner){
            if(partnerErr){
              console.log(partnerErr)
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
    })
  }
}
