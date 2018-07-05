var Bank = function() {
  this.accounts = [];
};

Bank.prototype = {
  addAccount: function(account) {
    this.accounts.push(account);
  },
  findAccountByOwnerName:function(ownerName) {
    return this.accounts.find( function(account) {
      return account.owner === ownerName;
    });
  },

  filteredAccounts: function(type) {
    if(!type) return this.accounts;
    return this.accounts.filter( function(account) {
      return account.type === type;
    });
  },

  totalCash:function(type) {
    var amounts = this.filteredAccounts(type).map( function(account) {
      return account.amount;
    });
    return amounts.reduce(function(a,b){return a+b}, 0);
  },
  accountAverage:function() {
    return this.totalCash()/this.accounts.length;
  }
};


module.exports = Bank;
