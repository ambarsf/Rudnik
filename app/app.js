var app = angular.module('AngularScaffold', ['ui.calendar','ui.router', 'ngStorage', 'AngularScaffold.Services', 'AngularScaffold.Controllers']);

angular.module('AngularScaffold.Controllers', []);
angular.module('AngularScaffold.Services', []);

app.config(['$stateProvider', '$urlRouterProvider','uiCalendarConfig', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('home');

	$stateProvider

		;
}])
