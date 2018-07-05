##Modern JavaScript Tooling

[img modern-javascript-tooling.jpg]


- We're going to write components that ultimately generate HTML
- Writing out comments when learning from scratch to understand what we're doing



- Downwards data flow

YTSearch( {key: API_KEY, term: 'gretsch'}, (videos) => {
  this.setState( { videos } );
}); // if the name of value is the same as the key


const VideoListItem = (props) => {
  const video = props.video
  return <li></li>
};

//is equivalent to...

const VideoListItem = ({video}) => {
  return <li></li>
};