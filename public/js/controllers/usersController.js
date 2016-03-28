angular.module('usersCtrl', []).controller('usersController', function($scope,User,$location){
  $scope.addUser = function(){
    User.create($scope.newUser, function(userId){
      $location.path('/dashboard/' + userId);
    })
  }
})
