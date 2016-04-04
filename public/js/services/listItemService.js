angular.module('listItemService', []).service('ListItem', ['$http', function($http){
  this.index = function(callback){
    $http.get('/listItems').success(function(listItems){
      callback(listItems);
    })
  }
  this.create = function(newListItem,callback){
    $http.post('/listItems', newListItem).success(function(listItems){
      callback(listItems);
    })
  }
  this.show = function(userid,callback){
    $http.get('/listItems/' + userid).success(function(listItems){
      console.log(listItems)
      callback(listItems);
    })
  }
  this.update = function(listItemId){
    $http.put('/listItems/' + listItemId)
  }
}])
