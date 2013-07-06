
/**
 * Module dependencies.
 */

//put models in here?
var express = require('express')
  , routes = require('./routes/index')
  , user = require('./routes/user')
  , world = require('./routes/world')
  , api = require('./routes/api')
  , http = require('http')
  , path = require('path')
  , genes = require('./models/genes'); // gene model is defined here

var app = express();


// ORM stuff

//console.log(genes)

var persist = require("persist");
var type = persist.type;

// define some model objects


//console.log(Gene)

var get_genes = function(){
persist.connect({
  driver: 'sqlite3',
  filename: 'development.sqlite3',
  trace: true
}, function(err, conn){
    if(err) { next(err); return; }

    conn.chain({
            genes: genes.all,
            count: genes.count
        }, function(err, results){
            if(err) { console.log(err); return err }//next(err); return; }
            else{
		console.log(results);
                return results;
           }
	}
	      )}
//    console.log("err", err);
//    console.log("connection", connection);
//    Gene.using(connection).all(function(err, genes) {
//	console.log("hello you");
	//console.log(genes);
)
}


//ORM done



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



// API routes
// JSON API     must make these reasonable                                                                         
app.get('/api/genes', api.genes);
//app.get('/api/real_genes', api.real_genes);
app.get('/api/gene/:id', api.gene);
app.post('/api/gene/', api.addGene);
app.put('/api/gene/:id', api.editGene);
app.delete('/api/gene/:id', api.deleteGene);
app.get('/api/get_genes', api.get_genes);  // using orm stuff

// actual routes


//app.get('*', routes.index)
app.get('/', routes.index);
app.get('/partials/:name', routes.partials)
app.get('/hello_world', routes.index)
app.get('/hello', routes.index)
app.get('/users', user.list);
app.get('/GeneApp.js', function(request, response){
    response.sendfile("/Users/nebula/angular_projects/genetics/public/javascripts/geneApp.js");
})
app.get('/controllers.js', function(req, res){
    res.sendfile("/Users/nebula/angular_projects/genetics/public/javascripts/controllers.js");
})
app.get('*', routes.index)



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
