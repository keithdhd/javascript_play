var Guitar = (function () {
    function Guitar(numberOfStrings) {
        console.log(numberOfStrings);
    }
    Guitar.prototype.play = function (tune) {
        return "I am playing " + tune;
    };
    return Guitar;
}());

var guitar = new Guitar(6);
console.log(guitar.play("Highway to Hell"));
