import React from 'react';
import ReactDOM from "react-dom";
import Router from "react-router/BrowserRouter";
import { createStore, applyMiddleware, compose} from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Redirector from "./Redirect";
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import './index.css';

const initialState = {
  location: '/TestPage',
  navigateNow: false,
  navigateTo: '/'
};

let middleware = [];

const reactRouterReduxMiddleware = store => next => action => {
  console.log("Dispatch:", action);

  if (action.type === "NAVIGATE_TO" ) {
    window.setTimeout(() => {
      store.dispatch({ type: "NAVIGATE_RESET" });      
    }, 200);
  }

  return next(action);
}

/*
  TODO: Use a Thunk to trigger two updates to call the navigation and then the reset
*/
const testReducer = (state=initialState, action) => {
  if (action.type === "NAVIGATE_TO") {
    return Object.assign({}, state, {navigateNow: true, navigateTo: action.navigateTo});
  }
  if (action.type === "NAVIGATE_RESET") {
    return Object.assign({}, state, {navigateNow: false, navigateTo: '/'});   
  }

  switch (action.type) {
    case "FORM_UPDATE":
      return Object.assign({}, state, {[action.key]: action.value });
    default:
      break;
  }

  return state;
}

const store = createStore(testReducer, 
    composeWithDevTools(applyMiddleware(reactRouterReduxMiddleware, thunk)));

ReactDOM.render(<Router>
  <Provider store={store}>
    <div>
    <Redirector />    
      <App />
    </div>
  </Provider></Router>,
  document.getElementById('root')
);