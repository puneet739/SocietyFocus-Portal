app.controller("updateController", function($scope,$rootScope,$http) {
	console.log($rootScope.logedinuser);

	$scope.getCurrentUser= function(){
		var req = {
	            method: 'GET',
	            url: $rootScope.constant.SERVICE_URL + '/access/currentuser',
	        }
	        $http(req).then(function successCallback(response) {
	            $scope.currentUser = response.data.principal.user;
	        });
	}
	$scope.updateUser = function() {
	        var userString = JSON.stringify($rootScope.logedinuser, null, "\t");
	        var req = {
	            method: 'POST',
	            url: $rootScope.constant.SERVICE_URL + '/user/modifyuser',
	            data:  $scope.currentUser,
	        }
	        $http(req).then(function successCallback(response) {
	            console.log('user modified successfully');
	            var allUsers = response.data.body;
	            alert('User modified successfully, Kindly LogOut and Login to see new details');
	        });
	    };
});