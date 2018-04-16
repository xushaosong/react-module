import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './header-refresh.less';
import { Flex } from 'antd-mobile';

import LoadingAnim from './loading_anim';

export default class HeaderRefresh extends Component {

  constructor(props) {
    super(props);

    this.circleWidth = 0.4;
    this.containerHeight = 0.8;

    this.refreshLeft = 0;
    this.refreshTop = 0;
    this.refreshWidth = 0;

    this.refreshState = 0; // 0 正常  1 释放可刷新 2刷新中
    this.parent = null;

    this.loadingStyleType = props.styleType ? props.styleType : 'gray'
  }

  _scrollWindow(scrollTop) {
    if (this.refreshState === 3) {
      if (scrollTop <= this.containerHeight * window.rem) {
        $('#headerRefreshContainer').css({
          visibility: 'visible'
        })
      } else if (scrollTop > this.containerHeight * window.rem){
        $('#headerRefreshContainer').css({
          visibility: 'hidden'
        })
      }
      return;
    } else {
      if (scrollTop <= 0) {
        $('#headerRefreshContainer').css({
          visibility: 'visible'
        })
      } else if (scrollTop > 0){
        $('#headerRefreshContainer').css({
          visibility: 'hidden'
        })
      }
    }
    this._drawCircle(scrollTop);
    if (-scrollTop < this.containerHeight * window.rem) {
      $('#refreshText').html('下拉刷新')
      this.refreshState = 0;
    } else if (-scrollTop > this.containerHeight * window.rem) {
      $('#refreshText').html('释放刷新')
      this.refreshState = 1;
    }
  }
  _windowSizeChange(clientWidth, windowWidth) {
    if (this.refreshState === 3) {
      return;
    }
    this.refreshLeft = (windowWidth - clientWidth) / 2 + 'px';
    this.refreshTop = this.parent.offset().top + 'px';
    this.refreshWidth = clientWidth + 'px'

    JMLOG('this.parent.offset().top')
    JMLOG(this.refreshTop)
    $('#headerRefreshContainer').css({
      left: this.refreshLeft,
      width: this.refreshWidth
    });
  }

  componentDidMount() {

    this.parent = $('#headerRefreshContainer').parent();


    $('#headerRefreshContainer').css({
      top: this.parent.offset().top + 'px',
    })
    if (this.parent) {
      this.parent.css({
        position: 'relative',
        zIndex: 1
      });
    }
    $(document).on('touchend', (e) => {
      if (this.refreshState === 3) {
        return;
      }
      if (this.refreshState === 1) {
        this.refreshState = 3;
        this._beginRefresh();
      } else {
        this.refreshState = 0;
      }
    })
  }
  _endRefresh() {
    this.refreshState = 0;
    $('#canvas').css({
      display: ''
    });
    $('#loadingAnim').css({
      display: 'none'
    })
    this.parent.css({
      top: 0
    });
    this.props.endRefresh && this.props.endRefresh();
  }
  _beginRefresh() {
    $('#refreshText').html('正在加载')
    this.parent.css({
      top: this.containerHeight * window.rem + 'px'
    });
    $('#canvas').css({
      display: 'none'
    });
    $('#loadingAnim').css({
      display: ''
    })

    this.props.beginRefresh && this.props.beginRefresh();

  }
  _drawCircle(scrollTop) {
    let lastHeight = this.containerHeight * window.rem;

    let ratio = -scrollTop / lastHeight;
    if (ratio < 0) {
      return;
    }
    if (ratio > 1) {
      ratio = 1;
    }
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = this.loadingStyleType === 'gray' ? '#C8C8C8' : '#fff';
    ctx.lineCap = 'round'
    let circle = {
      x : this.circleWidth * window.rem / 2,    //圆心的x轴坐标值
      y : this.circleWidth * window.rem / 2,    //圆心的y轴坐标值
      r : this.circleWidth * window.rem / 2 - 5      //圆的半径
    };
    ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2 * ratio, false);
    ctx.stroke();
    ctx.closePath();
  }


  render() {
    return (
      <Flex
        justify='center'
        id='headerRefreshContainer'
        className='header-refresh-container'
        style={{
          height: this.containerHeight + 'rem',
          top: -this.containerHeight + 'rem',
        }}
      >
        <canvas
          id='canvas'
          width={this.circleWidth * window.rem + 'px'}
          height={this.circleWidth * window.rem + 'px'}
          style={{
            marginRight: 15 + 'px'
          }}

        />
        <LoadingAnim type={this.loadingStyleType} id='loadingAnim' style={{
          display: 'none',
          width: (this.circleWidth * window.rem) / 2 + 'px',
          height: (this.circleWidth * window.rem) / 2 + 'px',
          marginRight: 15 + 'px'
        }}/>
        <div
          id='refreshText'
          className='refresh-state-text'
          style={{
            color: this.loadingStyleType === 'gray' ? '#C8C8C8' : '#fff'
          }}
        ></div>
      </Flex>
    )
  }
}
