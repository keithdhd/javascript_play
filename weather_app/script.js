var data = [
  {destination: "Grimsby", temperature: 13, description: "drizzly"},
  {destination: "Sam Francisco", temperature: 26, description: "sunny"},
  {destination: "Zimbabwe", temperature: 28, description: "hot"}
]

window.onload = function(){
  console.log("app started");

  var destinationList = document.getElementById('destinations');

  data.forEach(function(item, index){
    var dest = document.createElement('li');
    dest.innerHTML = item.destination;

    var button = document.createElement('button');
    button.setAttribute('id', index);

    button.innerText = "Get Stuff";
    button.addEventListener('click', function(e){
      console.log(data[e.target.attributes.id.value]);
    })

    dest.appendChild(button);
    destinationList.appendChild(dest);
  })

}


