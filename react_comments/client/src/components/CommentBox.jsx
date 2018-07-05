var React       = require('react');
var CommentList = require('./CommentList');
var CommentForm = require('./CommentForm');

var sampleData = [
  {id:1, author: 'Rick', text: 'Cool'},
  {id:2, author: 'Val', text: 'I stole Rubot'}
]

var CommentBox = React.createClass({

  getInitialState: function(){
    return {data: sampleData};
  },

  handleCommentSubmit: function(comment){
    comment.id = Date.now();
    var newComments = this.state.data.concat([comment]); 
    this.setState({
      data: newComments
    })
  },

  handleCommentDelete: function(key){
    console.log("Deleting comment:" + key);
    var newComments = this.state.data.filter(function(value, index, array){
      return value.id !== key;
    });

    this.setState({
      data: newComments
    });
  },

  render: function(){
    return(
      <div>
        <h1>Comments</h1>
        <CommentList data={this.state.data} onCommentDelete={ this.handleCommentDelete }/>
        <CommentForm onCommentSubmit={ this.handleCommentSubmit }/>
      </div>
    )
  }

});

module.exports = CommentBox;