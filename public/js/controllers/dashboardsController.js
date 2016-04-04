angular.module('dashboardCtrl', []).controller('dashboardsController', function($scope,User,ListItem,$routeParams,$location){
  ListItem.show($routeParams.id,function(listItems){
    $scope.listItems = listItems;
  })
  User.index(function(users){
    for(var user of users){
      if(user._id == $routeParams.id){
        users.splice(users.indexOf(user),1);
        $scope.users = users
        break;
      }
    }
  })
  User.show($routeParams.id, function(user){
    $scope.user = user;
  })
  $scope.addListItem = function(){
    $scope.newListItem.userId = $routeParams.id;
    ListItem.create($scope.newListItem,function(listItems) {
      $scope.listItems = listItems;
    })
  }
  $scope.changeStatus = function(listItemId){
    ListItem.update(listItemId);
  }
})
