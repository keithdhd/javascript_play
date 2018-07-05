var ChartData = function(){
  this.pie = [{
      name: "Pokemon Type",
      data: [
        {
          name: "Fire",
          y: 74,
          color: "#ffac33"
        },
        {
          name: "Water",
          y: 25,
          color: "#73b7ff",
          sliced: true        
        },
        {
          name: "Grass",
          y: 1,
          color: "#00ba2f"
        }
      ]
    }],
    this.series = [
    {
      name: "Grass Pokemon",
      color: "#00ba2f",
      data: [1, 2, 1, 1, 1, 4, 3, 2, 1, 4, 3, 1]
    }
    ],
    this.months ={
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
}