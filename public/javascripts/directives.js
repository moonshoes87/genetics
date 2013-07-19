angular.module('geneApp.directives', []).
    directive('chart', function(){
    return{
        restrict: 'E', // chart can only be an element
        link: function(scope, elem, attrs){
//	    console.log("scope", scope)
//	    console.log("elem", elem)
//	    console.log("attrs", attrs)
	    var dataize = function(data){
//		console.log("data", data)
		return $.map(data,function(tissue){ //(tissue){
		    return[[tissue.total, tissue.name]]
		});
	    }
            var chart = null,
                opts  = { };
                   
            scope.$watch(attrs.ngModel, function(v){ //where does v come from??? 
		console.log('v', v)
	//	v = dataize(v)  // necessary for categories mode
		v = [v] // depends on how the data comes
//		v = v 
//		v = [ [[0, 1], [1, 5], [2, 2]] ]
		console.log("final v", v)

	var opts = {
	    series: {
		bars: {
		    fill: true,
		    show: true,
		    barWidth: 0.6,
		    horizontal: true,
		    align: "center" }
	    },
	    xaxis: {
//		mode: "categories",
		tickLength: 0
            },
	    yaxis: {
//		mode: "categories",
		position: top
	    }
	}
//		$.plot(elem, v, opts)
                if(!chart){
		    console.log("elem", elem)
		    console.log("v", v)
		    console.log("opts", opts)
                    chart = $.plot(elem, v , opts);
                    $(elem).show();
                }else{
                    chart.setData(v);
                    chart.setupGrid();
                    chart.draw();
                }
            }, true)
	    
        }
    };
});

/*

geneApp.directive('copychart', function(){
    return{
        restrict: 'E', // chart can only be an element
        link: function(scope, elem, attrs){
//	    console.log("scope", scope)
//	    console.log("elem", elem)
//	    console.log("attrs", attrs)
	    var dataize = function(data){
//		console.log("data", data)
		return $.map(data,function(probeset){ //(tissue){
		   // console.log(probeset.id, probeset.number)
		    return[[probeset.id, probeset.number, "lori's variable of fun"]]// [[tissue.total, tissue.name]]
		});
	    }
            var chart = null,
                opts  = { };
                   
            scope.$watch(attrs.ngModel, function(v){ //where does v come from??? 
//		console.log('v', v)
		v = dataize(v)
//		console.log('new v', v)
		v = [v]
//		v = [ [[0, 1], [1, 5], [2, 2]] ]
		console.log(v)

	var opts = {
	    series: {
		bars: {
		    fill: true,
		    show: true,
		    barWidth: 0.6,
		    horizontal: true,
		    align: "center" }
	    },
	    xaxis: {
//		mode: "categories",
		tickLength: 0
            },
	    yaxis: {
		mode: "categories",
		position: top
	    }
	}

                if(!chart){
                    chart = $.plot(elem, v , opts);
//		    console.log("elem", elem)
                    $(elem).show();
                }else{
                    chart.setData(v);
                    chart.setupGrid();
                    chart.draw();
                }
            }, true)
	    
        }
    };
});


geneApp.filter('sort_by_totals', function(){
    return function(number){
	if(number >= 5){
	    return number }
	else{
	    return false
	}
    }
})


*/
