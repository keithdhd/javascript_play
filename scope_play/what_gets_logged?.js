// If we execute this Javascript, what will the browser's console show?

var text = 'outside';

function logIt(){
    console.log(text);
    var text = 'inside';
};

logIt();