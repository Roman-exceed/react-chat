import React, { Component, createRef, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, TextField } from '@material-ui/core';

import { signUpAction } from './actions';


class SignUpPage extends Component {
  usernameInput = createRef();
  passwordInput = createRef();
  confirmPasswordInput = createRef();

  signUp = () => {
    const { actions } = this.props;
    // console.log('--------this.usernameInput', this.usernameInput.current.value.trim());
    // console.log('--------this.passwordInput', this.passwordInput.current.value.trim());
    // console.log('--------this.confirmPasswordInput', this.confirmPasswordInput.current.value.trim());
    actions.signUpAction({
      username: this.usernameInput.current.value.trim(),
      password: this.passwordInput.current.value.trim(),
      confirmPassword: this.confirmPasswordInput.current.value.trim(),
    });
  };

  render() {
    return (
      <Fragment>
        <div>
          <TextField
            required
            id="standard-with-placeholder"
            label="Username"
            placeholder="Username"
            // className={classes.textField}
            margin="normal"
            inputRef={this.usernameInput}
          />

          <TextField
            required
            id="filled-password-input"
            label="Password"
            // className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            inputRef={this.passwordInput}
          />

          <TextField
            required
            id="filled-confirm-password-input"
            label="Confirm password"
            // className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            inputRef={this.confirmPasswordInput}
          />
          <Button
            onClick={this.signUp}
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
        </div>
      </Fragment>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        signUpAction
      },
      dispatch
    )
  };
};

const mapStateToProps = state => {
  return {
    // username: state.userInfo.username
    state: state
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignUpPage));
