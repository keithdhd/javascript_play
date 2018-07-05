import React, { Component } from 'react';
import './App.css';
import Main from './Main';

class App extends Component {

  constructor() {
    super();
    this.state = {
      userData: [],
      searchQuery: ""
    }
  }

  componentDidMount() {
    this.getUser('kdhdouglas');
  }

  getUser(screenName) {
    if (window.fetch) {

      fetch(`http://localhost:3001/api/twit/${screenName}`)
        .then( (response) => {
          return response.json();
      }).then( (userProfile) => {
          this.setState({
            userData: userProfile
          })
      });

    } else {

      const httpRequest = new XMLHttpRequest();
      httpRequest.open('GET', `http://localhost:3001/api/twit/${screenName}`);

      httpRequest.onreadystatechange = () => {
        try {
          if (httpRequest.readyState === XMLHttpRequest.DONE) {
              // Everything is good, the response was received.
            if (httpRequest.status === 200) {
                this.setState({
                  userData: JSON.parse(httpRequest.responseText)
                })
            } else {
                console.error('There was a problem with the request: ',  httpRequest.status);
              }
            }
          }

        catch(e) {
          console.error('Caught Exception: ' + e.description);
        }

      };
      httpRequest.send();
    }
  }

  onQueryChange(e) {
    if(e.keyCode === 13) this.getUser(e.target.value);
    this.setState({
      searchQuery: e.target.value
    });
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">twitazon</h1>
          <div className="search-bar">
            <input className="search-input" autoFocus="autofocus" placeholder="Enter a Twitter handle" type="text" defaultValue={ this.state.serachQuery } onKeyUp={ this.onQueryChange.bind(this) } />

            <button className="search-button" onClick={ () => { this.getUser(this.state.searchQuery) } }>
              {/* That &#x1f50d; thing is the magnifiying glass icon in UTF */}
            <span role="img" aria-label="search">&#x1f50d;</span></button>
          </div>

          <nav>
            <ul>
              <li>{ this.state.userData.name }&#39;s  Amazon</li>
              <li>Cyber Monday Sale</li>
              <li>Christmas Store</li>
            </ul>    
          </nav>
        </header>
        <Main userData={ this.state.userData }/>
      </div>
    );
  
  }
}

export default App;
