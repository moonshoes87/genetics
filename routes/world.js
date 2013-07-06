
/*
 * GET home page.
 */

exports.hi_world = function(req, res){
  res.render('world', { title: 'hello' });
};

