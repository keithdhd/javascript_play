var Bear = function(age, type, weight) {
  this.age = age;
  this.type = type;
  this.weight = weight;
}

Bear.prototype = {
  eat: function() {
    this.weight = this.weight + 10;
  },
  
  roar: function() {
    return 'ROAR!';
  }

  canHibernate: function() {
    return this.weight >= 100;
  }
};

module.exports = Bear;
