Cohort 3
  w1
    d1 - d3 good.
    d4 Callback day, fundamentally good, can refactor to make better.
    d4 Async - We just looked at callbacks. Why? Callbacks are a fundamental part of async programming. What is async programming?
    homework - good
  w2
    [Refactor exercises and solutions to all follow same pattern]
    d1 - found difficult - need to lead them into this,  more understanding on event driven programming. Include the scope stuff we did as a Friday review.

    d2 - liked idea of ajax, some struggled with lab, find lack of structure to their code.
    d3 - maps went well. but people still want clarity on event driven programming
    d4 - charts overcomplicated with OO,  take this out. Just get them playing around with highcharts. creating charts from country data.

    Bridge between week 1 and week 2

    -- overall design,  focus on window onload causing a cascade of functions to run.

  w3
    -  A bit confused about everything that is going on.  Webpack, express, node ...
    -  Need to be able to lead them into it.  Talk through the structure of a web application.
    -  Refresher on REST and req/response cycle
    -  Start with node
    -  Explain express,  serving up the index.html file and then that fetching via a get request the script tag.

    -  Add in Webpack.  Allows us to create a bundled up file writing our javascript in a nice form.

    - Can act as an API.
    - Add in Mongo.

    More of a story.
    [TODO]  Add an express lesson explaining the actions.

    Wk 3 Day 1
    How do we even start a JS application in the browser?? 
    We need to get a file into the browser - from Express
    WEbpack allows us to make our JS in a nice way. 
    Water bottle lab- 
    homework - make one of these apps from scratch

    Wk 3 Day 2
    Bank account day with weback


  Example for callbacks.

  window.onload = functino(){

  }

  var squashBerries = function() {
    console.log('sqaush squash');
  }

  var makeJam = function() {
    squashBerries();
    console.log('make jam');
  }

  var berryPicker = {
    pickBerries = function() {
      setTimeout(function() {
        console.log('I am picking berries');
        onPickBerries();
      },1000)
    },
    onPickBerries: null
  }

  berryPicker.onPickerBerries = makeJam;
  berryPicker.pickBerries();

  berryPicker = {
    pickBerries = function() {
      console.log('I am picking berries');
      onPickBerries();
    },

    onPickBerries = null
  }


  berryPicker.onPickBerries = function() {
    console.log('make jam');
  }


  berryPicker.pickBerries();

  window.onload = function() {

  }
