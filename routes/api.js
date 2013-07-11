//access to real database (maybe)

var persist = require("persist");
var genes = require("../models/genes");


// initialize our faux database
var fake_db = {
    "genes": [
	{
	    "id": 0,
	    "symbol": "Lorem ipsum",
	    "tags": ["fun", "chatty", "sky-diver" ],
	    "probesets": [{
		"id": 1,
		"number": 3872,
		"gene_id": 0
	    },
			  {
			      "id": 2,	   
			      "number": 3289,
			      "gene_id": 0
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
    console.log("ps", ps)
/*    for (probeset in gene.probesets){
	return 0
	//console.log("probeset", probeset) // mysteriously does not give an actual probeset
    }*/

    res.json({
	gene: gene,
	probeset: ps
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
