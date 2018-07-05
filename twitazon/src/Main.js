import React from 'react';
import './Main.css';
import loader from './loader.gif';

const Main = (props) => {

  if (!props.userData.status) {
    return(
      <p>
        <img src={loader} alt="loading data..." />
        { /* <progress value="70" max="100">70 %</progress> */ }
      </p>
    )
  }

  return (
    <main>
      <h1>Hi! I'm { props.userData.name }</h1>
      <p>I'm from { props.userData.location }</p>
      <p>{ props.userData.status.text }</p>     
      <p>Tweets: { props.userData.statuses_count }</p>
      <p>Following: { props.userData.friends_count }</p>
      <p>Follwers: { props.userData.followers_count }</p>
      <p>Likes: { props.userData.favourites_count }</p>
    </main>
  )
}

export default Main;