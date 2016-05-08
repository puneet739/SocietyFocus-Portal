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
	            url: $rootScope.constant.SERVICE_URL + '/user/modifymyuser',
	            data:  $scope.currentUser,
	        }
	        $http(req).then(function successCallback(response) {
	            console.log('user modified successfully');
	            var allUsers = response.data.body;
	            alert('User modified successfully, Kindly LogOut and Login to see new details');
	        });
	        // var reqImage = {
	        //     method: 'POST',
	        //     headers: {'Content-Type': 'multipart/form-data'},	 
	        //     url: $rootScope.constant.SERVICE_URL + '/upload/image',
	        //     file:  $scope.myImage
	        // }
	        // $http(reqImage).then(function successCallback(response) {
	        //     console.log('user modified successfully');
	        //     // var allUsers = response.data.body;
	        //     // alert('User modified successfully, Kindly LogOut and Login to see new details');
	        // });
	        $http(req).then(function successCallback(response) {
	            console.log('user modified successfully');
	            // var allUsers = response.data.body;
	            // alert('User modified successfully, Kindly LogOut and Login to see new details');
	        });
	    };
	$scope.myImage = '';
    $scope.myCroppedImage = '';
    $scope.cropType = "square";

    var handleFileSelect = function (evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function ($scope) {
                $scope.myImage = evt.target.result;
            });
        };
        reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
});
