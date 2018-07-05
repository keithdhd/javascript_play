window.onload = function(){
  console.log("charts app running");

  var data = new ChartData();
  var containers = new ChartContainers();
  var types = new ChartTypes();

  var title = "Pokemon I've Caught";
  new Chart(title, types.pie, containers.pie, data.pie);
  new Chart(title, types.line, containers.line, data.series, data.months)
  new Chart(title, types.column, containers.column, data.series, data.months)
}