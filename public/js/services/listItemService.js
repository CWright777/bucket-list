angular.module('listItemService', []).service('ListItem', ['$http', function($http){
  this.create = function(newListItem,callback){
    $http.post('/listItems', newListItem).success(function(listItems){
      callback(listItems);
    })
  }
}])
