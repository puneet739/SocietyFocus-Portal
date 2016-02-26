app.controller("assetController", function($scope, $http, toaster, $filter,$stateParams, $q, $location, $rootScope, ngTableParams) {
    $scope.showAll=true;
    $scope.assetid=false;
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
    $scope.viewAssetByID = function() {
        console.log('Asset ID which need to be fetched:' + $stateParams.id);
        if ($stateParams.id === undefined) return;

        /*var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/society/asset/get/' + $stateParams.id,
        };
        $http(req).then(function successCallback(response) {
            $scope.asset={};
            var assetDetails = response.data.body[0];
            $scope.asset.assetid = $stateParams.id;
            $scope.asset.description = assetDetails.description;
            $scope.asset.contactno= assetDetails.userId.contact_no;
            $scope.asset.firstname = assetDetails.userId.firstname;
            $scope.showAll = false;
            console.log(response);
        }, function errorCallback(error) {
            console.log('Error because of connection');
        });*/
    }
    $scope.viewAsset = function(asset) {
        $stateParams.id=asset.id;
        $scope.asset=asset;
        $scope.showAll=false;
        //$scope.viewAssetByID();
        //$location.path('app/asset/booking/asset/'+id);
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
    $scope.viewMyAsset = function(){
        var req = {
            method: 'POST',
            url: $rootScope.constant.SERVICE_URL + '/society/asset/getassetbyuser'
        }
        $http(req).then(function successCallback(response) {
           $scope.allassets = response.data.body;
        });
    }
     $scope.setEditId = function(pid) {
        $scope.editId = pid;
    };
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);
    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = !$scope.opened;
    };
    $scope.confirmAssetBooking = function(){
        $scope.asset.startTime = moment.utc($scope.dt).format('YYYY-MM-DDThh:mm:ss') +'Z';
        console.log($scope.asset);
        var asset = [];
        asset=$scope.asset;
        asset.description=$scope.asset.details;
        asset.assetid=asset.id;
        var req = {
            method: 'POST',
            url: $rootScope.constant.SERVICE_URL + '/society/asset/book',
            data: $scope.asset
        };
        $http(req).then(function successCallback(response) {
            console.log('Done');
            $scope.assetbookingid=response.data.body.id;
            var title = 'Asset Booking Registered successfully';
            toaster.pop('success', title, title);
        }, function errorCallback(error) {
            console.log('Error because of connection');
        });
    }

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.hstep = 1;
    $scope.mstep = 15;

    // Time Picker
    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.update = function () {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        $scope.dt = d;
    };

});