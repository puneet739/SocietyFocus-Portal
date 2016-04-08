app.controller("paymentController", function($scope, $http, $filter, $q, $location, $rootScope, toaster) {

	$scope.getMyWallet = function(){
		var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/user/getuserwallet',
        }
        $http(req).then(function successCallback(response) {
            console.log('user Wallet loaded successfully');
            $scope.wallet = response.data.body;
            debugger;
        },function errorCallback(error) {
            debugger;
            console.log('Error because of connection');
        });
	}


	$scope.useraddmoney = function(){
		var req = {
            method: 'POST',
            url: $rootScope.constant.SERVICE_URL + '/payment/add/admin',
            data: $scope.payment
        }

        $http(req).then(function successCallback(response) {
            console.log('Admin added money successfully');
            debugger;
        },function errorCallback(error) {
            debugger;
            console.log('Error because of connection');
        });
	}

	$scope.getmylasttransactions = function(){
		var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/user/getusertransaction',
        }

        $http(req).then(function successCallback(response) {
            console.log('Admin added money successfully');

            $scope.transactions = response.data.body;
            debugger;
        },function errorCallback(error) {
            debugger;
            console.log('Error because of connection');
        });
	}
});