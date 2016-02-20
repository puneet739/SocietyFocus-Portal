app.controller("assetController", function($scope, $http, toaster, $filter, $q, $location, $rootScope, ngTableParams) {

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


    $scope.getAllAssets = function() {
        console.log('Now trying to fetch all Assets of society');
        var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/society/asset/getall',
        }

        $http(req).then(function successCallback(response) {
            console.log('users are loaded successfully');
            var allassets = response.data.body;
            $scope.allassets=allassets;
            $scope.tableParams = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: allassets.length,
                getData: function($defer, params) {
                    var orderedData = params.sorting() ? $filter('orderBy')(allassets, params.orderBy()) : allassets;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });

        }, function errorCallback(error) {
            debugger;
            console.log('Error because of connection');
        })
    }

    $scope.modifyAsset = function(asset) {
        var assetString = JSON.stringify(asset, null, "\t");
        var req = {
            method: 'POST',
            url: $rootScope.constant.SERVICE_URL + '/society/asset/modify',
            data: assetString,
        }
        $http(req).then(function successCallback(response) {
            var allAssets = response.data.body;
            var title = 'Asset modified successfully';
            toaster.pop('success', title, title);
            $scope.setEditId(-1);
        });
    };

     $scope.setEditId = function(pid) {
        $scope.editId = pid;
    };
});