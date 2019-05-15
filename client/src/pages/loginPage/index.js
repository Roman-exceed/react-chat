import React, { Component, createRef, Fragment } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import './styles.css';

class LoginPage extends Component {
  usernameInput = createRef();
  passwordInput = createRef();

  login = () => {
    console.log('--------this.usernameInput', this.usernameInput.current.value);
    console.log('--------this.usernameInput', this.passwordInput.current.value);
    console.log('--------this.props', this.props);
    // if (redirect) {
    this.props.history.push('/');
    // return <Redirect to="/"/>;
    // }
  };

  render() {
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


export default withRouter(LoginPage);
