angular.module('dashboardCtrl', []).controller('dashboardsController', function($scope,User,ListItem,$routeParams,$location){
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
  ListItem.create($scope.newListItem,function(listItems) {
    $scope.listItems = listItems;
  })
})
