var React = require('react')
var MovieRow = require('./MovieRow')

var MovieTable = function(props){

  var moviesNodes = props.movies.map(function(movie){
    return(
      <li>
        <MovieRow movie={movie} />
      </li>
    )
  })

  return(
    <div className='movie-table'>
      <ul>
        {moviesNodes}
      </ul>
    </div>
  )

}

module.exports = MovieTable