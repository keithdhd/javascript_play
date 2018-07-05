var express = require('express');
var catRouter = express.Router();
var cats = ["Bengal", "British Shorthair", "Siamese"]; 

catRouter.get('/', function(req, res) {
  res.json({data:cats});
});

catRouter.get('/:id', function(req, res){
  res.json({data:cats[req.params.id]});
});

catRouter.put('/:id', function(req, res) {
  cats[req.params.id] = req.body.cat;
  res.json({data: cats});
});

catRouter.post('/', function(req, res) {
  console.log(req.body)
  cats.push(req.body.cat);
  res.json({data: cats});
});

catRouter.delete('/:id', function(req, res) {
  cats.splice(req.params.id, 1);
  res.json({data: cats});
});

module.exports = catRouter;