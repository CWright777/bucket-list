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
  app.post('/listItems',function(req,res){
    ListItems.create(req,res);
  })
};
