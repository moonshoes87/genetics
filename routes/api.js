//access to real database (maybe)

var persist = require("persist");
var genes = require("../models/genes");


// initialize our faux database
var fake_db = {
  "genes": [
    {
	"id": 1,
	"symbol": "Lorem ipsum",
	"probesets": {
	    "id": 1,
	    "number": 3872,
	    "gene_id": 1
    },
    {
      "id": 2,
      "symbol": "Sed egestas"
    }
  ]
};

// GET

exports.genes = function (req, res) {
  var genes = [];
  fake_db.genes.forEach(function (gene, i) {
    genes.push({
      id: gene.id,
      symbol: gene.symbol
    });
  });
  res.json({
    genes: genes
  });
};

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
