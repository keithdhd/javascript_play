const React = require('react')
const { Link } = require('react-router')
const LoginBox = require('../auth/LoginBox')

const Home = () => (
  <div className="home">
    <h1 className='title'>Notflix</h1>
    <LoginBox url="http://localhost:5000/" />
  </div>
)

module.exports = Home