angular.module('usersCtrl', []).controller('usersController', function($scope,User,$location,$cookies){
  $scope.addUser = function(){
    User.create($scope.newUser, function(userId){
      $cookies.userId = userId
      $location.path('/dashboard/' + userId);
    })
  }
})
