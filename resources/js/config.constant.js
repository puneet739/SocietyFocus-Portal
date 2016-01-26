'use strict';

/**
 * Config constant
 */
app.constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});
app.constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //*** Javascript Plugins
        'modernizr': ['external/components-modernizr/modernizr.js'],
        'moment': ['external/moment/min/moment.min.js'],
        'spin': 'external/spin.js/spin.js',

        //*** jQuery Plugins
        'perfect-scrollbar-plugin': ['external/perfect-scrollbar/js/min/perfect-scrollbar.jquery.min.js', 'external/perfect-scrollbar/css/perfect-scrollbar.min.css'],
        'ladda': ['external/ladda/dist/ladda.min.js', 'external/ladda/dist/ladda-themeless.min.css'],
        'sweet-alert': ['external/sweetalert/lib/sweet-alert.min.js', 'external/sweetalert/lib/sweet-alert.css'],
        'chartjs': 'external/chartjs/Chart.min.js',
        'jquery-sparkline': 'external/jquery.sparkline.build/dist/jquery.sparkline.min.js',
        'ckeditor-plugin': 'external/ckeditor/ckeditor.js',
        'jquery-nestable-plugin': ['external/jquery-nestable/jquery.nestable.js'],
        'touchspin-plugin': ['external/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js', 'external/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],

        //*** Controllers
        'AppCtrl':'resources/js/controller/mainCtrl.js',
        // 'dashboardCtrl': 'assets/js/controllers/dashboardCtrl.js',
        // 'iconsCtrl': 'assets/js/controllers/iconsCtrl.js',
        // 'vAccordionCtrl': 'assets/js/controllers/vAccordionCtrl.js',
        // 'ckeditorCtrl': 'assets/js/controllers/ckeditorCtrl.js',
        // 'laddaCtrl': 'assets/js/controllers/laddaCtrl.js',
        // 'ngTableCtrl': 'assets/js/controllers/ngTableCtrl.js',
        // 'cropCtrl': 'assets/js/controllers/cropCtrl.js',
        // 'asideCtrl': 'assets/js/controllers/asideCtrl.js',
        // 'toasterCtrl': 'assets/js/controllers/toasterCtrl.js',
        // 'sweetAlertCtrl': 'assets/js/controllers/sweetAlertCtrl.js',
        // 'mapsCtrl': 'assets/js/controllers/mapsCtrl.js',
        // 'chartsCtrl': 'assets/js/controllers/chartsCtrl.js',
        // 'calendarCtrl': 'assets/js/controllers/calendarCtrl.js',
        // 'nestableCtrl': 'assets/js/controllers/nestableCtrl.js',
        // 'validationCtrl': ['assets/js/controllers/validationCtrl.js'],
        // 'userCtrl': ['assets/js/controllers/userCtrl.js'],
        // 'selectCtrl': 'assets/js/controllers/selectCtrl.js',
        // 'wizardCtrl': 'assets/js/controllers/wizardCtrl.js',
        // 'uploadCtrl': 'assets/js/controllers/uploadCtrl.js',
        // 'treeCtrl': 'assets/js/controllers/treeCtrl.js',
        // 'inboxCtrl': 'assets/js/controllers/inboxCtrl.js',
        // 'xeditableCtrl': 'assets/js/controllers/xeditableCtrl.js',
        // 'chatCtrl': 'assets/js/controllers/chatCtrl.js',
        // 'dynamicTableCtrl': 'assets/js/controllers/dynamicTableCtrl.js',
        // 'NotificationIconsCtrl': 'assets/js/controllers/notificationIconsCtrl.js',
        
        //*** Filters
        'htmlToPlaintext': 'resources/js/controller/HtmlToPlaintext.js',

        //Custom Contoller for the application
        'loginController' : 'resources/js/controller/auth/loginController.js',
        'usercontroller':'resources/views/user/userController.js'
    },
    //*** angularJS Modules
    modules: [{
        name: 'angularMoment',
        files: ['external/angular-moment/angular-moment.min.js']
    }, {
        name: 'toaster',
        files: ['external/AngularJS-Toaster/toaster.js', 'external/AngularJS-Toaster/toaster.css']
    }, {
        name: 'angularBootstrapNavTree',
        files: ['external/angular-bootstrap-nav-tree/dist/abn_tree_directive.js', 'external/angular-bootstrap-nav-tree/dist/abn_tree.css']
    }, {
        name: 'angular-ladda',
        files: ['external/angular-ladda/dist/angular-ladda.min.js']
    }, {
        name: 'ngTable',
        files: ['external/ng-table/dist/ng-table.min.js', 'external/ng-table/dist/ng-table.min.css']
    }, {
        name: 'ui.select',
        files: ['external/angular-ui-select/dist/select.min.js', 'external/angular-ui-select/dist/select.min.css', 'external/select2/dist/css/select2.min.css', 'external/select2-bootstrap-css/select2-bootstrap.min.css', 'external/selectize/dist/css/selectize.bootstrap3.css']
    }, {
        name: 'ui.mask',
        files: ['external/angular-ui-utils/mask.min.js']
    }, {
        name: 'ngImgCrop',
        files: ['external/ngImgCrop/compile/minified/ng-img-crop.js', 'external/ngImgCrop/compile/minified/ng-img-crop.css']
    }, {
        name: 'angularFileUpload',
        files: ['external/angular-file-upload/angular-file-upload.min.js']
    }, {
        name: 'ngAside',
        files: ['external/angular-aside/dist/js/angular-aside.min.js', 'external/angular-aside/dist/css/angular-aside.min.css']
    }, {
        name: 'truncate',
        files: ['external/angular-truncate/src/truncate.js']
    }, {
        name: 'oitozero.ngSweetAlert',
        files: ['external/angular-sweetalert-promised/SweetAlert.min.js']
    }, {
        name: 'monospaced.elastic',
        files: ['external/angular-elastic/elastic.js']
    }, {
        name: 'ngMap',
        files: ['external/ngmap/build/scripts/ng-map.min.js']
    }, {
        name: 'tc.chartjs',
        files: ['external/tc-angular-chartjs/dist/tc-angular-chartjs.min.js']
    }, {
        name: 'flow',
        files: ['external/ng-flow/dist/ng-flow-standalone.min.js']
    }, {
        name: 'uiSwitch',
        files: ['external/angular-ui-switch/angular-ui-switch.min.js', 'external/angular-ui-switch/angular-ui-switch.min.css']
    }, {
        name: 'ckeditor',
        files: ['external/angular-ckeditor/angular-ckeditor.min.js']
    }, {
        name: 'mwl.calendar',
        files: ['external/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js', 'external/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css', 'assets/js/config/config-calendar.js']
    }, {
        name: 'ng-nestable',
        files: ['external/ng-nestable/src/angular-nestable.js']
    }, {
        name: 'vAccordion',
        files: ['external/v-accordion/dist/v-accordion.min.js', 'external/v-accordion/dist/v-accordion.min.css']
    }, {
        name: 'xeditable',
        files: ['external/angular-xeditable/dist/js/xeditable.min.js', 'external/angular-xeditable/dist/css/xeditable.css', 'assets/js/config/config-xeditable.js']
    }, {
        name: 'checklist-model',
        files: ['external/checklist-model/checklist-model.js']
    }, {
        name: 'angular-notification-icons',
        files: ['external/angular-notification-icons/dist/angular-notification-icons.min.js', 'external/angular-notification-icons/dist/angular-notification-icons.min.css']
    }]
});
