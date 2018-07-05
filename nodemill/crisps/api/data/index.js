/**
 * @name data
 * @example data/param
 */


/*
======Remove this block when you understand this API structure=======
Express API:
============
This api uses the express res object to return an API response rather than going through the normal nodemill system.

Why?
====
If you don't want to return json data (eg xml, csv or even an image file) then this is the ideal framework

How?
====
You use the express res object to return text, json (prob better to use the standard api system) or other file
See http://expressjs.com/en/api.html#res for more info

Input params:
=============
You can use the req object to see what came in to find get/post params
Also the id param will give the optional id of the route (ie data/id)

Next:
=====
You can test your new API at http://localhost:3000/api/data

*/

exports.express = function(id, req, res) {
  // Id: the (optional) id of the api, ie data/id

  var data = [];

  // At this point data should be populated with data from somewhere else - local data or a http response
  // Here's some dummy data:
  data = [
    {name: 'Jimmy Shark', occupation: 'Poker player', age: 21},
    {name: 'Tommy Putt', occupation: 'Professional golfer', age: 28},
    {name: 'Richie Slam', occupation: 'Tennis coach', age: 32},
    {name: 'Tony Hubcap ', occupation: 'Taxi driver', age: 46},
  ];


  res.json(data);
};
