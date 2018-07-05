var Bank = require('./bank/bank.js');
var Account = require('./bank/account.js');
var sampleAccounts = require('./sample.json');

window.onload = function(){
  console.log('loaded');
  var bank = new Bank();

  for(accountData of sampleAccounts){
    bank.addAccount(new Account(accountData));
  }

  var listAccounts = function(accounts){
    var body = document.querySelector("body");
    var h3 = document.createElement("h3");
    h3.innerText = accounts[0].type + ": £" + bank.totalCash(accounts[0].type);
    body.appendChild(h3);
    var ul = document.createElement("ul");

    for (var i = 0; i < accounts.length; i++) {
      var account = accounts[i];
      var li = document.createElement("li");
      li.innerHTML = account.owner + "-" + account.type + ": £" + account.amount;
      ul.appendChild(li);
      body.appendChild(ul);
    }
  }

  var totalValue = document.querySelector('#total-value');
  totalValue.innerText = bank.totalCash();

  listAccounts(bank.filteredAccounts('personal'));
  listAccounts(bank.filteredAccounts('business'));

}
