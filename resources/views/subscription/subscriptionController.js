app.controller("subscriptionController", function($scope,$stateParams, $http, $filter, $q, $location, $rootScope, toaster) {

	$scope.addSubscription = function(){
		console.log("Adding subscription now :: "+$scope.subscription);
		var req = {
            method: 'POST',
            url: $rootScope.constant.SERVICE_URL + '/subscription/add',
            data: $scope.subscription,
        }

        $http(req).then(function successCallback(response) {
           console.log('Subscription Added successfully');
           $scope.subscriptionsuccess=true;
           $scope.subscription=null;
        },function errorCallback(error) {
            debugger;
            console.log('Error because of connection');
        });

	}
});