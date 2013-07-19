//access to real database (maybe)

var persist = require("persist");
var genes = require("../models/genes");


// initialize our faux database
/*
Expression(id: integer, mean: float, standard_deviation: float, probeset_id: integer, tissue_id: integer, created_at: datetime, updated_at: datetime)
*/

var expression1 = {
    "mean": 12,
    "stanard_deviation": 15,
    "probeset_id": 1,
    "tissue_id": 3
}
var expression2 = {    
    "mean": 15,
    "stanard_deviation": 88,
    "probeset_id": 1,
    "tissue_id": 2
}
var expression3 = {    
    "mean": 32,
    "stanard_deviation": 43,
    "probeset_id": 2,
    "tissue_id": 1
}
var expression4 = {    
    "mean": 22,
    "stanard_deviation": 65,
    "probeset_id": 2,
    "tissue_id": 3
}

var tissues = [{
    "id": 1,
    "name": "brain",
    "total": 8
},
	       {
    "id": 2,
    "name": "eyeball",
    "total": 78
	       },
	       {
    "id": 3,
    "name": "finger",
    "total": 23
}]


var fake_db = {
    "genes": [
	{
	    "id": 0,
	    "symbol": "Lorem ipsum",
	    "tags": ["fun", "chatty", "sky-diver" ],
	    "probesets": [{
		"id": 1,
		"number": 3872,
		"gene_id": 0,
		"expressions": [
		    expression1,
		    expression2
		]
	    },
			  {
			      "id": 2,	   
			      "number": 3289,
			      "gene_id": 0,
			      "expressions": [
				  expression3,
				  expression4
			      ]
			 }
	]},
	{
	    "id": 1,
	    "symbol": "Sed egestas",
	    "tags": ["serious", "moody", "bright"],
	    "probesets": [
		{
		    "id": 3,
		    "number": 3249,
		    "gene_id": 1
		},
		{
		"id": 4,
		"number": 9876,
		"gene_id": 1
		}
	    ]
	},
	{
	"id": 2,
	"symbol": "something silly",
	"probesets": []
	}
    ]}


// GET

exports.genes = function (req, res) {
  var genes = [];
  fake_db.genes.forEach(function (gene, i) {
    genes.push({
      id: gene.id,
      symbol: gene.symbol,
      tags: gene.tags,
      probesets: gene.probesets
    });
  });
  res.json({
    genes: genes
  });
};


// GET a probeset
exports.probeset = function(req, res){
    console.log(req.params.gene);
    console.log(req.params.probeset);
    console.log(req.params)
    var gene_id = req.params.gene
    var probeset_id = req.params.probeset
    var gene = fake_db.genes[gene_id]
    var probesets = gene.probesets;
    var ps = {}
    for (i=0; i < probesets.length; i++){
	console.log("another probeset");
	console.log("probeset", probesets[i].id);
	console.log("id to match against", probeset_id);
	if(parseInt(probesets[i].id) === parseInt(probeset_id)){
	    ps = probesets[i]
	}
    }
    array = [] // put an array of tissues and means here, then write that to json
    if(ps.expressions){ // this should ultimately grab the proper tissue name, so we have the right stuff for the array
	console.log("heyo")
	for(i=0; i < ps.expressions.length; i++){
	    console.log("i", i);
	    var ex = ps.expressions[i]
	    var tissue_id = ps.expressions[i].tissue_id;
	    tissue_id = tissue_id - 1;  // fenceposts!
//	    console.log("tissue_id", tissue_id)
	    var tissue = tissues[tissue_id]; 
	    console.log("ex: ", ex, " tissue: ", tissue);
	    array.push([tissue.name, ex.mean])
	}
    }
    console.log("array", array);
    res.json({
	gene: gene,
	probeset: ps,
	expressions_array: array
    })
}


//GET single gene

exports.gene = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < fake_db.genes.length) {
    res.json({
      gene: fake_db.genes[id]
    });
  } else {
    res.json(false);
  }
};

// POST
exports.addGene = function (req, res) {
  fake_db.genes.push(req.body);
  res.json(req.body);
};

// PUT
exports.editGene = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < fake_db.genes.length) {
    fake_db.genes[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }
};

// DELETE
exports.deleteGene = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < fake_db.genes.length) {
    fake_db.genes.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};
