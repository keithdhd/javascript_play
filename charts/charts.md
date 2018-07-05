# Lesson objectives
* Make pie chart
* Make line chart

# Charting

We live in the golden age of charting. Everyone loves infographics and you see them everywhere. It's only natural we want to use them in our webpages.

We could draw our graphs from scratch ourselves, using the skills we gained this morning. But it's far easier to use charting library.

There's a few charting libraries out there, but today we are going to look at HighCharts. It's easy to use and has lovely documentation.

[i]: Hand out the starter project, resources basic_startpoint


```
<script src="http://code.highcharts.com/highcharts.js"></script>
```
We should be able to see this script in the ***sources*** of the developer tools tab.

# Setup

We need to make a div element where the chart will be drawn.

```
#index.html
<div id="pie-chart" width="400" height="400"></div>
```

And let's create an app.js that's going to be our main JavaScript file. 

```
#terminal
touch app.js
```

Let's make another script that will hold the pie chart code and then include them in our HTML.

```
#terminal
touch pieChart.js

#index
  <script src="pieChart.js"></script>
  <script src="app.js"></script>
```

Now we need to add a PieChart class we can use and call from app.js.

```
#pieChart.js
var PieChart = function(){
}

#app.js
new PieChart();
```

# Pie Chart

Great we're all set up. Now let's add a chart!

We need to make some data to work with. We are going to chart the Pokemon I've caught.

Let's go and grab the div we made earlier that is going to hold the chart.

```
#pieChart.js
var container = document.getElementById("pieChart");
```

Next we need to make a chart object from the Highcharts library.

```
#pieChart.js
var chart = new Highcharts.Chart();
```
This constructor function takes in an object as a parameter which we can pass all of our settings to. This includes the data we want to display and the type of chart we want and many other config options.

The chart property lets us set some basic information about the chart, such as the type and the container it's going to live in.

```
#pieChart.js
  var chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: container
    }
  });
```

Next we can set the title of the chart using the, you guessed it, title property.

```
#pieChart.js
{
	chart: {
		type: 'pie',
		renderTo: container
   },
   title: { //NEW
    	text: "Pokemon Types I've Caught" 
   }
}
```
Next we want to pass the data we want to display. We need to use a series property for this, which is an array.

```
#pieChart.js
{
	chart: {
		type: 'pie',
		renderTo: container
   },
   title: { 
    	text: "Pokemon Types I've Caught" 
   },
   series: [] //NEW
}
```
A pie chart only has one series (there are other kinds of charts that take multiple series) so we only need to add one object to this. This object has several properties we can use, including a name and an array for the data points.

```
#pieChart.js
{
	chart: {
		type: 'pie',
		renderTo: container
   },
   title: { 
    	text: "Pokemon Types I've Caught" 
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
#pieChart.js
series: [{
              name: "Type",
              data: [ //NEW
              {   
                name: "Fire", 
                y: 74,
                color: "#ffac33"
              },
              {
                name: "Water",
                y: 25,
                color: "#73b7ff"
              },
              { 
                name: "Grass", 
                y: 1,
                color: "#00ba2f"
              }]
            }]
    });
```
Woah! That was a lot of typing. But now we can reload the page and see the fruits of our labours.

There's an additional little option we can add, "sliced". Let's do it.

```
#pieChart.js
 {
	          name: "Water",
            	y: 25,
            	color: "#73b7ff",
            	sliced:true
         	},

```
Isn't that just the most awesome thing you have ever seen? Also go see what happens if you resize the window. Responsive charts?!?! Boom!!! So good.

[TASK] Add a new slice to the pie chart.


# Line Charts

Next up let's have a go at a line chart. Let's make a new file to store this in and include it in the index.

```
#terminal public folder
touch lineChart.js

#index.html
<script src="lineChart.js"></script>
```
Let's add a constructor function for it.

```
#lineChart.js
var LineChart = function(){
}

#app.js
new LineChart();
```
We also need a new div to contain the chart.

```
#index.html
<div id="lineChart" width="500" height="400"></div>
```
The good news is that we can configure a line chart in a very similar way to a pie chart, because HighCharts is awesome. Let's get the container and pass the basic settings in again.

```
#lineChart
var container = document.getElementById("lineChart");
  var chart = new Highcharts.Chart({ //NEW
    chart: {
      renderTo: container
    },
    title: { 
      text: "Number of Pokemon I Caught" 
    }
  });
```
Next we pass the data. This time, our series array has multiple objects with multiple data points.

```
var container = document.getElementById("lineChart");
  var chart = new Highcharts.Chart({ 
    chart: {
      renderTo: container
    },
    title: { 
      text: "Number of Pokemon I Caught" 
    },
	series: [{ //NEW
      name: "Water Pokemon",
      color: "#73b7ff",
      data: [2, 7, 10, 12, 14]
    },
    {
      name: "Fire Pokemon",
      color: "#ffac33",
      data: [4, 3, 5, 18, 11]
    }]
});
```
Lastly we need to provide values for the x-axis.

```
var chart = new Highcharts.Chart({
    chart: {
      renderTo: container
    },
    title: { 
      text: "Number of Pokemon I Caught" 
    },
    series: [{
      name: "Water Pokemon",
      color: "#73b7ff",
      data: [2, 7, 10, 12, 14]
    },
    {
      name: "Fire Pokemon",
      color: "#ffac33",
      data: [4, 3, 5, 18, 11]
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
