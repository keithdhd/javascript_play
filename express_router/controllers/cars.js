var express = require('express')
var carRouter = express.Router();

carRouter.get('/brands', function(req, res){
  res.send("Audi, Porsche, VW");
})

carRouter.get('/models', function(req, res){
  res.send("Audi Q7, Porsche 911, VW Golf")
})

module.exports = carRouter