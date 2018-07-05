function get(url){
  return new Promise(function( resolve, reject ){
    let req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function(){
      // This is called even on 404 etc
      // so check the status
      if(req.status === 200){
        resolve(req.response);
      }
      else{
        reject(Error(req.statusText));
      }
    };

    req.onerror = function(){
      reject(Error("Network Error"));
    };

    req.send();

  });
}

get('https://restcountries.eu/rest/v1/all').then(function(response){
  console.table(response);
},function(error){
  console.error("Failed!", error);
})