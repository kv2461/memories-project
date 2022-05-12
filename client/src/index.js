import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'; //provider will keep track of store which is at a global state, that allows us to access store from anywhere at app
//won't have to be at a parent componenet, can access anywhere
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; 

import reducers from './reducers';

import App from './App';
import './index.css';

const store = createStore(reducers,compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);