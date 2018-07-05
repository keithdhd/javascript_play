const req = {};

req.body = {
  username: "chuck",
  password: "letmein"
}

const {username, password} = req.body

console.log(username, password);