import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from './src/Store/Store';

import Login from './src/Containers/Login';

export default function App() {
  return (
    <Provider store={store}>
      <Login/>
      <StatusBar style="auto"/>
    </Provider>
  );
}