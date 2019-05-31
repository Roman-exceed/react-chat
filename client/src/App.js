import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Toolbar, IconButton, Typography, withStyles, AppBar } from '@material-ui/core';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'

import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import SignUpPage from './pages/signUpPage';

import { reducer } from './reducers';
import mySaga from './sagas'

import './App.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
// const store = createStore(reducer, {});

sagaMiddleware.run(mySaga);

function App({ classes }) {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                // className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                {/*<Menu />*/}
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Chat
              </Typography>
              {/*<Button color="inherit">Login</Button>*/}
            </Toolbar>
          </AppBar>
          <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/signup" component={SignUpPage}/>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default withStyles(styles)(App);
