var React = require('react');
var CommentList = require('./CommentList');
var CommentForm = require('./CommentForm');

var CommentBox = React.createClass({
    
  getInitialState: function(){
    return {data: []}
  },

  componentDidMount: function(){
    this.fetchComments();
    setInterval(this.fetchComments, 1000);
  },

  fetchComments: function(){
    var req = new XMLHttpRequest();
    req.open("GET", this.props.url);
    
    req.onload = function(){
      if(req.stats === 200){
        var receivedComments = JSON.parse(req.responseText);
        this.setState({data: receivedComments});
      }
    }.bind(this);

    req.send(null);
  },

  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

module.exports = CommentBox;
