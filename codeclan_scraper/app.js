var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
results = [];

request('http://codeclan.com/about/', function(err, response, html){
  if(!err && response.statusCode == 200){
    var loader = cheerio.load(html);
    loader('div.team-image').each(function(i, element){
      var url = loader(this).attr('style');
      results.push(url);
    });
    
    for(result of results){
       console.log('result', result.substring(22, result.length-2))
    }

      var getTheURLS = results.map(function(result){
        return result.substring(22, result.length-2)
      })

      //now looping over urls in results array. We use .pipe to put it into a string
      for (var i = 0; i < getTheURLS.length; i++) {
        request(getTheURLS[i]).pipe(fs.createWriteStream('resultsFiles/' + i + '.jpg'));
      };



    console.log("Finished scraping. There are " + results.length + " results.");
  }
});
