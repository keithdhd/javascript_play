/*
======Remove this block when you understand what this file does======
This is a page controller for a site page and controlls a single page in the site

You can display data in the page using a table or divs in your template:


getTables(['sometable', 'othertable'], function(err, data){
  templateData.sometable = data.sometable;
  
  res.render(__dirname + '/home', templateData); 
});

- then in your template you can iterate through the sometable data.



You need a good understanding of server-side templating and Handlebars to make the most of this.
See https://github.com/ericf/express-handlebars for more info

*/

exports.express = function(req, res) {
  var templateData={};
  
  templateData.content='Currently the date/time is: ' + new Date();
  
  res.render(__dirname + '/home', templateData); 
}