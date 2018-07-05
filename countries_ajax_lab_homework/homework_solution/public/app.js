window.onload = function () {
    var url = 'https://restcountries.eu/rest/v1'
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
        if (request.status === 200) {
            console.log('got the data');
            var jsonString = request.responseText;
            var countries = JSON.parse(jsonString);
            main(countries);
        }
    }
    request.send(null);
};

var main = function (countries) {
    populateSelect(countries);
    var cached = localStorage.getItem("selectedCountry");
    var selected = countries[0];
    if(cached)
    
    {
        selected = JSON.parse(cached);
        document.querySelector('#countries').selectedIndex = selected.index;
    }
    updateDisplay(selected);
    document.querySelector('#info').style.display = 'block';
}

var populateSelect = function (countries) {
    var parent = document.querySelector('#countries');
    var index = 0;
    countries.forEach(function (item) {
        var option = document.createElement("option");
        option.value = index.toString();
        option.text = item.name;
        parent.appendChild(option);
        index++;
    });
    parent.style.display = 'block';
    parent.addEventListener('change', function (e) {
        var index = this.options[this.selectedIndex].value;
        var country = countries[index];
        updateDisplay(country);
        country.index = index;
        localStorage.setItem("selectedCountry",JSON.stringify(country));
    }, false);
}

var updateDisplay = function (country) {
    var tags = document.querySelectorAll('#info p');
    tags[0].innerText = country.name;
    tags[1].innerText = country.population;
    tags[2].innerText = country.capital;
}
