function loadDoc() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var portfolio = JSON.parse(xhttp.responseText);
      var portfolioEl = document.getElementById('portfolio');
      for (var i = 0; i < portfolio.length; i++) {
        portfolioEl.innerHTML += portfolio[i].Stock + "<br>";
      }
    }
  }
  xhttp.open("GET", "/api", true);
  xhttp.send();
}

window.onload = loadDoc;