/**
 * Created by xss on 2017/4/10.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './header_bar.less';


import '../../../../less/icon.less';

export default class HeaderBar extends Component {

  constructor(props) {
    super(props);
    if (!isEmpty(this.props.title) && typeof this.props.title === 'string') {
      document.title = this.props.title;
    }
  }
  componentDidMount() {

  }
  render() {
    const {
      title, left, right, leftStyle, rightStyle, titleStyle, style, backAction, leftAction, rightAction, titleAction
    } = this.props;


    let leftValue = null;
    if (backAction !== null && backAction !== undefined && (left === undefined || left === null)) {
      leftValue = (
        <div className="icon-label-hdb" onClick={e => {
          hashHistory.goBack();
          backAction();
        }}>
          <i className="icon icon-page-back icon-back-hdb"/>
        </div>
      );
    } else {
      if (typeof left  === 'string') {
        leftValue = (
          <div className="left-name-class">
            { left }
          </div>
        );
      } else {
        leftValue = left;
      }
    }

    let rightValue = null;
    if (right !== undefined && right !== null) {
      if (typeof right  === 'string') {
        rightValue = (
          <div className="right-name-class">
            { right }
          </div>
        );
      } else {
        rightValue = right;
      }
    }

    let titleValue = null;
    if ( typeof title === 'string') {
      titleValue = (
        <div className="title-name-class">
          { title }
        </div>
      );
    } else {
      titleValue = title;
    }

    return (
      <div style={ style } className="header-bar-hdb">
        <div onClick={ leftAction } style={ leftStyle } className="bar-item-hdb bar-left-hdb">
          { leftValue }
        </div>
        <div onClick={ titleAction } style={ titleStyle } className="bar-item-hdb bar-center-hdb">
          { titleValue }
        </div>
        <div onClick={ rightAction } style={ rightStyle } className="bar-item-hdb bar-right-hdb">
          { rightValue }
        </div>
      </div>
    );
  }
}
HeaderBar.propTyopes = {
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]), // 中间显示内容，可以是一个字符串、也可以是一个html元素
  left: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]), // 左边显示内容，可以是一个字符串、也可以是一个html元素
  right: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]), // 右边显示内容，可以是一个字符串、也可以是一个html元素
  leftStyle: React.PropTypes.object, // 左边容器的样式
  rightStyle: React.PropTypes.object, // 右边容器的样式
  titleStyle: React.PropTypes.object,  // 中间容器的样式
  style: React.PropTypes.object,  // 整个bar容器的样式
  backAction: React.PropTypes.func, // 返回按钮点击事件（设置了该值，才会显示返回按钮,

  leftAction: React.PropTypes.func,
  titleAction: React.PropTypes.func,
  rightAction: React.PropTypes.func,
};