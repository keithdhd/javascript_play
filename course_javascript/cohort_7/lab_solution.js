//Section 1

//what types are these? Write your answer in a comment beside it.

1; //number
"cat";  //string
true; //boolean
[]; //object
{}; //object
1.1; //number
undefined; //undefined

//Section 2

// what is the truthy/falsiness values of the following
// write your answer in a comment beside it
// you can use an if to test this...
1; //true
"cat"; //true
true; //true
NaN; //false
[]; //true
{}; //true
undefined; //false
""; //false
0; //false


//Section 3

//Using examples that are different from above...

//3.1 Assign a variable that is a number
var x = 12;
//3.2 Assign a variable that is a string
var s = "string";

//3.3 Assign a variable that is a boolean
var b = true;
//3.4 Assign a variable that is an object
var o = {a: 2};
//Section 4
//4.1 Write a statement that writes "hello" to the console if it's true and "bye" if it is false
var shouldSayHello = true;
if( shouldSayHello ){
  console.log( "hello" );
}
else{
  console.log("bye");
}

//Section 5
var animals = ["raccoon","hedgehog","mouse","gerbil"];

//5.1. Assign the first element to a variable
var first = animals[0];
//5.2. Assign the last element to a variable
var last = animals[ animals.length - 1 ];
//5.3. Assign the length of an array to a variable
var length = animals.length;
//5.4. Add an item to the end of the array
animals.push( "pig" );
//5.5. Add an item to the start of the array
animals.unshift( "cat" );
//5.6. Assign the index of hedgehog to a variable
var index = animals.indexOf("hedgehog");

animals["hedgehog"]

//Section 6

//6.1 Create an array of 5 vegetables
var veg = ["a", "b", "v", "d", "o"];
//6.2 Loop over the array and write to the console using a "while"
var counter = 0;
while( counter < veg.length){
  console.log( veg[counter] );
  counter++;
}
//6.3 Loop again using a "for" with a counter
for( var j=0; j<veg.length;j++){
  console.log(veg[j]);
}
//6.4 Loop again using a "for of"
for( var v of veg){
  console.log(v);
}


//Section 7
var accounts = [
  { name: 'jay',
    amount: 125.50,
    type: 'personal'
  },
  { name: 'val',
    amount: 55125.10,
    type: 'business'
  },
  { name: 'marc',
    amount: 400.00,
    type: 'personal'
  },
  { name: 'keith',
    amount: 220.25,
    type: 'business'
  },
  { name: 'rick',
    amount: 1.00,
    type: 'personal'
  },
];
//7.1 Calculate the total cash in accounts
var total = 0;
for( var key in accounts ){
  total += accounts[key].amount;
}
//7.2 Find the amount of money in the account with the largest balance
function findHighestAmount(){
  var highestAmount = accounts[0].amount;
  for(var account of accounts){
    if(highestAmount < account.amount){
      highestAmount = account.amount;
    }
  }
  return highestAmount;
}

function highestAmount2(){
  var monies = [];
  for(var account of accounts){
    monies.push( account.amount );
  }
  var maximum = Math.max.apply(null, monies);
  return maximum;
}
//7.3 Find the name of the account with the smallest balance
var min = 999999;
var poorest = "";
for( var key in accounts ){
  if( min > accounts[key].amount){
    min = accounts[key].amount;
    poorest = accounts[key].name;
  }
}
console.log(poorest);

//7.4 Calculate the average bank account value
var averageValue = function( list ){
  return sumValue( list ) / list.length;
}
//7.5 Find the value of marcs bank account
for( var account of accounts){
  if(account.name === "marc"){
    var marcAccountAmount = account.amount;
  }
}

//7.6 Find the holder of the largest bank account
var largestValue = accounts[0].amount;
var accountName = "";
for( var account of accounts ){
  if(largestValue < account.amount){
    largestValue = account.amount;
    accountName = account.name;
  }
}

console.log("accountName", accountName);
//7.7 Calculate the total cash in business accounts
var businessTotal = 0;
for( var account of accounts){
  if( account.type === "business"){
    businessTotal += account.amount;
  }
}


//7.8 Find the largest personal account owner
function findHolderOfPersonalAmount(){
  var highestAmountPersonal = 0;
  // var highestAmountPersonalAccountHolder = [];
  var winner = null;
  for( var account of accounts){
    if(account.type === "personal" && highestAmountPersonal < account.amount){
      highestAmountPersonal = account.amount;
      winner = account;
      // highestAmountPersonalAccountHolder.push( account );
    }
  }
  // var personAccountHolder = highestAmountPersonalAccountHolder.pop();
  // return personAccountHolder.name;
  return winner.name;
}



//Section 8
//Assign a variable myPerson to a hash, giving them a name, height, favourite food and an eat method

var myPerson = {
  name: 'Joanne',
  height: 5.4,
  food: "Christmas Dinner",
  eat: function(){
    return this.name + " is eating" + this.food
  }
}
console.log( myPerson.eat() );
