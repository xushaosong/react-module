
import React, { Component } from 'react';

import { NavBar, Icon } from 'antd-mobile';
import './my-nav.less';
import { onWindowResize, offWindowResize } from '../../util/util'
export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.topPadding = 0;
  }
  componentWillUnmount() {
    offWindowResize();
  }
  componentDidMount() {
    onWindowResize((clientWidth, windowWidth) => {
      if (windowWidth > 650) {
        $('#customNav').css('left',(windowWidth - clientWidth) / 2 + 'px');
      } else {
        $('#customNav').css('left',0 + 'px');
      }
      this.forceUpdate();
    })
  }
  render() {
    const {
      title,
      leftIcon,
      leftAction,
      right,
      rightAction,
      mode = 'light',
      leftContent,
      shadow = true,
      isOpacity } = this.props;

    let width = document.getElementById("page").clientWidth + 'px';
    let left = (document.getElementsByTagName("html")[0].clientWidth - document.getElementById("page").clientWidth) / 2 + 'px';


    return (
      <div
        className='nav-container'
        style={{
          width: width,
          position: 'relative',
          height: window.customNavHeight + 'px',
          backgroundColor: 'transparent'
        }}>
        <div
          id='customNav'
          className='custom-nav'
          style={{
            width: width,
            left: left,
            top: 0,
            height: window.customNavHeight + 'px',
            boxShadow: shadow && !isOpacity ? '0 1px 5px rgba(0, 0, 0, 0.1)' : '',
            backgroundColor: isOpacity ? '' : 'white',
            borderBottom: isOpacity ? '' : '1px solid #f2f2f2'
          }}>
          <NavBar
            style={{
              width: 100 + '%',
              marginTop: this.topPadding + 'px',
              backgroundColor: isOpacity ? 'transparent' : 'white',
            }}
            mode={mode}
            icon={leftIcon}
            leftContent={leftContent}
            onLeftClick={() => {
              leftAction && leftAction();
            }}
            rightContent={right}
          >
            <div style={{
              color: isOpacity ? 'white' : ''
            }}>{title}</div>
          </NavBar>
        </div>
      </div>
    )
  }
}