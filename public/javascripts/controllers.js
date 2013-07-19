'use strict';

// write angular controllers here

angular.module('geneApp.controllers', []).
  controller('WorldCtrl', function ($scope, $http) {
    $scope.var1 = "variable!";
    console.log("WorldCtrl works");
}).
  controller('IndexCtrl', function($scope, $http, $location) {
      $scope.var2 = "other variable";
      $http.get("/api/genes").
	  success(function(data, status, headers, config){
	      $scope.genes = data.genes;
	      console.log($scope.genes);
	  })
      $scope.select_probeset = function(gene, ps){
	  console.log("selecting probeset " + ps);
	  $location.path("/probesets/" + gene + '/' + ps);
      }
  }).
  controller('ShowCtrl', function($scope, $http, $location, $route, $routeParams){
      console.log($routeParams)
      $scope.which_probeset = $routeParams.probeset
      $scope.which_gene = $routeParams.gene
      $scope.plot_datas = [[7, "ear"], [7, "finger"], [7, "throat"]];
      $http.get('api/' + $scope.which_gene + '/' + $scope.which_probeset).
	  success(function(data){
	    console.log(data);
	      $scope.gene = data.gene
	      $scope.probeset = data.probeset
	      $scope.expressions = data.probeset.expressions
	      $scope.data_array = data.expressions_array
//	      $scope.plot_datas = [[3, "ear"], [1, "finger"], [2, "throat"]];
	  })
      // this yields the number of the probeset we want to call up, hooray!
      // we will need: the gene the probeset is associated with, all the expressions, and thus all the tissues

})



/*angular.module('geneApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
//      $scope.name = data.name;                                                                                                       
        $scope.name = "Name name name";
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });

  }).
*/
