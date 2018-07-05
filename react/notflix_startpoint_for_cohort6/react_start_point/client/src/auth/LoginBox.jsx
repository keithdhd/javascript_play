const React = require('react')
const SignIn = require('./SignIn')
const SignUp = require('./SignUp')
const SignOut = require('./SignOut')
const get = require('../helpers/fetch')

const LoginBox = React.createClass({

  getInitialState: function() {
    return {currentUser: null}
  },

  setUser: function(user){
    this.setState({currentUser:user, favlist:[]})
  },

  fetchUser: function() {
    console.log("fetching user")
    get(this.props.url + "users.json").then((response) => {
      var receivedUser = JSON.parse(response)
      this.setUser(receivedUser)
    }, (error) => {
      console.error("Failed!", error)
      this.setState({currentUser:false})
    })
  },

  componentDidMount: function(){
    this.fetchUser()
  },

  render () {
      var mainDiv = <div>
        <h4> Please Sign In/Up </h4>
        <SignIn url={this.props.url + "users/sign_in.json"} onSignIn={this.setUser}></SignIn>
        <SignUp url={this.props.url + "users.json"} onSignUp={this.setUser}></SignUp>
      </div>
      if(this.state.currentUser){
        mainDiv = <div>
          <h4> Welcome {this.state.currentUser.email}</h4>
          <SignOut url={this.props.url + "users/sign_out.json"} onSignOut={this.setUser}></SignOut>
        </div>
      }
      return (
        <div>
          { mainDiv }
        </div>
      ) 
  }
})

module.exports = LoginBox