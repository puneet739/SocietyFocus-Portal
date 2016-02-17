app.controller("complaintController", function($scope, $http, $filter, $q, $location,$stateParams ,$rootScope, toaster) {


    $scope.complaint_status = [{
        "displayname": "New",
        "value": 1
    }, {
        "displayname": "Completed",
        "value": 2
    }, {
        "displayname": "In Progress",
        "value": 0
    }, {
        "displayname": "Rejected",
        "value": 4
    }];

    $scope.registerComplaint = function() {
        var complaintString = JSON.stringify($scope.complaint, null, "\t");
        
        var req = {
            method: 'POST',
            url: $rootScope.constant.SERVICE_URL + '/v1/complaint/save',
            data: complaintString,
        };

        $http(req).then(function successCallback(response) {
            $scope.toaster = {
                type: 'success',
                title: 'Complaint Registered Successfully',
                text: 'Complaint Registered Successfully'
            };
            toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
        }, function errorCallback(error) {
            console.log('Error because of connection');
        });
    }



    $scope.viewallComplaint = function(){
        var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/v1/complaint/getall',
        };
        $http(req).then(function successCallback(response) {
            $scope.allcomplaints = response.data.body;
        }, function errorCallback(error) {
            console.log('Error because of connection');
        });

    }

    $scope.viewUserComplaint = function(){
        var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/v1/complaint/getusercomplaint',
        };
        $http(req).then(function successCallback(response) {
            $scope.allcomplaints = response.data.body;
        }, function errorCallback(error) {
            console.log('Error because of connection');
        });
    }


    $scope.viewComplaintByID = function(){
        console.log('Complaint ID which need to be fetched:'+$stateParams.id);
        var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/v1/complaint/get/'+$stateParams.id,
        };
        $http(req).then(function successCallback(response) {
            $scope.complaint = response.data.body.complaint;
            $scope.user = response.data.body.complaint.user;
            $scope.comments = response.data.body.comments;
        }, function errorCallback(error) {
            console.log('Error because of connection');
        });
    }


});