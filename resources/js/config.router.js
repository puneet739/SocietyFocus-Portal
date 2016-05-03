'use strict';

/**
 * Config for the router
 */
app.config(['$stateProvider','$locationProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
function ($stateProvider, $locationProvider,$urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {

    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;

    // LAZY MODULES

    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: jsRequires.modules
    });

    $locationProvider.html5Mode(false).hashPrefix('!');
    // APPLICATION ROUTES
    // -----------------------------------
    // For any unmatched url, redirect to /app/dashboard
    $urlRouterProvider.otherwise("/app/dashboard");

    // Set up the states
    $stateProvider.state('app', {
        url: "/app",
        templateUrl: "resources/views/app.html",
        resolve: loadSequence('modernizr', 'moment', 'angularMoment', 'uiSwitch', 'perfect-scrollbar-plugin', 'toaster', 'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert', 'truncate', 'htmlToPlaintext', 'angular-notification-icons','loginController','elastic'),
        abstract: true,
        data: {
            requireLogin: true
          }
    }).state('app.dashboard', {
        url: "/dashboard",
        templateUrl: "resources/views/dashboard/dashboard.html",
        title: 'Dashboard',
        resolve: loadSequence('dashboardController'),
        ncyBreadcrumb: {
            label: 'Dashboard'
        }
    })

    //User Routes here
    .state('app.user', {
        url: '/user',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'User',
        resolve: loadSequence('ngTable','usercontroller'),
        ncyBreadcrumb: {
            label: 'User'
        }
    }).state('app.user.view', {
        url: "/view",
        templateUrl: "resources/views/user/view.html",
        title: 'View Registerd Users',
        ncyBreadcrumb: {
            label: 'View Registerd Users'
        }
    }).state('app.user.register', {
        url: "/register",
        templateUrl: "resources/views/user/register.html",
        title: 'Register New User',
        ncyBreadcrumb: {
            label: 'Register New User'
        }
    }).state('app.user.edit', {
        url: "/edit",
        templateUrl: "resources/views/user/view.html",
       
        title: 'Search User',
        ncyBreadcrumb: {
            label: 'Search User'
        }
    }).state('app.user.search', {
        url: "/search",
        templateUrl: "resources/views/user/searchUser.html",
        title: 'Search User',
        ncyBreadcrumb: {
            label: 'Search User'
        }
    }).state('app.user.settings', {
        url:'/settings',
        templateUrl:"resources/views/user/settings.html",
        resolve: loadSequence('angularFileUpload','updatecontroller','ngImgCrop'),
        title: 'User Settings',
        ncyBreadcrumb: {
            label: 'User Settings'
        }
    })


    //Asset Routes here
    .state('app.asset', {
        url: '/asset',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Asset',
        resolve: loadSequence('ngTable','assetController'),
        ncyBreadcrumb: {
            label: 'Asset'
        }
    }).state('app.asset.register', {
        url: '/register',
        templateUrl: 'resources/views/asset/register.html',
        title: 'Register',
        ncyBreadcrumb: {
            label: 'Register'
        }
    }).state('app.asset.view', {
        url: '/view',
        templateUrl: 'resources/views/asset/view.html',
        title: 'View Assets',
        ncyBreadcrumb: {
            label: 'View Assets'
        }
    })
    
    //Asset Bookings
    .state('app.asset.booking', {
        url: '/booking',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Asset',
        resolve: loadSequence('ngTable','assetBookingController'),
        ncyBreadcrumb: {
            label: 'Asset'
        }
    }).state('app.asset.booking.view', {
        url: '/view',
        templateUrl: 'resources/views/assetbooking/view.html',
        title: 'Register',
        ncyBreadcrumb: {
            label: 'View Asset'
        }
    }).state('app.asset.booking.asset', {
        url: '/asset',
        templateUrl: 'resources/views/assetbooking/listAsset.html',
        title: 'Register',
        ncyBreadcrumb: {
            label: 'List Asset'
        }
    }).state('app.asset.booking.id', {
        url: '/asset/{id}',
        templateUrl: 'resources/views/assetbooking/listAsset.html',
        title: 'Book Asset',
        ncyBreadcrumb: {
            label: 'Book Asset'
        }
    }).state('app.asset.booking.my', {
        url: '/viewMy',
        templateUrl: 'resources/views/assetbooking/myAsset.html',
        title: 'My Asset',
        ncyBreadcrumb: {
            label: 'My Asset'
        }
    })
    
    //Vehicles Features
    .state('app.vehicle', {
        url: '/vehicle',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Vehicle Registration',
        resolve: loadSequence('vehicleController'),
        ncyBreadcrumb: {
            label: 'Vehicle'
        }
    }).state('app.vehicle.add', {
        url: '/add',
        templateUrl: 'resources/views/vehicle/addVehicle.html',
        title: 'Vehicle Registration',
        resolve: loadSequence('ui.select','angularQRcode','QRgen'),
        ncyBreadcrumb: {
            label: 'Add Vehicle'
        }
    }).state('app.vehicle.update', {
        url: '/update',
        templateUrl: 'resources/views/vehicle/updateVehicle.html',
        title: 'Vehicle Registration',
        ncyBreadcrumb: {
            label: 'Update Vehicle'
        }
    }).state('app.vehicle.getmy', {
        url: '/my',
        templateUrl: 'resources/views/vehicle/myVehicle.html',
        title: 'View My Vehicles',
        resolve: loadSequence('vehicleController','ui.select','angularQRcode','QRgen'),
        ncyBreadcrumb: {
            label: 'View My Vehicles'
        }
    }).state('app.vehicle.byuid', {
        url: '/get/{id}',
        templateUrl: 'resources/views/vehicle/vehiclebyid.html',
        title: 'Vehicle By ID',
        resolve: loadSequence('vehicleController','ui.select','angularQRcode','QRgen'),
        ncyBreadcrumb: {
            label: 'Vehicle By ID'
        }
    }).state('app.vehicle.uservehicle', {
        url: '/uservehicle/{userid}',
        templateUrl: 'resources/views/vehicle/userVehicle.html',
        title: 'User Vehicle',
        resolve: loadSequence('vehicleController','ui.select','angularQRcode','QRgen'),
        ncyBreadcrumb: {
            label: 'User Vehicle'
        }
    })

    //Complaints Features
    .state('app.complaint', {
        url: '/complaint',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Complaints',
        resolve: loadSequence('complaintController'),
        ncyBreadcrumb: {
            label: 'Complaints'
        }
    }).state('app.complaint.register', {
        url: '/register',
        templateUrl: 'resources/views/complaint/registerComplaint.html',
        title: 'Register Complaints',
        ncyBreadcrumb: {
            label: 'Register Complaints'
        }
    }).state('app.complaint.viewall', {
        url: '/viewall',
        templateUrl: 'resources/views/complaint/viewAllComplaint.html',
        title: 'View All Complaints',
        ncyBreadcrumb: {
            label: 'View All Complaints'
        }
    }).state('app.complaint.my', {
        url: '/viewmy',
        templateUrl: 'resources/views/complaint/viewMyComplaint.html',
        title: 'View My Complaints',
        ncyBreadcrumb: {
            label: 'View My Complaints'
        }
    }).state('app.complaint.id', {
        url: '/viewbyid/{id}',
        templateUrl: 'resources/views/complaint/viewComplaintById.html',
        title: 'View Complaint',
        ncyBreadcrumb: {
            label: 'View Complaint'
        }
    }).state('app.complaint.search', {
        url: '/viewbyid',
        templateUrl: 'resources/views/complaint/viewComplaintById.html',
        title: 'View Complaint',
        ncyBreadcrumb: {
            label: 'View Complaint'
        }
    })

    //Payment Features
    .state('app.payment', {
        url: '/payment',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Payment',
        resolve: loadSequence('paymentController'),
        ncyBreadcrumb: {
            label: 'Payment'
        }
    }).state('app.payment.mywallet', {
        url: '/mywallet',
        templateUrl: 'resources/views/payment/mywallet.html',
        title: 'My Wallet',
        ncyBreadcrumb: {
            label: 'My Wallet'
        }
    }).state('app.payment.adminadd', {
        url: '/addminadd',
        templateUrl: 'resources/views/payment/adminadd.html',
        title: 'Admin Money',
        ncyBreadcrumb: {
            label: 'Admin Money'
        }
    }).state('app.payment.mytransactions', {
        url: '/mytransactions',
        templateUrl: 'resources/views/payment/lasttransactions.html',
        title: 'Last Transactions',
        ncyBreadcrumb: {
            label: 'Last Transactions'
        }
    }).state('app.payment.paynow', {
        url: '/paynow',
        templateUrl: 'resources/views/payment/makepayment.html',
        title: 'Pay Now',
        ncyBreadcrumb: {
            label: 'Pay Now'
        }
    }).state('app.payment.failure', {
        url: '/failure/{id}',
        templateUrl: 'resources/views/payment/failedPayment.html',
        title: 'Payment Failed',
        ncyBreadcrumb: {
            label: 'Payment Failed'
        }
    }).state('app.payment.success', {
        url: '/success/{id}',
        templateUrl: 'resources/views/payment/successPayment.html',
        title: 'Payment Successfull',
        ncyBreadcrumb: {
            label: 'Payment Successfull'
        }
    })

    //Subscription Pages
    .state('app.subscription', {
        url: '/subscription',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Subscription',
        resolve: loadSequence('subscriptionController'),
        ncyBreadcrumb: {
            label: 'Subscription'
        }
    }).state('app.subscription.add', {
        url: '/add',
        templateUrl: 'resources/views/subscription/addSubscription.html',
        title: 'Add Subscription',
        ncyBreadcrumb: {
            label: 'Add Subscription'
        }
    })

    //Bulk Features
    .state('app.notice', {
        url: '/notice',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Notice',
        resolve: loadSequence('noticeController'),
        ncyBreadcrumb: {
            label: 'Notice'
        }
    }).state('app.notice.add', {
        url: '/add',
        templateUrl: 'resources/views/notice/addnotice.html',
        title: 'Add Notice',
        ncyBreadcrumb: {
            label: 'Add Notice'
        }
    }).state('app.notice.view', {
        url: '/view',
        templateUrl: 'resources/views/notice/viewnotice.html',
        title: 'View NoticeBoard',
        ncyBreadcrumb: {
            label: 'View NoticeBoard'
        }
    })

    //Bulk Features
    .state('app.bulk', {
        url: '/bulk',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Bulk',
        resolve: loadSequence('bulkController','angularFileUpload'),
        ncyBreadcrumb: {
            label: 'BulkController'
        }
    }).state('app.bulk.user', {
        url: '/user',
        templateUrl: 'resources/views/bulk/register_user.html',
        title: 'Register User',
        ncyBreadcrumb: {
            label: 'Register User'
        }
    })

    //Login Routese here
    .state('login', {
        url: '/login',
        template: '<div ui-view class="fade-in-right-big smooth"></div>',
        abstract: true
    }).state('login.signin', {
        url: '/signin',
        templateUrl: "resources/views/login/signin.html",
        resolve: loadSequence('loginController','ui.select')
    }).state('login.forgot', {
        url: '/forgot',
        templateUrl: "assets/views/login_forgot.html"
    }).state('login.registration', {
        url: '/registration',
        templateUrl: "assets/views/login_registration.html"
    }).state('login.lockscreen', {
        url: '/lock',
        templateUrl: "assets/views/login_lock_screen.html"
    });

    // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
    function loadSequence() {
        var _args = arguments;
        return {
            deps: ['$ocLazyLoad', '$q',
			function ($ocLL, $q) {
			    var promise = $q.when(1);
			    for (var i = 0, len = _args.length; i < len; i++) {
			        promise = promiseThen(_args[i]);
			    }
			    return promise;

			    function promiseThen(_arg) {
			        if (typeof _arg == 'function')
			            return promise.then(_arg);
			        else
			            return promise.then(function () {
			                var nowLoad = requiredData(_arg);
			                if (!nowLoad)
			                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
			                return $ocLL.load(nowLoad);
			            });
			    }

			    function requiredData(name) {
			        if (jsRequires.modules)
			            for (var m in jsRequires.modules)
			                if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
			                    return jsRequires.modules[m];
			        return jsRequires.scripts && jsRequires.scripts[name];
			    }
			}]
        };
    }
}]);