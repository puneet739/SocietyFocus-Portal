app.controller("LoginController", function($scope, $http,$q,$localStorage, authentication, $rootScope,eventbus,$aside) {
	$scope.login_error=false;

    $scope.openAside = function (position) {
        $aside.open({
            templateUrl: 'asideContent.html',
            placement: position,
            size: 'sm',
            backdrop: true,
            controller: function ($scope, $uibModalInstance) {
                $scope.ok = function (e) {
                    $uibModalInstance.close();
                    e.stopPropagation();
                };
                $scope.cancel = function (e) {
                    $uibModalInstance.dismiss();
                    e.stopPropagation();
                };
            }
        });
    };

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
        console.log($scope.credentials.username + " pass:" + $scope.credentials.password + "_ "+$scope.credentials.society.value+" _ " + authentication);
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
    $scope.loginFB = function(){
        FB.login(function(response) {
                if (response.status == 'connected') {
                    console.log(response.authResponse.userID);
                    FB.api('/me?fields=name,email', function(userInfo) {
                        console.log(userInfo);
                      },{ scope: 'email' });
                }
            });
        // FB.api('/me', function(res) {
        //     console.log(res);
        //   });

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