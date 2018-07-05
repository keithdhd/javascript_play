var PieChart = function(){
  this.container = document.getElementById("pie-chart");
  this.chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: this.container
    },   
      title: {
      text: "My Favourite Pies" 
   },
   series: [
      {
        name: "Type",
        data: [
        {   
          name: "Chicken & Mushroom", 
          y: 74,
          color: "#ffac33"
        },
        {   
          name: "Steak & Ale", 
          y: 84,
          color: "#73b7ff",
          sliced:true
        },
        {   
          name: "Fish", 
          y: 44,
          color: "#00ba2f"
        },
        {   
          name: "Scotch", 
          y: 39,
          color: "#65b48fg"
        }
        ]
      }
   ] 
  });
}