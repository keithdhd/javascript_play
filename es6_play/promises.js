var wait1000 =  new Promise( (resolve, reject) => {
  setTimeout(resolve, 1000)
}).then( () => {
  console.log('Yay!', this)
})

console.log(wait1000)