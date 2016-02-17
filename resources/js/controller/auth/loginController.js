app.controller("LoginController", function($scope, $http,$q , $location, authentication, $rootScope,eventbus) {

	$scope.login_error=false;

    $scope.society=[
        {
            "displayname":"Society1",
            "value":1
        },
        {
            "displayname":"Society2",
            "value":2
        }
    ];
    
    $scope.authenticate = function() {
        console.log($scope.credentials.username + " pass:" + $scope.credentials.password + "_ " + authentication);
        login($scope.credentials.username, $scope.credentials.password,$scope.credentials.society);
    }

    function login(user, pass,society) {
        var deferred = $q.defer();
        var userInfo;
    	var req = {
                method: 'POST',
                url: $rootScope.constant.SERVICE_URL + '/access/login',
                headers: {
                    'X-Username': user,
                    'X-Password': pass,
                    'X-Society' : society
                },
            }

            $http(req).then(function successCallback(response) {
                var currentUser = null;
                var userObject = response.data.body.userDetails.user;
                var firstname=userObject.firstname;
                var userRole=[];
                for (i=0; i<userObject.userRoleses.length; i++){
                    userRole[i]=userObject.userRoleses[i].userRole;
                }
                var accessToken = response.data.body.token;
                $rootScope.logedinuser={
                    "name": firstname,
                    "userRoles": userRole,
                    "token":accessToken,
                    "userID" : userObject.userid
                }
                console.log('user have logged in successfully');
                authentication.login();
                deferred.resolve(userInfo);
            },function errorCallback(error){
                $scope.login_error=true;
                authentication.logout();
            })
            return deferred.promise;
    }

    $scope.logout = function() {
        console.log("Now we are trying to logout the current user");
        authentication.logout();
    }

    $scope.createuser = function(user, permission) {
        console.log(user + "XXXX" + password);
    }

    $scope.submit = function() {
        alert($http);
        console.log('Submitting here');
    }

});