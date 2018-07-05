var CountryDetailView = function(element){
  this.element = element;
}

CountryDetailView.prototype = {
  display: function(country){
    console.log("element", this.element)
    var tags = this.element.querySelectorAll('p')
    tags[0].innerText = country.name;
    tags[1].innerText = country.population;
    tags[2].innerText = country.capital;
  }
}
