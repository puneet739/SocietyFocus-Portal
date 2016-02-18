app.controller("complaintController", function($scope, $http, $filter, $q, $location, $stateParams, $rootScope, toaster) {


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
            $scope.complaint = [];
            $scope.complaintSuccess = 1;
            toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
        }, function errorCallback(error) {
            console.log('Error because of connection');
        });
    }



    $scope.viewallComplaint = function() {
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

    $scope.viewUserComplaint = function() {
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

    $scope.searchBarShow = true;
    $scope.viewComplaintByID = function() {
        console.log('Complaint ID which need to be fetched:' + $stateParams.id);
        if (isEmpty($stateParams.id)) return;
        var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/v1/complaint/get/' + $stateParams.id,
        };
        $http(req).then(function successCallback(response) {
            $scope.complaint = response.data.body.complaint;
            $scope.user = response.data.body.complaint.user;
            $scope.comments = response.data.body.comments;
            $scope.searchBarShow = false;
        }, function errorCallback(error) {
            console.log('Error because of connection');
        });
    }

    function isEmpty(str) {
        return (!str || 0 === str.length);
    }

    $scope.addComment = function() {
        console.log('Adding Comment:' + $stateParams.id);

        var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/v1/comment/add/complaint_' + $scope.complaint.complaintid + '/' + $scope.newcomment,
        };
        $http(req).then(function successCallback(response) {
            console.log('Comment Added Successfully');
            toaster.pop("success", "Comment Posted Successfully", "Comment Added Successfully");
            var comment = response.data.body;
            $scope.comments.push(comment);
            $scope.newcomment = null;
        }, function errorCallback(error) {
            console.log('Error because of connection');
        });
    }

    $scope.searchId = function() {
        console.log('Search for ID'+$scope.complaintid);
        $stateParams.id = $scope.complaintid;
        $scope.viewComplaintByID();
    }

    $scope.isadmin = false;
    $scope.isAdmin = function() {
        $scope.isadmin = true;
    }
});