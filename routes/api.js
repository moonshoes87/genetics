//access to real database (maybe)

var persist = require("persist");
var genes = require("../models/genes");


// initialize our faux database
var fake_db = {
  "genes": [
    {
      "id": 1,
      "symbol": "Lorem ipsum"
    },
    {
      "id": 2,
      "symbol": "Sed egestas"
    }
  ]
};

// GET

//need to add in a success thing for this
// this is the GET funciton that uses the fake db
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

// successful??  orm usage
 //get function that uses the real database
exports.get_genes = function(req, res){
console.log("doing get_genes()");
persist.connect({
  driver: 'sqlite3',
  filename: 'development.sqlite3',
  trace: true
}, function(err, conn){
    if(err) { next(err); return; }

    conn.chain({
//blogs: models.Blog.include(["category"]).jqgrid(req.query).all,
            genes: genes.include(["probesets"]).all,
            count: genes.count,
	    first: genes.first
    }, function(err, results){
            if(err) { console.log(err); return err }//next(err); return; }                                                             
            else{
                console.log("results", results["genes"]);
		probesets = [];
		var json = {
		    genes: results
		}
//		var json = results;
		//res.end(JSON.stringify(json, null, '\t'));
//		res.end(JSON.stringify(results["genes"]))
		console.log("hello", JSON.stringify(json, null, '\t'));
		res.end(JSON.stringify(json, null, '\t'));
//		res.end("hello");
		//return results;
           }
	    }
              )}
)}
// end

/*
exports.blogs = function(req, res, next){
  persist.connect(function(err, conn) {
    if(err) { next(err); return; }

    conn.chain({
      blogs: models.Blog.include(["category"]).jqgrid(req.query).all,
      count: models.Blog.include(["category"]).jqgridCount(req.query).count
    }, function(err, results) {
      if(err) { next(err); return; }

      var json = {
        total: Math.ceil(results.count / req.query.rows),
        page: req.query.page,
        records: results.count,
        rows: results.blogs.map(function(blog) {
          return {
            id: blog.id,
            cell: [
              blog.id,
              blog.title,
              blog.category.name,
              blog.created.toISOString(),
              blog.lastUpdated.toISOString(),
              "<a href='/blogs/" + blog.id + "'>Edit</a>"
            ]
          };
        })
      };

      res.end(JSON.stringify(json, null, '\t'));
    });
  });
};*/

//done persist



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


// GENE
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
