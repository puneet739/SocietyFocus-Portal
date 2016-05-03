app.controller("userController", function($scope,toaster, $http, $filter, $q, $location, authentication, $rootScope, eventbus, ngTableParams) {

    $scope.editId = -1;
    $scope.register_success=false;

    $scope.getAllUsers = function() {
        console.log('Now trying to fetch all users into system');
        var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/user/getalluser',
        }

        $http(req).then(function successCallback(response) {
            console.log('users are loaded successfully');
            var allUsers = response.data.body;

            $scope.tableParams = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: allUsers.length,
                getData: function($defer, params) {
                    var orderedData = params.sorting() ? $filter('orderBy')(allUsers, params.orderBy()) : allUsers;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });

        }, function errorCallback(error) {
            debugger;
            console.log('Error because of connection');
        })
    }

    $scope.setEditId = function(pid) {
        $scope.editId = pid;
    };

    $scope.resetpassword = function(user) {
        console.log('Now trying to reset password for user:'+user);
        var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/user/resetpassword/email/'+user.email+'?newPassword='+user.password,
        }

        $http(req).then(function successCallback(response) {
             console.log('user modified successfully');
            var allUsers = response.data.body;
            var title = 'User modified successfully';
            toaster.pop('success', title, title);
        });
    };

    $scope.modifyUser = function(user) {
        var userString = JSON.stringify(user, null, "\t");
        var req = {
            method: 'POST',
            url: $rootScope.constant.SERVICE_URL + '/user/modifyuser',
            data: userString,
        }
        $http(req).then(function successCallback(response) {
            console.log('user modified successfully');
            var allUsers = response.data.body;
            var title = 'User modified successfully';
            toaster.pop('success', title, title);
             $scope.setEditId(-1);
        });
        console.log('Its time to save the user' + user);
    };

    $scope.registeruser = function() {
        var userString = JSON.stringify($scope.newuser, null, "\t"); 

        var req = {
            method: 'POST',
            url: $rootScope.constant.SERVICE_URL + '/user/register',
            data: userString,
        }

        $http(req).then(function successCallback(response) {
            console.log('user registered successfully');
            $scope.register_success=true;
            $scope.newuser=null;
        });
    }

    $scope.searchBarShow=true;
    $scope.searchByEmail = function() {

        var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/user/search/byemail/'+$scope.useremail,
        }

        $http(req).then(function successCallback(response) {
            $scope.userList = response.data.body;
        });
    }
});