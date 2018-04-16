import React, { Component } from 'react';
import './slider_verify.less';
import '../../../less/icon.less'
export default class SliderVerify extends Component {

  constructor(props) {
    super(props);
    this.originX = 0;

    this.timer = null;
    this.verified = false;

    this._onTouchStartAction = this._onTouchStart.bind(this);
    this._onTouchMoveAction = this._onTouchMove.bind(this);
    this._onTouchEndAction = this._onTouchEnd.bind(this);
    this._onTouchCancelAction = this._onTouchEnd.bind(this);

    this._onMouseDownAction = this._onMouseDown.bind(this);
    this._onMouseMoveAction = this._onMouseMove.bind(this);
    this._onMouseUpAction = this._onMouseUp.bind(this);


    this.mouseDown = false;
  }

  componentDidMount() {

    $('#sliderDone').on('touchstart', this._onTouchStartAction);
    $('#sliderDone').on('touchmove', this._onTouchMoveAction);
    $('#sliderDone').on('touchend', this._onTouchEndAction);
    $('#sliderDone').on('touchcancel', this._onTouchCancelAction);

    $('#sliderDone').on('mousedown', this._onMouseDownAction);
    $('#sliderDone').on('mousemove', this._onMouseMoveAction);
    $('#sliderDone').on('mouseup', this._onMouseUpAction);
    $('#sliderDone').on('mouseleave', this._onMouseUpAction);
  }
  _onTouchStart(e) {
    e.preventDefault();
    this._start(e.touches[0].clientX)
  }
  _onTouchMove(e) {
    e.preventDefault();
    this._move(e.touches[0].clientX)
  }
  _onTouchEnd(e) {
    this._end();
  }

  _onMouseDown(e) {
    this.mouseDown = true;
    this._start(e.clientX);
  }
  _onMouseMove(e) {
    if (this.mouseDown) {
      this._move(e.clientX);
    }
  }
  _onMouseUp(e) {
    this.mouseDown = false;
    this._end()
  }

  _start(x) {
    this.originX = x;
    $('#sliderDone').css({
      backgroundColor: '#007aff'
    })
    $('#sliderDone').removeClass('icon-right-gray-double-arrow');
    $('#sliderDone').addClass('icon-right-white-double-arrow');
  }
  _move(x) {
    let left = 0;
    let containerWidth = document.getElementById('sliderContainer').clientWidth;
    if (x < this.originX) {
      left = 0;
    } else if (x - this.originX >=  containerWidth - 0.4 * window.rem) {
      left = containerWidth - 0.4 * window.rem
    } else {
      left = x - this.originX
    }
    $('#gradient').css({
      width: left + 2  + 'px',
      // borderLeft: '1px solid #007aff',
      // borderTop: '1px solid #007aff',
      // borderBottom: '1px solid #007aff',
      backgroundColor: 'rgba(0,122,255,0.2)',
      boxShadow: 'inset 0 0 10px rgba(0,122,255,1)'
    })
    $('#sliderDone').css({
      left: left + 'px'
    });
    if (left === containerWidth - 0.4 * window.rem) {
      // if (this.timer) {
      //   return;
      // }
      // this.timer = setTimeout(() => {
        if (parseFloat($('#sliderDone').css('left').replace('px', '')) >= (containerWidth - 0.4 * window.rem -5)) {
          this.verified = true
        }
      // }, 500);
    } else {
      this.verified = false;
      //
      // clearTimeout(this.timer);
      // this.timer = null;
    }
  }
  _end() {
    if (this.verified) {
      $('#tipText').html('验证通过');
      $('#tipText').animate({
        color: 'white'
      }, 250, 'ease-in-out')
      $('#gradient').animate({
        boxShadow: 'inset 0 0 10px rgba(80,200,180,1)',
        backgroundColor: 'rgba(80,200,180,0.2)'
      }, 250, 'ease-in-out');
      $('#sliderDone').animate({
        backgroundColor: 'rgba(80,200,180,1)'
      }, 250, 'ease-in-out');
      $('#sliderContainer').animate({
        backgroundColor: 'white'
      }, 250, 'ease-in-out');
      $('#sliderDone').addClass('icon-login-verify-right');
      $('#sliderDone').removeClass('icon-right-gray-double-arrow');
      $('#sliderDone').removeClass('icon-right-white-double-arrow');

      $('#sliderDone').off('touchstart')
      $('#sliderDone').off('touchmove')
      $('#sliderDone').off('touchend')
      $('#sliderDone').off('touchcancel');

      $('#sliderDone').off('mousedown');
      $('#sliderDone').off('mousemove');
      $('#sliderDone').off('mouseup');
      $('#sliderDone').off('mouseleave');

      this.props.callback && this.props.callback();
    } else {

      $('#sliderDone').animate({
        left: 0,
        backgroundColor: 'white'
      }, 250, 'ease-in-out');
      $('#gradient').animate({
        width: 0
      }, 250, 'ease-in-out', () => {
        $('#gradient').css({
          border: 'none',
          backgroundColor: 'transparent'
        })
      });

      $('#sliderDone').addClass('icon-right-gray-double-arrow');
      $('#sliderDone').removeClass('icon-right-white-double-arrow');
    }
  }

  render() {
    return (
      <div
        id='sliderContainer'
        className='slider-verify-container'
        style={this.props.style}
      >
        <div
          ref='sliderDone'
          id='sliderDone'
          className='icon icon-right-gray-double-arrow slider-done'
        ></div>
        <div
          id='gradient'
          className='gradient'/>
        <div id='tipText' className='tip-text'>请按住滑块，拖动到最右边</div>
      </div>
    )
  }
}