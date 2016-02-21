app.controller("dashboardController", function($scope, $sessionStorage, $http,$localStorage, $filter, $q, $location, $stateParams, $rootScope, toaster) {

	$scope.init = function(){
		$scope.currentSociety = $sessionStorage.society;
	}

});