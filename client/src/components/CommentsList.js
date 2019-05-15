import React, { Component, Fragment } from 'react';
import PubNubReact from 'pubnub-react';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";

export class CommentsList extends Component {

  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-97705ebd-d431-4ff8-b91d-8e55e024f6b5',
      subscribeKey: 'sub-c-9a126ede-7591-11e9-90ac-5a6b801e0231'
    });
    this.pubnub.init(this);
    this.username = prompt('Enter your Username');
  }

  componentWillMount() {
    this.pubnub.subscribe({ channels: ['channel1'], withPresence: true });
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({ channels: ['channel1'] });
  }

  sendMessage = () => {
    if (this.input.current.value) {
      this.pubnub.publish({
        message: {
          text: this.input.current.value,
          username: this.username,
        },
        channel: 'channel1'
      });
    }
  };

  render() {
    const messages = this.pubnub.getMessage('channel1');
    console.log('--------messages', messages);
    return (
      <Fragment>
        <ul>
          {messages.map((m, index) => <li key={'message' + index}><b>{m.message.username ? m.message.username : 'NoName user' }</b> says: {m.message.text}</li>)}
        </ul>
        <div>
          {/*<input ref={this.input} type="text" onChange={this.handleInputChange} />*/}
          <TextField
            id="standard-textarea"
            label="Enter your message"
            placeholder="Placeholder"
            multiline
            // className={classes.textField}
            margin="normal"
            inputRef={this.input}
            type="text"
            onChange={this.handleInputChange}
          />
          <Button onClick={this.sendMessage} variant="contained" color="primary" >send</Button>
        </div>
      </Fragment>
    );
  }
}
