/**
 * Created by xss on 2017/4/7.
 */


import { applyMiddleware, createStore } from 'redux';

import thunk from 'redux-thunk';
import rootReducer from '../src/reducers/index.js';

import { createLogger } from 'redux-logger';

var buildStore = applyMiddleware(thunk)(createStore);

// TODO:
var isDebuggingInChrome = process.env.NODE_ENV === 'dev'

let logger = createLogger({
    predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true
});

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(
      thunk,
      logger
    )
  );
}