var BankView = function(bank) {
  this.bank = bank;
};

BankView.prototype = {

  bindEvents: function(){
    var interestButton = document.getElementById('interest-button');
    interestButton.onclick = function() {
      this.bank.payInterest(10);
      this.render();
    }.bind(this);
  },

  render: function() {
    var totalDisplay = document.getElementById('total');
    var businessTotalDisplay = document.getElementById('business-total');
    var personalTotalDisplay = document.getElementById('personal-total');

    totalDisplay.innerText = "Total: £" + this.bank.totalCash().toFixed(2);
    businessTotalDisplay.innerText = "Total Business: £" + this.bank.totalCash('business').toFixed(2);
    personalTotalDisplay.innerText = "Total Personal: £" + this.bank.totalCash('personal').toFixed(2);

    var businessAccountList = document.getElementById('business-accounts');
    var personalAccountList = document.getElementById('personal-accounts');

    businessAccountList.innerHTML = "";
    personalAccountList.innerHTML = "";

    this.populateAccountList(businessAccountList, this.bank.filteredAccounts('business'));
    this.populateAccountList(personalAccountList, this.bank.filteredAccounts('personal'));
  },

  createItemForAccount:function(account) {
    var accountListItem = document.createElement('li');
    accountListItem.innerText = account.owner + ": £" + account.amount.toFixed(2);
    return accountListItem;
  },

  populateAccountList:function(listElement, accounts) {
    for(account of accounts) {
      listElement.appendChild(this.createItemForAccount(account));
    }
  }
};

module.exports = BankView;
