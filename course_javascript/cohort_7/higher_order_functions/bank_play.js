var Bank = function(){
  this.accounts = [100,200,300,400];
  this.total = 0;
}

Bank.prototype = {
  setTotal: function(){
    this.total = 0;
    this.accounts.forEach( function(account){
      this.total += account;
    }.bind(this) );
  }
}
var b = new Bank();
console.log( "total before", b.total );

b.setTotal();

console.log( "total after", b.total );
