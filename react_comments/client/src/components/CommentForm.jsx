var React = require('react');

var CommentForm = React.createClass({

  getInitialState: function(){
    return {author: '', text: ''}
  },

  handleAuthorChange: function(e){
    this.setState({
      author: e.target.value
    })
  },

  handleTextChange: function(e){
    this.setState({
      text: e.target.value
    })
  },

  handleSubmit: function(e){ 
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    this.setState({
      author:author,
      text: text
    });
    this.props.onCommentSubmit(this.state);
  },

  render: function(){
    return(
      <form onSubmit={ this.handleSubmit }>
        <input 
          type="text" 
          value={this.state.author}
          placeholder="Your Name" 
          onChange={this.handleAuthorChange}/>
        
        <input 
          type="text" 
          value={this.state.text}
          placeholder="Say something..."  
          onChange={this.handleTextChange}/>
        
        <input type="submit" value="Submit Comment" />
      </form>
    )
  }
})

module.exports = CommentForm;