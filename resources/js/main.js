app.run(['$rootScope', '$state', '$stateParams', '$window', 'authentication', '$cookieStore',
    function($rootScope, $state, $stateParams, $window, authentication, $cookieStore) {

        $rootScope.constant={
            // SERVICE_URL:"http://zircon.com/localservice"
            SERVICE_URL:"http://societyfocus.com/service"
        }
        // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
        FastClick.attach(document.body);

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
            layout: {
                isNavbarFixed: false, //true if you want to initialize the template with fixed header
                isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
                isSidebarClosed: true, // true if you want to initialize the template with closed sidebar
                isFooterFixed: true, // true if you want to initialize the template with fixed footer
                logo: 'assets/images/logo.png', // relative path of the project logo
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