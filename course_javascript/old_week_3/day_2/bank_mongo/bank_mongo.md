# Bank Mongo

## Learning Objectives

- By the end of this lesson, students should be able to make a get and a post from the front end, storing the data in a mongo db.

[i]: Make sure introduction to MongoDB has been done and webpack_bank_node has been done.

We want to add accounts. Let's see how we can do this using MongoDB. How can we do this?

# Setup

First let's get mongo started.

- start mongo (might need sudo)

```
//terminal
  mongod
```

And let's add some dummy data to our db.

```
//terminal
  mongo
```

```
//terminal
 use bank
```

```
  db.accounts.insert(  
    { owner: "jay",
      amount: 125.50,
      type: "personal"
    }
  );
```

# Using in Node

We need to install a driver to allow our express server to talk to mongo.

[i]:  Make sure not in the client folder.

```
//top level
  npm install mongodb --save
```

Mongodb docs are here:

https://docs.mongodb.org/ecosystem/drivers/node-js/


We can use the driver to connect to mongo and send out data.

The driver works in convention with Node, aynchronously, using callbacks that first expect an error to be passed.

```
//server.js

var MongoClient = require('mongodb').MongoClient
...
...

  app.get('/accounts', function(req,res) {
    // Connection URL
    var url = 'mongodb://localhost:27017/bank';
    MongoClient.connect(url, function(err, db) {
      var collection = db.collection('accounts');
      collection.find({}).toArray(function(err, docs) {
        res.json(docs)
        db.close();
      });
    });
  })
```

We can now see this being served up if we browse to this url in our browser:

```
localhost:3000/accounts
```

## Adding accounts to the database.

Let's set up the backend to also be able to add accounts.  

### Getting information from the body of a post request

What type of request should we handle to add an account?

Create action.  post to '/accounts'

```
  app.post('/accounts', function(req,res) {
    res.status(200).end()
  })
```

Now how we can make post requests to test our handler? There are many HTTP client applications that can help us make tailored HTTP requests. curl is a command line application.  *Insomnia* is an application that allows us to make HTTP requests to the server using the browser as a Graphical User Interface.  

Install Insomnia from the Chrome webstore
https://chrome.google.com/webstore/detail/insomnia-rest-client/gmodihnfibbjdecbanmpmbmeffnmloel?hl=en

Make requests in Insomnia.

POST
localhost:3000/accounts

{ "owner": "zxcv",
  "amount": 220.25,
  "type": "business"
}

## Receiving the information

To receive the information from the request we need to add some libraries to parse the input.

body-parser npm package is designed to do exactly this, so we can recieve the json we're passing.

```
//top level
  npm install body-parser --save
```

```
//server.js
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
```

Let's make sure our data is getting throuh to the route:

```
//server.js
  app.post('/accounts', function(req,res) {
    console.log('body', req.body);
    res.status(200).end()
  })
```

Excellent so the information is being passed through.

Now we can set up Mongo to add the data

```
//server.js
  app.post('/accounts', function(req,res) {
    MongoClient.connect(url, function(err, db) {
      var collection = db.collection('accounts');
        collection.insert(
          { "owner": req.body.owner,
            "amount": req.body.amount,
            "type": req.body.type
          }
        )
        res.status(200).end()
        db.close();
    });
  })
```

## Setting up frontend to add accounts.

The server is waiting hungry to add accounts,  but our client cannot currently satisfy this. Let's add a form to our front-end so that it can add accounts.


```
  //index.html

  <h2> Add Account </h2>
  <form id="add-account">
    <input type="text" placeholder="Owner" id="owner">
    <input type="number" placeholder="Amount" id="amount">
    <input type="text" placeholder="Type" id="type">
    <input type="submit" id="submit">
  </form>
```

The form is now there for the user.  Let's first get the information from the form

```
//client/index.js

  form.onsubmit = function(e) {
    e.preventDefault();
    var account = {
      owner: document.querySelector("#owner").value,
      amount: parseFloat(document.querySelector("#amount").value),
      type: document.querySelector("#type").value
    }
    console.log('account', account)
  }
```

Okay now let's add it to the frontend so that we can see the updates.

```
//client/index.js
  form.onsubmit = function(e) {
    e.preventDefault();
    var account = {
      owner: document.querySelector("#owner").value,
      amount: parseFloat(document.querySelector("#amount").value),
      type: document.querySelector("#type").value
    }
    console.log('account', account)
    bank.addAccount(new Account(account));
    displayBank(bank);
  }
```

Notice that the lists are growing let's fix this by clearing them each time we refresh.

```
//client/index.js
var displayBank = function(bank) {
  var totalDisplay = document.getElementById('total');
  var businessTotalDisplay = document.getElementById('business-total');
  var personalTotalDisplay = document.getElementById('personal-total');

  totalDisplay.innerText = "Total: £" + bank.totalCash();
  businessTotalDisplay.innerText = "Total Business: £" + bank.totalCash('business');
  personalTotalDisplay.innerText = "Total Personal: £" + bank.totalCash('personal');

  var businessAccountList = document.getElementById('business-accounts');
  var personalAccountList = document.getElementById('personal-accounts');

  //ADD THIS
  businessAccountList.innerHTML = ""
  personalAccountList.innerHTML = ""
  //

  populateAccountList(businessAccountList, bank.filteredAccounts('business'))
  populateAccountList(personalAccountList, bank.filteredAccounts('personal'))
}
```

So the front-end is updating.  Now it's time for us to persist.  Let's send the request.

```
var form = document.querySelector("#add-account")
form.onsubmit = function(e) {
  e.preventDefault();
  var account = {
    owner: document.querySelector("#owner").value,
    amount: parseInt(document.querySelector("#amount").value),
    type: document.querySelector("#type").value
  }
  bank.addAccount(new Account(account));
  displayBank(bank);
  //persist
  var request = new XMLHttpRequest();
  request.open("POST", url);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if(request.status === 200){
    }
  }
  request.send(JSON.stringify(account));
}
```

Now when we refresh we see the data has updated.

What we have done here is 'optimistically' updated the view.  We are assuming the server is going to behave as it should - this allows the frontend to update without having to wait from the server.  

A wise extension would be to warn the user whenever there is a connection error.  "Connection lost".  Example: Trello.
