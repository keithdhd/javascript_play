var LineChart = function(){
  this.container = document.getElementById("line-chart");
  this.chart = new Highcharts.Chart({
    chart: {
      renderTo: this.container
    },
    title: { 
      text: "Portfolio Perfomance" 
    },
      series: [{
          name: "My Investments",
          color: "#73b7ff",
          data: [5424, 5500, 5623, 5610, 6600]
        },
        {
          name: "FTSE 100",
          color: "#ffac33",
          data: [6024, 6000, 6123, 6110, 6100]
        }],
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
        }
  });
}