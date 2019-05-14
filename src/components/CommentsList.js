import React, { Component, Fragment } from 'react';
import PubNubReact from 'pubnub-react';

export class CommentsList extends Component {

  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-97705ebd-d431-4ff8-b91d-8e55e024f6b5',
      subscribeKey: 'sub-c-9a126ede-7591-11e9-90ac-5a6b801e0231'
    });
    this.pubnub.init(this);
  }

  componentWillMount() {
    this.pubnub.subscribe({ channels: ['channel1'], withPresence: true });

    this.pubnub.getMessage('channel1', (msg) => {
      console.log(msg);
    });

    this.pubnub.getStatus((st) => {
      console.log('------st',st);
      this.pubnub.publish({ message: 'hello world from react', channel: 'channel1' });
    });
  }

  componentWillUnmount() {
    console.log('--------componentWillUnmount UNSUBSCRIBE');
    this.pubnub.unsubscribe({ channels: ['channel1'] });
  }

  handleInputChange = () => {
    console.log('-------handleInputChange');
  };
  
  sendMessage = () => {
    console.log('-------SEND');
    console.log('--------this.input', this.input.current.value);
    if (this.input.current.value) {
      this.pubnub.publish({ message: this.input.current.value, channel: 'channel1' });
    }
  };

  render() {
    const messages = this.pubnub.getMessage('channel1');
    return (
      <Fragment>
        <ul>
          {messages.map((m, index) => <li key={'message' + index}>{m.message}</li>)}
        </ul>
        <div>
          <input ref={this.input} type="text" onChange={this.handleInputChange} />
          <button onClick={this.sendMessage} >send</button>
        </div>
      </Fragment>
    );
  }
}
