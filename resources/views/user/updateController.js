app.controller("updateController", function($scope,$rootScope,$http) {
	console.log($rootScope.logedinuser);
	$scope.updateUser = function(logedinuser) {
	        var userString = JSON.stringify($rootScope.logedinuser, null, "\t");
	        var req = {
	            method: 'POST',
	            url: $rootScope.constant.SERVICE_URL + '/user/modifyuser',
	            data: userString,
	        }
	        $http(req).then(function successCallback(response) {
	            console.log('user modified successfully');
	            var allUsers = response.data.body;
	            alert('User modified successfully');
	        });
	        console.log('Its time to save the user' + userString);
	    };
});