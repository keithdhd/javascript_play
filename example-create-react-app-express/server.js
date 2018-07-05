const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const twitter = require('./lib/twitter-client');

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`The race is on! ${port}`));

io.on('connection', function(socket){
  console.log('a user connected')

  socket.once('racers', function(racers){

    // Set up a new Twitter stream for each racer
    racerStreams = racers.map( (racer) => {
        return twitter.stream('statuses/filter', { track: racer })
    })

    racerStreams.forEach( (stream, index) => {
      stream.on('tweet', function (tweet) {
        const racer = {
          racer: racers[index],
          tweet: tweet
        }
        io.emit('racers', racer )
      })
    })
  })

  socket.on('stop', function(){
    console.log('socket closed')
    // io.close()
  })

})


http.listen(3000, function(){
  console.log('The race is on! @ 3000')
})
