angular.module('userService', []).service('User', ['$http', function($http){
  this.index = function(callback){
    $http.get('/users').success(function(users){
      callback(users)
    })
  }
  this.show = function(userId,callback){
    $http.get('/users/' + userId).success(function(user){
      callback(user);
    })
  }
  this.create = function(newUser,callback){
    $http.post('/users', newUser).success(function(userId){
      callback(userId);
    })
  }
}])
