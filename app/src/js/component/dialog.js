
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../../less/icon.less';
import './dialog.less'
import { Flex, Button, Toast, InputItem, Icon } from 'antd-mobile'
import {smartScroll} from '../../util/util'
import SliderVerify from "./slider_verify";
import { onWindowResize, offWindowResize } from '../../util/util'

const JMDialogType = {
  RepaymentTip: 2
}

import { encode } from '../../util/base64'
import LoadingAnim from "./loading_anim";
import {RoutePath} from "../../const/router";
export default class JMDialog extends Component {

  constructor(props) {
    super(props);
    this.dialogShow = false;
    this.data = null;
    this.renderContent = this.handleRenderContent.bind(this);

  }

  componentDidMount() {
    JMLOG('componentDidMount')
    onWindowResize((clientWidth, windowWidth) => {
      $('#JMDialogContainer').css({
        width: clientWidth + 'px',
        left: (windowWidth - clientWidth) / 2 + 'px'
      })
    })
  }
  componentWillUnmount() {
    offWindowResize();

  }
  dialogRepaymentTip() {
    return (
      <Flex
        id='animateContainer'
        direction='column'
        justify='start'
        className='dialog-repayment-tip-container'
        style={{
          width: '2.8rem'
        }}
      >
        <div className='tip'>
          我已线下还款（需要出借人确认）
        </div>
        <Flex className='bottom-two-button'>
          <Flex.Item
            onClick={e => {
              e.preventDefault();
              this.dismissDialog();
              this.data.callback && this.data.callback(false)
            }}
          >取消</Flex.Item>
          <Flex.Item
            onClick={e => {
              e.preventDefault();
              this.dismissDialog();
              this.data.callback && this.data.callback(true)
            }}
          >确认</Flex.Item>
        </Flex>
      </Flex>
    )
  }

  handleRenderContent() {
    if (!this.data) {
      return null
    }
    if (this.data.type === 2) {
      return  this.dialogRepaymentTip();
    }


  }
  showDialog(data) {
    this.dialogShow = true;
    this.data = data;
    this.forceUpdate();
    smartScroll($('#JMDialogContainer'), $('#animateContainer'), true);
  }
  componentDidUpdate() {
    $('#JMDialogBg').animate({
      opacity: 1
    }, 500, 'ease-in-out');

    $('#animateContainer').animate({
      opacity: 1,
      scale: '1, 1',
      translate3d: '-50%,-50%,0'
    }, 500, 'ease-in-out')
  }
  dismissDialog() {

    $('#animateContainer').animate({
      opacity: 0,
      scale: '0, 1',
      translate3d: '-50%,-50%,0'
    }, 250, 'ease-in-out')
    $('#JMDialogBg').animate({
      opacity: 0
    }, 250, 'ease-in-out', () => {
      this.dialogShow = false;
      this.forceUpdate();
      smartScroll($('#JMDialogContainer'), $('#animateContainer'), false)
    });
  }

  render() {
    return this.dialogShow ? (
      <div id='JMDialogContainer' className='jm-dialog-container'>
        <div
          id='JMDialogBg'
          className='jm-dialog-bg'
          onClick={e => {
            e.preventDefault()
            if (this.data.type === 3 || this.data.type === 4) {
              this.dismissDialog();
            }
          }}
        >
        </div>
        { this.renderContent() }
      </div>
    ) : null
  }
}