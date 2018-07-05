var express = require('express')
var animalRouter = express.Router();

animalRouter.get('/domestic', function(req, res){
  res.send("cat, dog, guinea pig");
})

animalRouter.get('/wild', function(req, res){
  res.send("lion, tiger, bear")
})

module.exports = animalRouter