import React, { Component } from 'react';

class Message extends Component {
  render() {
    const { message } = this.props;
    return (
      <li><b>{message.username ? message.username : 'NoName user'}</b> says: {message.text}</li>
    )
  }
}

export default Message;
