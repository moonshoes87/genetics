
/**
 * Module dependencies.
 */

//put models in here?
var express = require('express')
  , routes = require('./routes/index')
  , api = require('./routes/api')
  , http = require('http')
  , path = require('path')
  , genes = require('./models/genes') // gene model is defined here


var app = express();


// ORM stuff

//console.log(genes)

var persist = require("persist");
var type = persist.type;


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



// JSON API     must make these reasonable                                                                         
app.get('/api/genes', api.genes);
app.get('/api/:gene/:probeset', api.probeset);
//app.get('/api/real_genes', api.real_genes);
//app.get('/api/gene/:id', api.gene);
//app.post('/api/gene/', api.addGene);
//app.put('/api/gene/:id', api.editGene);
//app.delete('/api/gene/:id', api.deleteGene);

// actual routes

//app.get('*', routes.index)
app.get('/partials/:name', routes.partials)
app.get('/', routes.index);
app.get('/stylesheets/style.css', function(request, response){
    response.sendfile("/Users/nebula/angular_projects/genetics/public/stylesheets/style.css");
})
app.get('/GeneApp.js', function(request, response){
    response.sendfile("/Users/nebula/angular_projects/genetics/public/javascripts/geneApp.js");
})
app.get('/controllers.js', function(req, res){
    res.sendfile("/Users/nebula/angular_projects/genetics/public/javascripts/controllers.js");
})
app.get('/directives.js', function(req, res){
    res.sendfile("/Users/nebula/angular_projects/genetics/public/javascripts/directives.js");
})
app.get('/jquery', function(req, res){
    res.sendfile("/Users/nebula/angular_projects/genetics/public/javascripts/lib/jquery/the_file.js");
})
app.get('/flot', function(req, res){
    res.sendfile("/Users/nebula/angular_projects/genetics/public/javascripts/lib/flot/jquery.flot.js");
})
app.get('/flot_categories', function(req, res){
    res.sendfile("/Users/nebula/angular_projects/genetics/public/javascripts/lib/flot/jquery.flot.categories.js");
})

//               /Users/nebula/angular_projects/genetics/public/javascripts/lib/flot
//app.get("partials/partial1", function(req, res){
//    res.sendfile("/Users/nebula/angular_projects/views/partials/partial1.ejs");
//})
app.get('*', routes.index)



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
