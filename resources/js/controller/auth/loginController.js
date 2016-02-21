app.controller("LoginController", function($scope, $http,$q,$localStorage , $location, authentication, $rootScope,eventbus) {
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
    
    $scope.getSociety = function() {
        var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/society',
        }
        $http(req).then(function successCallback(response) {
            socities = response.data.body;
            var societyList = [];
            for (i = 0; i < socities.length; i++) {
                var society = {
                    "displayname": socities[i].name,
                    "value": socities[i].societyId,
                    "societypic":socities[i].societypic
                };
                societyList[i] = society;
            }
            $scope.society = societyList;
            $scope.societyList = societyList;
            console.log($scope.society);
        });
    }    

    $scope.authenticate = function() {
        console.log($scope.credentials.username + " pass:" + $scope.credentials.password + "_ " + authentication);
        login($scope.credentials.username, $scope.credentials.password,$scope.credentials.society.value);
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
                $localStorage.society=response.data.body.society;
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