/**
 * Created by xss on 2017/6/9.
 */


import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, hashHistory, IndexRoute, browserHistory, useRouterHistory } from 'react-router';
import { RoutePath } from '../src/const/router';


import APP from './app';
import Test from '../src/js/test';


export default class RouterClass extends Component {

  judgeLogin(nextState, replace) {

  }

  checkLogin() {
    if (!localStorage.hasOwnProperty('openid')) {
      WXAuthorize.wxLogin();
      return false;
    }
    return true;
  }

  render() {
    return (
      <Router history={ hashHistory }>
        <Route component={ APP }>
          <Route component={ Test } path={ RoutePath.Test }/>
        </Route>

      </Router>
    );
  }
}