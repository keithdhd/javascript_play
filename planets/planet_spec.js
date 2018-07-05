var assert = require('assert');
var SolarSystem = require('./solar_system');
var Planet = require('./planet');

describe('Solar System', function(){
  it('should add some planets', function(){
    var milkyWay = new SolarSystem("Milky Way");
    var earth = new Planet("Earth");
    var mars = new Planet("Mars");
    milkyWay.addPlanet(earth);
    milkyWay.addPlanet(mars);
    assert.deepEqual([earth, mars], milkyWay.planets);
  });
})