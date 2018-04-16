/**
 * Created by xss on 2017/6/9.
 */

import React, { Component } from 'react';
import '../less/global.less';
import { connect } from 'react-redux';
import JMDialog from '../src/js/component/dialog';


import { Toast } from 'antd-mobile'
import {RoutePath} from "../src/const/router";




class APP extends Component {

  constructor(props) {
    super(props);

  }
  componentWillMount(){
    this.__PreserveRouterComponentEnterAndLeveScrollTop();
  }
  /**
   * 保存路由切换时的 scroll top 的值。
   * */
  __PreserveRouterComponentEnterAndLeveScrollTop() {
    const { children } = this.props;
    const { props } = children || {};
    const { routes } = props || {};
    if (!Array.isArray(routes)) {
      return;
    }
    const { childRoutes } = routes[1];
    if (!$.isArray(childRoutes)) {
      return;
    }
    const __KeyScroll = 'XTN_ROUTER_SCROLLTOP';
    // 页面离开的时候，记录当前的scrollTop位置

    // console.log(document.body.scrollTop)
    const __onLeave = (args) => {
      JMLOG('args');
      JMLOG(args)
      const __Data = this.state[__KeyScroll] || {};
      __Data[args.toLocaleLowerCase()] = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
      this.state[__KeyScroll]= __Data;
    };
    // 页面进入的时候，查找之前的scrollTop位置，有就更新到之前的位置。
    const __onEnter = (args) => {

      const { location } = args;
      const { pathname } = location;
      const __Data = this.state[__KeyScroll];

      if (__Data && __Data[pathname] && __Data[pathname] > 0) {
        // 为什么这里要晚点时间再更新，因为在切换这后，页面做一些其它的操作所以就设置了这个时间。
        setTimeout(() => {
          document.body.scrollTop = __Data[pathname];
          document.documentElement.scrollTop = __Data[pathname];
        }, 10);
      } else {
        setTimeout(() => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }, 10);
      }
    };
    // 循环将所有路由，将他们都绑定onLeave及onEnter事件。
    childRoutes.forEach((r) => {
      r.onLeave = __onLeave.bind(r, r.path);
      r.onEnter = __onEnter.bind(r);
    });
    /*
    * 这里就怎么说呢，如果调试了的话，就会发现这个数组有两个，有一个IndexRoute
    * IndexRoute 这个是不会存在于 childRoutes 里面的，所以在这里得单独处理一下。
    * 其实下面的代码还是可以完善的。
    * */
    routes.forEach((r) => {
      const { path, isIndex } = r;
      if (path) {
        r.onLeave = __onLeave.bind(r, r.path);
        r.onEnter = __onEnter.bind(r);
      }
      // 这里就说明是 IndexRoute 这个路由，
      if (isIndex === 1) {
        r.onLeave = __onLeave.bind(r, '/');
        r.onEnter = __onEnter.bind(r);
      }
    });
  }
  componentDidMount() {

    console.log('process.env.NODE_ENV:' + process.env.NODE_ENV)
    const { dispatch } = this.props;

    global.jmDialog = this.refs.dialog;

  }

  render() {
    return (
      <div
        style={{
          width: 100 + '%',
          position: 'relative'
        }}
      >
        <JMDialog ref='dialog'/>

        { this.props.children }
        {/*{*/}
          {/*this.state.userInfo ? (*/}

          {/*) : null*/}
        {/*}*/}
      </div>
    )
  }
}

function selector(store) {
  return store.Login;
}

export default connect(selector)(APP);