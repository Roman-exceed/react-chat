import React, { Component, createRef } from 'react';
import { Redirect, withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';

import { enterUsername } from './actions';
import './styles.css';

class LoginPage extends Component {
  usernameInput = createRef();
  passwordInput = createRef();

  login = () => {
    console.log('-------LOGIN');

    const { enterUsername } = this.props.actions;
    if (this.usernameInput.current.value.trim()) {
      enterUsername({
        username: this.usernameInput.current.value.trim(),
        password: this.passwordInput.current.value.trim(),
      });
    }
  };

  render() {
    const { redirect } = this.props;

    if (redirect) {
      return <Redirect to="/"/>;
    }

    return (
      <div className="login-outer-block">
        <div className="login-inner-block">
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
          <Button
            onClick={this.login}
            variant="contained"
            color="primary"
          >
            Log In
          </Button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        enterUsername,
      },
      dispatch
    )
  };
};

const mapStateToProps = state => {
  return {
    redirect: state.userInfo.redirect
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginPage));
