  setupMain: function(data) {
    console.log('a',this.test);
    document.getElementById('content').innerHTML = da  
    var countryData = JSON.parse(localStorage.getItem('countryData'));
    var searchBox = document.getElementById('country-search');
    searchBox.addEventListener('keyup', function(e) {
        var span = document.getElementById('country-options');
        span.innerHTML = null;
        for (var i = 0; i < countryData.length; i++) {
            if (countryData[i].name.toLowerCase().indexOf(searchBox.value.toLowerCase()) > -1) {
                span.appendChild(this.createListOption(countryData[i].name));
            }
        }
        if (span.childNodes.length === 0) {
            var p = document.createElement('p');
            p.innerText = "Sorry no results...";
            span.appendChild(p);
        }
      }.bind(this));
        console.log('me', this);
        this.updateDisplay();
    }