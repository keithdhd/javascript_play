var Chart = function(title, type, container, data, categories){

  var chart = new Highcharts.Chart({
    chart: {
      renderTo: container,
      type: type
    },
    title: {
      text: title
    },
    series: data,
    xAxis: categories,
    yAxis: {
            labels: {
                align: 'left',
                x: 0,
                y: -2
            }
        }
    });
}