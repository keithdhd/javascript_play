window.onload = function(){
  new PieChart();
  new LineChart();
  new ColumnChart();
  getCountries();
}

function getCountries(){
  //do ajax call
  var url = 'https://restcountries.eu/rest/v1'
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function () {
    if (request.status === 200) {
      var jsonString = request.responseText;
      var countries = JSON.parse(jsonString);
      new BarChart(countries);
    }
  }
  request.send();
}