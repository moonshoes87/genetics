// define angular app here

console.log("starting getting geneApp.js");
angular.module('geneApp', [
    'geneApp.controllers'
//    'myApp.filters',
//    'myApp.services',
//    'myApp.directives'
])/*.config(function($routeProvider, $locationProvider){
    $routeProvider.
	when('/', {controller: 'IndexCtrl'}).//, templateUrl: 'template1.ejs'}).
	when('/hello_world', {controller: 'WorldCtrl'}).//, templateUrl: 'template2.ejs'}).
	otherwise({redirect_to: '/'});

    $locationProvider.html5Mode(true);
});*/
//trying different syntax for $routeProvider
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.
	when('/', {controller: 'IndexCtrl', templateUrl: 'partials/gene_list.ejs'}).
	when('/probesets/:gene/:probeset', { controller: 'ShowCtrl', templateUrl: 'partials/gene_show.ejs' }). // trying to make it /:number
	otherwise({redirect_to: '/'});
    //$locationProvider.html5Mode(true); // this fucks it up, for some reason
}]);
