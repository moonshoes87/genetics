'use strict';

// write angular controllers here

angular.module('geneApp.controllers', []).
  controller('WorldCtrl', function ($scope, $http) {
    $scope.var1 = "variable!";
    console.log("WorldCtrl works");
}).
  controller('IndexCtrl', function($scope, $http) {
      $scope.var2 = "other variable";
}).
  controller('GeneListCtrl', function GeneListCtrl($scope, $http) {
    $scope.giraffe = "giraffe";
    $http.get('/api/genes').
      success(function(data, status, headers, config){
	console.log(data.genes);
	console.log(status);
	$scope.genes = data.genes; // not tracking correctly as success, for some reason
	console.log("data",data);
	console.log(data.success);
        if(data.success){
	  $scope.genes = data.genes;
	}
      });
  }).
    controller('GeneRealCtrl', function GeneRealCtrl($scope, $http) {
      $http.get('/api/get_genes').
	  success(function(data, status, headers, config){
	      console.log("data", data);
	      console.log("data.genes", data.genes);
	      $scope.stuff = data.stuff;
	      $scope.genes_count = data.genes.count;
	      $scope.genes = data.genes.genes;
	  }); 
  });  // using orm and stuff



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
