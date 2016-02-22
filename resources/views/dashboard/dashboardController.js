app.controller("dashboardController", function($scope, $localStorage, $http,$localStorage, $filter, $q, $location, $stateParams, $rootScope, toaster) {

	$scope.init = function(){
		$scope.currentSociety = $localStorage.society;
	}

});