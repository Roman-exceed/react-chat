import React, { Component, Fragment } from 'react';
import PubNubReact from 'pubnub-react';
import { Button, TextField } from '@material-ui/core';
import { Redirect, withRouter } from 'react-router';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Message from './components/Message';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-97705ebd-d431-4ff8-b91d-8e55e024f6b5',
      subscribeKey: 'sub-c-9a126ede-7591-11e9-90ac-5a6b801e0231'
    });
    this.pubnub.init(this);
    // this.username = prompt('Enter your Username');
  }

  componentWillMount() {
    this.pubnub.subscribe({ channels: ['channel1'], withPresence: true });
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({ channels: ['channel1'] });
  }

  sendMessage = () => {
    const { username } = this.props;

    if (this.input.current.value.trim()) {
      this.pubnub.publish({
        message: {
          text: this.input.current.value,
          timestamp: Date.now(),
          username,
        },
        channel: 'channel1'
      });
      console.log('-------START');
    }
  };

  render() {
    console.log('-------end');
    const messages = this.pubnub.getMessage('channel1');
    console.log('--------messages', messages);
    const { username } = this.props;

    if (!username) {
      return <Redirect to="/login"/>;
    }

    return (
      <Fragment>
        <ul>
          {messages.map((m, index) => <Message message={m.message} key={index} />)}
        </ul>
        <div>
          <div>
            <TextField
              id="standard-textarea"
              label="Enter your message here"
              placeholder="message"
              multiline
              // className={classes.textField}
              margin="normal"
              inputRef={this.input}
              type="text"
              onChange={this.handleInputChange}
            />
            <Button onClick={this.sendMessage} variant="contained" color="primary">send</Button>
          </div>
        </div>
      </Fragment>
    );
  }
}


// const mapDispatchToProps = dispatch => {
//   return {
//     actions: bindActionCreators(
//       {
//       },
//       dispatch
//     )
//   };
// };

const mapStateToProps = state => {
  return {
    username: state.userInfo.username
  };
};

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(withRouter(HomePage));
