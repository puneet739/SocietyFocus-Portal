app.controller("assetBookingController", function($scope, $http, $filter, $q, $location, $rootScope, ngTableParams) {


    $scope.getAssetRequests = function() {
        console.log('Now trying to fetch all AssetsRequest of society');
        var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/society/asset/get'
        }

        $http(req).then(function successCallback(response) {
            var allRequests = response.data.body;

            $scope.tableParams = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: allRequests.length,
                getData: function($defer, params) {
                    var orderedData = params.sorting() ? $filter('orderBy')(allRequests, params.orderBy()) : allRequests;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });

        }, function errorCallback(error) {
            debugger;
            console.log('Error because of connection');
        });
    }

});