app.run(['$rootScope', '$state', '$stateParams', '$window', 'authentication', '$cookieStore', 'Analytics',
    function($rootScope, $state, $stateParams, $window, authentication, $cookieStore, Analytics) {

        $rootScope.constant={
            //SERVICE_URL:"http://localhost:8080/zircon/services"

            //Development URL
            // SERVICE_URL:"http://localhost:80/service"

            //Production URL 
            SERVICE_URL:"http://societyfocus.com/service"
        }
        // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
        FastClick.attach(document.body);
        $window.fbAsyncInit = function() {
            FB.init({ 
              appId: '1749929318576139', 
              status: true, 
              cookie: true, 
              xfbml: true,
              version: 'v2.5'
            });
        };

         (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

        

        // Set some reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.CONSTANT={

        }
        // GLOBAL APP SCOPE
        // set below basic information
        $rootScope.app = {
            name: 'Society Focus', // name of your project
            author: 'Society Focus', // author's name or company name
            description: 'Society Focus', // brief description
            contact: '9711616135',
            version: '1.0', // current version
            year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
            isMobile: (function() { // true if the browser is a mobile device
                var check = false;
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    check = true;
                };
                return check;
            })(),
            theme: 'theme-3',
            logo: 'resources/images/logo_black.png', // relative path of the project logo
            layout: {
                isNavbarFixed: false, //true if you want to initialize the template with fixed header
                isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
                isSidebarClosed: true, // true if you want to initialize the template with closed sidebar
                isFooterFixed: true, // true if you want to initialize the template with fixed footer
            }
        };
        $rootScope.user = {
            name: 'Puneet',
            job: 'ng-Dev',
            picture: 'app/img/user/02.jpg'
        };

        // Track online and offline status if network goes on and off
        $rootScope.online = navigator.onLine;
        $window.addEventListener("offline", function() {
            $rootScope.$apply(function() {
                $rootScope.online = false;
            });
        }, false);
        $window.addEventListener("online", function() {
            $rootScope.$apply(function() {
                $rootScope.online = true;
            });
        }, false);

        angular.element(document).ready(function(){
            console.log('This function will be called everytime page loads. And this will check if the person has loged in or not');
            authentication.checkLogedInUser();
        });
    }
]);
// translate config
app.config(['$translateProvider',
    function($translateProvider) {

        // prefix and suffix information  is required to specify a pattern
        // You can simply use the static-files loader with this pattern:
        $translateProvider.useStaticFilesLoader({
            prefix: 'resources/i18n/',
            suffix: '.json'
        });

        // Since you've now registered more then one translation table, angular-translate has to know which one to use.
        // This is where preferredLanguage(langKey) comes in.
        $translateProvider.preferredLanguage('en');

        // Store the language in the local storage
        $translateProvider.useLocalStorage();

        // Enable sanitize
        $translateProvider.useSanitizeValueStrategy('sanitize');

    }
]);

app.directive('adsense', function () {
        return {
            restrict: 'A',
            replace: true,       
            templateUrl: "resources/views/directives/googleAdsense.html",
            controller: function () {
                 console.log("Google Adsense is being added!");
                (adsbygoogle = window.adsbygoogle || []).push({});
            }
        };
    });

app.filter('format',function(){
  return function(input, format) {
    var date=input.replace("T"," ");
    return moment(new Date(date)).format(format);
  };
});

app.filter('positive', function() {
    return function(input) {
        if (!input) {
            return 0;
        }
        return Math.abs(input);
    };
});

// Angular-Loading-Bar
// configuration
app.config(['cfpLoadingBarProvider',
    function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = false;

    }
]);

app.factory('httpErrorResponseInterceptor', ['$q', '$location', '$window', '$rootScope', '$cookieStore',
    function($q, $location, $window, $rootScope, $cookieStore) {
        return {
            response: function(responseData) {
                $('#loadingDiv').hide(); 
                return responseData;
            },
            responseError: function error(response) {
                switch (response.status) {
                    case 403:
                        $location.path("/403");
                        break;
                    case 401:
                        $location.path("/login/signin");
                        break;

                }
                $('#loadingDiv').hide(); 
                return $q.reject(response);
            }
        };
    }
]);

app.factory('httpRequestInterceptor', ['$rootScope', '$cookieStore', //may cause refresh problems if accessed this way
    function($rootScope, $cookieStore) {
        return {
            'request': function(config) {
                if ($cookieStore.get('authenticated')) {
                    config.headers['X-Auth-Token'] = $cookieStore.get('X-Auth-Token');
                }
                $('#loadingDiv').show(); 
                return config;
            }
        };
    }
]);

//Http Intercpetor to check auth failures for xhr requests
app.config(['$httpProvider',
    function($httpProvider) {
        $httpProvider.interceptors.push('httpErrorResponseInterceptor');
        $httpProvider.interceptors.push('httpRequestInterceptor');
    }
]);
app.config(['AnalyticsProvider',
    function(AnalyticsProvider) {
        AnalyticsProvider.setAccount([
           { tracker: 'UA-74141978-1', name: "tracker1" }
        ]);
        AnalyticsProvider.trackPages(true);
        AnalyticsProvider.trackUrlParams(true);

    }
]);

// app.factory('authenticationSVC', ['$http', '$q', '$window', '$rootScope', '$location', '$cookieStore',
//     function($http, $q, $window, $rootScope, $location, $cookieStore) {
//         function login(username, password) {
//             console.log('Trying to validate this user and password' + username + " and " + password);

            
//         }

//         return {
//             login: login
//         };

//     }
// ]);