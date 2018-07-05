var express = require('express');
var app = express();

//in here we include the controllers index
app.use(require('./controllers'))

app.listen(3000, function(){
    console.log("Listening on 3000")
})
