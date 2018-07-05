var BarChart = function(data){
  this.container = document.getElementById("bar-chart");
  this.chart = new Highcharts.Chart({
    chart: {
        type: 'bar',
        renderTo: this.container
    },
    title: {
        text: 'Populations & Area'
    },        
    xAxis: {
        categories: [data[200].name, data[190].name, data[205].name]
    },
    yAxis: {
        title: {
            text: 'Populations vs Area'
        }
    },
    series: [{
        name: 'Population',
        data: [data[200].population, data[190].population, data[205].population]
    }, {
        name: 'Land Area',
        data: [data[200].area, data[190].area, data[205].area]
    }]  
  });
}