app.controller("paymentController", function($scope,$stateParams, $http, $filter, $q, $location, $rootScope, toaster) {

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


    $scope.adminaddmoney = function(){
        var req = {
            method: 'POST',
            url: $rootScope.constant.SERVICE_URL + '/payment/add/admin',
            data: $scope.payment,
        }

        $http(req).then(function successCallback(response) {
           console.log('Payment completed successfully');
           $scope.payment=null;
           $scope.payment_complete=true;
        },function errorCallback(error) {
            debugger;
            console.log('Error because of connection');
        });
    }

    $scope.validateSuccess=function(){
        var transactionID = $stateParams.id ;
        console.log("The transction id is::"+transactionID);
        var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/payment/confirmpayment?transactionid='+transactionID,
        }
        $http(req).then(function successCallback(response) {
           console.log('Payment completed successfully');
           $scope.isSuccess=true;
        },function errorCallback(error) {
            debugger;
            $scope.errorMessage=true;
            console.log('Error because of connection');
        });
    }

	$scope.useraddmoney = function(){
        var data = {
            userid:'2',
            amount:Math.abs($scope.wallet.amount),
            description:'Payment For User'
        }

		var req = {
            method: 'POST',
            url: $rootScope.constant.SERVICE_URL + '/payment/makepayment',
            data: data,
        }

        $http(req).then(function successCallback(response) {
            var redirectAddress = response.data.body;
            window.location = redirectAddress;
        },function errorCallback(error) {
            debugger;
            console.log('Error because of connection');
        });
	}

	$scope.getmylasttransactions = function(){
		var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/user/getusertransaction?size=5',
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


    $scope.viewalldefaulters = function(){
        var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/user/defaulters',
        }
        $http(req).then(function successCallback(response) {
            $scope.defaulters = response.data.body;
        },function errorCallback(error) {
            console.log('Error because of connection');
        });
    }
});