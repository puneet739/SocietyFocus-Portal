/** 
  * declare 'clip-two' module with dependencies
*/
'use strict';
angular.module("ziron-module", [
	'ngAnimate',
	'ngCookies',
	'ngStorage',
	'ngSanitize',
	'ngTouch',
	'ui.router',
	'ui.bootstrap',
	'oc.lazyLoad',
	'cfp.loadingBar',
	'ncy-angular-breadcrumb',
	'duScroll',
	'pascalprecht.translate',
]);

var app = angular.module(jcs.modules.app.name, ['ziron-module',jcs.modules.core.name,
                                                jcs.modules.auth.name,
                                                jcs.modules.admin.name,
                                                jcs.modules.pages.name]);