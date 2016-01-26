app.controller("userController", function($scope, $http, $filter, $q, $location, $rootScope, ngTableParams) {

	$scope.register_success=false;
    $scope.asset_category = [{
        "displayname": "Electirican",
        "value": 1
    }, {
        "displayname": "Plumber",
        "value": 2
    }, {
        "displayname": "Confrence Room",
        "value": 3
    }, {
        "displayname": "Banquet Hall",
        "value": 4
    }, {
        "displayname": "Garden",
        "value": 5
    }, {
        "displayname": "Driver",
        "value": 6
    }];

    $scope.registerAsset = function() {
        console.log('Now registering asset' + $scope.asset);
        var assetString = JSON.stringify($scope.asset, null, "\t");
        var req = {
            method: 'POST',
            url: $rootScope.constant.SERVICE_URL + '/society/asset/register',
            data: assetString,
        }

        $http(req).then(function successCallback(response) {
            console.log('Asset registered successfully');
            $scope.register_success=true;
            $scope.asset=null;
        });
    }


});