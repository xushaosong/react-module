import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './footer_loading.less';
import { Flex } from 'antd-mobile'

export default class FooterLoading extends Component {

  constructor(props) {
    super(props);
    this.loadingState = props.state ? props.state : 0; // 0正常 1正在加载 2没有数据了 3不加载数据 4加载失败

  }
  _setLoadingState(state) {
    if (this.loadingState === 1) {
      return;
    }
    JMLOG('state:' + state)
    this.loadingState = state;
    if (state === 0) {
      this._endLoadMore();
    } else if (state === 1) {
      this._beginLoadMore();
    } else if (state === 2) {
      this._noData();
    }
  }
  _scrollWindow(scrollTop) {
    if (this.loadingState === 1 || this.loadingState === 2) {
      JMLOG(this.loadingState);
      return;
    }
    if (this.getScrollHeight() - (scrollTop + this.getClientHeight()) <= 1 * window.rem) {
      JMLOG('底部开始加载了')
      this._beginLoadMore();
    }
  }
  componentDidMount() {
    this._setLoadingState(this.loadingState);
  }
  _beginLoadMore() {
    this.loadingState = 1;
    $('#loadMoreAnim').css({
      display: ''
    })
    $('#LoadMoreSign').css({
      display: 'none'
    })
    $('#noData').css({
      display: 'none'
    })
    this.props.loadMore && this.props.loadMore();
  }
  _loadFail() {

  }
  _endLoadMore() {
    this.loadingState = 0;
    $('#loadMoreAnim').css({
      display: 'none'
    })
    $('#LoadMoreSign').css({
      display: ''
    })
    $('#noData').css({
      display: 'none'
    })
    this.props.loadMoreEnd && this.props.loadMoreEnd();
  }
  _noData() {
    this.loadingState = 2;
    $('#loadMoreAnim').css({
      display: 'none'
    })
    $('#LoadMoreSign').css({
      display: 'none'
    })
    $('#noData').css({
      display: ''
    })
  }

  getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  }
  getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
      clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    }
    else {
      clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
  }
  render() {
    return (
      <Flex
        className='footer-loading-container'
        justify='center'
        align='center'
      >
        <Flex id='LoadMoreSign' justify='center' align='center'>
          <div>加载更多</div>
        </Flex>
        <Flex
          id='loadMoreAnim'
          className="spinner"
          justify='center'
          align='center'
          style={{
            display: 'none'
          }}
        >
          <div className="rect rect1"></div>
          <div className="rect rect2"></div>
          <div className="rect rect3"></div>
          <div className="rect rect4"></div>
          <div className="rect rect5"></div>
        </Flex>
        <Flex
          id='noData'
          justify='center'
          align='center'
          style={{
            display: 'none',
          }}
        >
          <div>------------ 没有数据啦 ------------</div>
        </Flex>
      </Flex>
    )
  }
}