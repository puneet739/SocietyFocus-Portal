(function(angular, jcs) {
    'use strict';

    angular.module(jcs.modules.auth.name).factory(jcs.modules.auth.services.authentication, [
        '$q',
        '$timeout',
        'eventbus',
        '$http',
        '$rootScope',
        '$cookieStore',
        '$window',
        '$localStorage',
        '$location',
        function($q, $timeout, eventbus, $http, $rootScope, $cookieStore, $window, $localStorage,$location) {
            
            // $rootScope.user1 = {
            //     "name": "Puneet",
            //     "userRoles": ["admin", "user"]
            // }

            // $rootScope.user2 = {
            //     "name": "Rahul",
            //     "userRoles": {
            //         "role": "user"
            //     }
            // }

            var currentUser,
                createUser = function(name, userid,permissions) {
                    return {
                        name: name,
                        userid: userid,
                        permissions: permissions
                    };
                },

                checkLogedInUser = function() {
                    currentUser = $localStorage.loggedInUser;
                    
                    if (currentUser == null) login();
                    
                    //If user is still null; 
                    if (currentUser == null){
                        logout();
                        return;
                    }
                    $rootScope.logedinuser = currentUser;
                    $rootScope.loginError = false;
                    eventbus.broadcast(jcs.modules.auth.events.userLoggedIn, currentUser);
                    console.log('Trying to return logged in user');
                },

                login = function() {
                    var ourUser = null;
                    ourUser = $rootScope.logedinuser;
                    if (ourUser==null){
                        $location.path("/login/signin");
                        console.log($location.path());
                        return;
                    }
                    var createdUser = createUser(ourUser.name,ourUser.userID, ourUser.userRoles);
                    //defer.resolve(createdUser);
                    $rootScope.logedinuser.name = createdUser.name;
                    $cookieStore.put('authenticated',true);
                    $cookieStore.put('X-Auth-Token',ourUser.token);
                    $localStorage.loggedInUser=createdUser;
                    $location.path("/app/dashboard/");
                    eventbus.broadcast(jcs.modules.auth.events.userLoggedIn, createdUser);
                },
                logout = function() {
                    // we should only remove the current user.
                    // routing back to login login page is something we shouldn't
                    // do here as we are mixing responsibilities if we do.
                    $rootScope.logedinuser=null;
                    currentUser = undefined;
                    $localStorage.loggedInUser=null;
                    $location.path("/login/signin");
                    $cookieStore.remove('authenticated');
                    $cookieStore.remove('X-Auth-Token');
                    eventbus.broadcast(jcs.modules.auth.events.userLoggedOut);
                },
                getCurrentLoginUser = function() {
                    currentUser = $localStorage.loggedInUser;
                    return currentUser;
                    //This needs to be changed.We will get this detail at the time of login and return it without making a server call each time
                    /*var localCurrentUser;
                    
                    var request = new XMLHttpRequest();
                    request.open('GET', "/user", false);
                    request.send(null);
                    if (request.status === 200) {
                        // console.log(request.responseText);
                        // return JSON.parse(request.responseText);
                        var response = JSON.parse(request.responseText);
                        var userAuthorities = response.authorities;
                        var res = [];
                        var i = 0;
                        for (; i < userAuthorities.length; i++) { 
                            
                            res[i] = userAuthorities[i].authority;
                        }
                        localCurrentUser = createUser(response.username, res);
                    }
                    return localCurrentUser;*/

                };

            return {
                login: login,
                logout: logout,
                getCurrentLoginUser: getCurrentLoginUser,
                createUser: createUser,
                checkLogedInUser: checkLogedInUser
            };
        }
    ]);
}(angular, jcs));