  angular.module('dashboardCtrl', []).controller('dashboardsController', function($scope,User,ListItem,$location,$cookies,$routeParams){
  ListItem.show($routeParams.id,function(listItems){
    $scope.listItems = listItems;
  })
  ListItem.show($cookies.userId,function(listItem){
    $scope.listItem = listItem;
  })
  User.index(function(users){
    for(var user of users){
      if(user._id == $cookies.userId){
        users.splice(users.indexOf(user),1);
        $scope.users = users
        break;
      }
    }
  })
  User.show($cookies.userId, function(user){
    $scope.user = user;
  })
  $scope.addListItem = function(){
    $scope.newListItem.userId = $cookies.userId;
    ListItem.create($scope.newListItem,function(listItems) {
      $scope.listItems = listItems;
    })
  }
  $scope.changeStatus = function(listItemId){
    ListItem.update(listItemId);
  }
  $scope.logOut = function(){
    $cookies.userId = undefined;
    $location.path('/')
  }
})
