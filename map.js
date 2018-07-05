const this.props.records = [
  {artist: "Lyle Lovett", title: "Cowboy", price: 100},
  {artist: "Chuck Berry", title: "St Louis", price: 500},
  {artist: "Miles Davis", title: "Kind of Blue", price: 900}
]

var records = this.props.records.map(function(record, index){
  return <li key={ index }>{ record.title } by { record.artist }: £{ record.price }</li>
})

 return(
  <div>
    <ul>
      { records }
    </ul>
  </div>
 ) 


/* We want to produce this HTML */
<html>
  <body>
    <div>
      <ul>
        <li>Cowboy by Lyle Lovett: £1 </li>
        <li>St Louis by Chuck Berry: £5</li>
        <li>Kind of Blue by Miles Davis: £9</li>
      </ul>
    </div>
  </body>
</html>






