# Charting

## Lesson objectives
 - Understand how an external library can be used to create charts
 - Using data from an external API to used in a chart

### Duration
1.5

We live in the golden age of charting. Everyone loves infographics and you see them everywhere. It's only natural we want to use them in our webpages.

We could draw our graphs from scratch ourselves, using the skills we gained this morning. But it's far easier to use charting library.

There's a few charting libraries out there, but today we are going to look at HighCharts. It's easy to use and has lovely documentation.

[i]: Hand out the starter project, resources start_point

Let's start by adding the Highcharts library to our HTML document.

```
//app.js
<script src="http://code.highcharts.com/highcharts.js"></script>
```

We should be able to see this script in the ***sources*** of the developer tools tab.

# Setup

We need to make a div element where the chart will be drawn.

```
# index.html
<div id="pie-chart" width="400" height="400"></div>
```
Let's make another script that will hold the pie chart code.

```
# terminal
touch app.js
touch pie_chart.js

# index
  <script src="pie_chart.js"></script>

```
Cool, let's add a pie chart class we can use and call from app.js.

```
# pie_chart.js
var PieChart = function() {
}

# app.js
new PieChart();
```
# Pie Chart

Great we're all set up. Now let's add a chart!

We need to make some data to work with. We are going to chart your favourite pies.

Let's go and grab the div we made earlier that is going to hold the chart.

```
# pie_chart.js
this.container = document.getElementById("pie-chart");
```

Next we need to make a chart object from the Highcharts library.

```
# pie_chart.js
var chart = new Highcharts.Chart();
```
This constructor function takes in an object as a parameter which we can pass all of our settings to. This includes the data we want to display and the type of chart we want and many other config options.

The chart property lets us set some basic information about the chart, such as the type and the container it's going to live in.

```
# pie_chart.js
  this.chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: this.container
    }
  });
```

Next we can set the title of the chart using the, you guessed it, title property.

```
# pieChart.js
{
	chart: {
		type: 'pie',
		renderTo: this.container
   },
   title: { //NEW
    	text: "My Favourite Pies" 
   }
}
```
Next we want to pass the data we want to display. We need to use a series property for this, which is an array.

```
# pie_chart.js
{
	chart: {
		type: 'pie',
		renderTo: this.container
   },
   title: { 
    	text: "My Favourite Pies" 
   },
   series: [] //NEW
}
```
A pie chart only has one series (there are other kinds of charts that take multiple series) so we only need to add one object to this. This object has several properties we can use, including a name and an array for the data points.

```
# pie_chart.js
{
	chart: {
		type: 'pie',
		renderTo: container
   },
   title: { 
    	text: "My Favourite Pies" 
   },
   series: [
   		{
   			name: "Type", //NEW
          data: [] //NEW
   		}
   ]
}
```
Each data point is a little object with a name, a "y" (dubious name, but it's used for the y-axis on a series it's just weird because this is a pie chart) and some other options.

```
# pieChart.js
seriesseries: [
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
```
Woah! That was a lot of typing. But now we can reload the page and see the fruits of our labours.

There's an additional little option we can add, "sliced". Let's do it.

```
# pie_chart.js
{   
  name: "Steak & Ale", 
  y: 84,
  color: "#73b7ff",
  sliced:true
}

```
Isn't that just the most awesome thing you have ever seen? Also go see what happens if you resize the window. Responsive charts?!?! Boom!!! So good.

[TASK] Add a new slice to the pie chart.


# Line Charts

Next up let's have a go at a line chart. Let's make a new file to store this in and include it in the index.

```
# terminal public folder
touch line_chart.js

# index.html
<script src="line_chart.js"></script>
```
Let's add a constructor function for it.

```
# line_chart.js
var LineChart = function() {
}

# app.js
new LineChart();
```
We also need a new div to contain the chart.

```
# index.html
<div id="lineChart" width="500" height="400"></div>
```
The good news is that we can configure a line chart in a very similar way to a pie chart, because HighCharts is awesome. Let's get the container and pass the basic settings in again.

```
# lineChart
this.container = document.getElementById("line-chart");
this.chart = new Highcharts.Chart({ //NEW
    chart: {
      renderTo: this.container
    },
    title: { 
      text: "Portfolio Perfomance" 
    }
  });
```
Next we pass the data. This time, our series array has multiple objects with multiple data points.

```
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
        }]
});
```
Lastly we need to provide values for the x-axis.

```
this.chart = new Highcharts.Chart({
    chart: {
      renderTo: this.container
    },
    title: { 
      text: "Portfolio Perfomance" 
    },
    series:[{
          name: "My Investments",
          color: "#73b7ff",
          data: [5424, 5500, 5623, 5610, 6600]
        },
        {
          name: "FTSE 100",
          color: "#ffac33",
          data: [6024, 6000, 6123, 6110, 6100]
        }],
    xAxis: { //NEW
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
    },
  });
```
And hurrah! We have a lovely line chart.

[TASK] Add a new line to the line chart.

# Lab

1. Go and create a column chart.
2. Look at the other options we can pass to our charts
3. There is a lot of code duplication, see if you can tidy it up.
4. Further: Use the data from the Countries API to create a chart
