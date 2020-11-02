import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from './src/Store/Store';

import Router from './src/Navigation/Navigation';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router/>
        <StatusBar style="auto"/>
      </Provider>
    );
  }
}

export default App;
