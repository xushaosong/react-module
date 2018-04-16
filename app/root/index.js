/**
 * Created by xss on 2017/6/9.
 */



import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Routers from './router';


const store = configureStore();

global.isEmpty = function (obj) {
  if (obj === undefined || obj === null) {
    return true;
  } else if (typeof obj === 'object' && obj instanceof Array) {
    if (obj.length === 0) {
      return true;
    } else {
      return false;
    }
  } else if (typeof obj === 'object') {
    for (let name in obj) {
      return false;
      // if(obj.hasOwnPrope
    }
    return true;
  }
  return false;
};
global.JMLOG = (p) => {
  if (process.env.NODE_ENV === 'dev') {
    console.log(p);
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Routers/>
  </Provider>,
  document.getElementById('page')
);
