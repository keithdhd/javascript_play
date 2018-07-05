var React = require('react');
var Comment = require('./Comment');

var CommentList = React.createClass({
  
  render: function(){
    console.log();
    var onCommentDelete = this.props.onCommentDelete;
    
    var commentNodes = this.props.data.map(function(comment){
      return (
        <Comment author={comment.author} key={comment.id} id={comment.id} onCommentDelete={onCommentDelete}>
          { comment.text }
        </Comment>
      )
    });

    return(
      <div>
        { commentNodes }
      </div>
    )
  }

});

module.exports = CommentList;