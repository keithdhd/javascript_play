// Section 1

// What types are these?

/* 1.1 */ 1;               // Number
/* 1.2 */ "cat";           // String
/* 1.3 */ true;            // Boolean
/* 1.4 */ [];              // Array
/* 1.5 */ {};              // Object
/* 1.6 */ 1.1;             // Number
/* 1.7 */ var myVariable;  // Undefined


// Section 2

// What is the truthiness/falsiness values of the following values?

/* 2.1 */  1;               // True
/* 2.2 */  "cat";           // True
/* 2.3 */  true;            // True
/* 2.4 */  NaN;             // False
/* 2.5 */  [];              // True
/* 2.6 */  {};              // True
/* 2.7 */  undefined;       // False
/* 2.8 */  "";              // False
/* 2.9 */  0;               // False


// Section 3

// Using examples that are different from above...

// 3.1 Assign a variable that is a number
  var num = 1;

// 3.2 Assign a variable that is a string
  var str = "This is a string";

// 3.3 Assign a variable that is a boolean
  var bool = true;

// 3.4 Assign a variable that is an object
  var obj = {};


// Section 4

// 4.1 Write a statement that writes "hello" to the console if it's true and "bye" if it is false.
  if (shouldGreet) {
    console.log('Hello!');
  }
  else {
    console.log('Bye!');
  }


// Section 5

var animals = ["raccoon","hedgehog","mouse","gerbil"];

// 5.1. Assign the first element to a variable
  var firstElement = animals[0];

// 5.2. Assign the last element to a variable
  var lastElement = animals[animals.length - 1];

// 5.3. Assign the length of an array to a variable
  var len = animals.length;

// 5.4. Add an item to the end of the array
  animals.push("alpaca");

// 5.5. Add an item to the start of the array
  animals.unshift("aye-aye");

// 5.6. Assign the index of hedgehog to a variable
  var indexOfHedgehog = animals.indexOf("hedgehog");


// Section 6

// 6.1 Create an array of 5 vegetables
  var vegetables = ["carrot", "brocolli", "peas", "sweetcorn", "potato"];

// 6.2 Loop over the array and write to the console using a "while"

  var i = 0;
  while (i < vegetables.length) {
    console.log(vegetables[i]);
    i++;
  }

// 6.3 Loop again using a "for" with a counter

  for (var i = 0; i < vegetables.length; i++) {
    console.log(vegetables[i]);
  }

// 6.4 Loop again using a "for of"

  for (var vegetable of vegetables) {
    console.log(vegetable);
  }


// Section 7

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
]; 28

// 7.1 Calculate the total cash in accounts

  var total = 0;
  for (var account of accounts) {
    total += account.amount;
  }

// 7.2 Find the amount of money in the account with the largest balance

  var largest = 0;
  for (var account of accounts) {
    if (account.amount > largest) {
      largest = account.amount;
    }
  }

// 7.3 Find the name of the account with the smallest balance

  var smallest = Number.POSITIVE_INFINITY;
  for (var account of accounts) {
    if (account.amount < smallest) {
      smallest = account.amount;
    }
  }

// 7.4 Calculate the average bank account value

  var total = 0;
  for (var account of accounts) {
    total += account.amount;
  }
  total / accounts.length;

// 7.5 Find the value of marcs bank account

  var marcsBalance;
  for (var account of accounts) {
    if (account.name === 'marc') {
      marcsBalance = account.amount;
    }
  }

// 7.6 Find the holder of the largest bank account

  var name = null;
  var largest = 0;
  for (var account of accounts) {
    if (account.amount > largest) {
      largest = account.amount;
      name = account.name;
    }
  }

// 7.7 Calculate the total cash in business accounts

  var total = 0;
  for (var account of accounts) {
    if (account.type === 'business') {
      total += account.amount;
    }
  }


// 7.8 Find the largest personal account owner

  var name = null;
  var largest = 0;
  for (var account of accounts) {
    if (account.amount > largest && account.type === 'personal') {
      largest = account.amount;
      name = account.name;
    }
  }


// Section 8

// Assign a variable myPerson to a hash, giving them a name, height, favourite food and an eat method

var myPerson = {
  name: 'Jarrod',
  height: '180cm',
  favFood: 'all',

  eat: function () {
    return 'om nom nom';
  }
}  
