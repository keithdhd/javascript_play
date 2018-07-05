var React = require('react');

var Comment = React.createClass({

  delete: function(){
    this.props.onCommentDelete(this.props.id);
  },

  render: function(){
    return (
       <div> 
        <h2>{ this.props.author }</h2>
        <h3>{ this.props.children }</h3>
        <button onClick={ this.delete }>Delete Comment</button>
       </div>
    )
  }

})

module.exports = Comment;