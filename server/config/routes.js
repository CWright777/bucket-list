var Users = require('../controllers/usersController.js');
var ListItems = require('../controllers/listItemController.js');

module.exports = function(app){
  app.get('/users',function(req,res){
    Users.index(req,res);
  }),
  app.get('/users/:id',function(req,res){
    Users.show(req,res);
  }),
  app.post('/users',function(req,res){
    Users.create(req,res);
  }),
  app.get('/listItems',function(req,res){
    ListItems.index(req,res);
  })
  app.get('/listItems/:id',function(req,res){
    ListItems.show(req,res);
  })
  app.get('/listItemsc/:id',function(req,res){
    ListItems.complete(req,res);
  })
  app.post('/listItems',function(req,res){
    ListItems.create(req,res);
  })
};
