var mongoose = require('mongoose');

var User = mongoose.model('User')
var ListItem = mongoose.model('ListItem');

var getListItems = function(req,res,userId){
  ListItem.find({$or: [{'_user': userId}, {'_partner': userId}]})
  .populate('_partner')
  .populate('_user')
  .exec(function(err,listItems){
    if(err){
      console.log(err);
    } else {
      console.log(listItems)
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
    .exec(function(err,listItem){
      if(err){
        console.log(err);
      } else {
        console.log('das')
        res.json(listItem);
      }
    })
  },
  create: function(req,res){
    var newListItem = new ListItem({
      title: req.body.title,
      description: req.body.description,
      _partner: req.body.partnerId,
      _user: req.body.userId,
      status: false
    })
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
                  getListItems(req,res,req.body.userId)
                }
            })
          }
        })
      }
    })
  },
  update: function(req,res){
      ListItem.findOne({_id: req.params.id}, 
                     function(err,listItem){
                       if(err){
                        console.log(err)
                       } else {
                          if (listItem.status == true){
                            listItem.status = false;
                          } else {
                            listItem.status = true;
                          }
                          listItem.save()
                       }
                     })
  }
}
