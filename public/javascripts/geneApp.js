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
	when('/', {controller: 'IndexCtrl', templateUrl: 'partials/partial1'}).//, templateUrl: 'template1.ejs'}).
	when('/hello_world', {controller: 'IndexCtrl', templateUrl: 'partials/partial2'}).//, templateUrl: 'template2.ejs'}).
	when('/hello', {controller: 'WorldCtrl', templateUrl: 'partials/partial1'}).//, templateUrl: 'template1.ejs'}).
	when('/genes', {controller: 'GeneListCtrl', templateUrl: 'partials/gene_index'}).
	when('/get_genes', {controller: 'GeneRealCtrl', templateUrl: 'partials/gene_index'}). // using orm stuff
	otherwise({redirect_to: '/'});
    $locationProvider.html5Mode(true);
}]);
