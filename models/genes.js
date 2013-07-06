var persist = require("persist");
var type = persist.type;



module.exports = Expression = persist.define("Expression", {
    "mean": { type: type.FLOAT },
    "standard_deviation": { type: type.FLOAT },
    "probeset_id" : { type: type.INTEGER },
    "tissue_id": { type: type.INTEGER }
})
//    (id: integer, mean: float, standard_deviation: float, probeset_id: integer, tissue_id: integer, created_at: datetime, updated_at: datetime)

module.exports = Probeset = persist.define("Probeset", {
//    "id": { type: type.INTEGER },
    "number": { type: type.STRING },
    "gene_id": { type: type.INTEGER }
}).hasMany(Expression)
//    id: integer, number: string, gene_id: integer, 


module.exports = Gene = persist.define("Gene", {
//    "created": { type: type.DATETIME, defaultValue: function() { return new Date() } },
    "symbol": { type: type.STRING }
}).hasMany(Probeset)


/*
module.exports = Blog = persist.define("Blog", {
  "created": { type: type.DATETIME, defaultValue: function() { return new Date() } },
  "lastUpdated": { type: type.DATETIME },
  "title": { type: type.STRING },
  "body": { type: type.STRING }
})
  .hasOne(Category)
  .hasMany(Keyword, { through: "blogs_keywords" });

Blog.onSave = function(obj, connection, callback) {
  obj.lastUpdated = new Date();
  callback();
}

*/
