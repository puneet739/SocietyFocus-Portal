app.controller("vehicleController", function($scope, $http,$q,$location,$localStorage, $stateParams, authentication, $rootScope,eventbus) {
    $scope.vehicle={};
    $scope.vehicle.status = '1';
    $scope.vehicle.type = '0';
    $scope.codeGen = false;
    $scope.getUsers = function() {
        var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/user/getalluser',
        }
        $http(req).then(function successCallback(response) {
            users = response.data.body;
            var usersList = [];
            for (i = 0; i < users.length; i++) {
                var user = {
                    "displayname": users[i].firstname,
                    "value": users[i].userid
                };
                usersList[i] = user;
            }
            $scope.usersList = usersList;
        });
    }
    $scope.registerVehicle = function(){
         var req = {
            method: 'POST',
            url: $rootScope.constant.SERVICE_URL + '/vehicle/add?userid='+$scope.vehicle.usersList.value,
            data: $scope.vehicle
        }
        $http(req).then(function successCallback(response) {
            $scope.codeGen = true;
            $scope.uniqueID = response.data.body.vehicle_uniquieid;
            console.log(response);
        });
    }
    $scope.printDiv = function(){
        window.print();
    }

    $scope.viewMyVehicle = function(){
        console.log('Getting my Vehicles. ')
        var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/vehicle/get/me',
        }
        $http(req).then(function successCallback(response) {
            $scope.vehicles = response.data.body;
            //$scope.uniqueID = response.data.body.vehicle_uniquieid;
            console.log(response);
        });
    }

    $scope.redirectToVehicle= function(id){
         $location.path('app/vehicle/get/'+id);
    }

    $scope.getVehicleByUniquieID = function(){
        console.log('Getting my Vehicles. '+$stateParams.id);
        var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/vehicle/getvehicle/'+$stateParams.id,
        }
        $http(req).then(function successCallback(response) {
            $scope.vehicle = response.data.body;
            //$scope.uniqueID = response.data.body.vehicle_uniquieid;
            console.log(response);
        });
    }

});