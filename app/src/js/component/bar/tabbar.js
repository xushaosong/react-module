/**
 * Created by xss on 2017/4/10.
 */
/**
 * Created by xss on 2017/4/10.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './tabbar.less';

import { Link } from 'react-router';
import Badge from './badge.js';
import { RoutePath } from '../../../const/router';
import { onWindowResize, offWindowResize } from '../../../util/util'
const HomeIcon = require('../../../../source/image/tabbar/home_n.png');
const HomeIcon_H = require('../../../../source/image/tabbar/home_h.png');

const LoanIcon = require('../../../../source/image/tabbar/xinyong_n.png')
const LoanIcon_H = require('../../../../source/image/tabbar/xinyong_h.png')

const PromotionIcon = require('../../../../source/image/tabbar/mine_n.png')
const PromotionIcon_H = require('../../../../source/image/tabbar/mine_h.png')


export default class Tabbar extends Component {


  constructor(props) {
    super(props);
    window.tabbarHeight = 0.45;
    this.renderTabbars = this.handleRenderTabbars.bind(this);
  }

  componentDidMount() {
    onWindowResize((clientWidth, windowWidth) => {
      $('#tabbar-tabs').css({
        left: (windowWidth - clientWidth) / 2 + 'px',
        bottom: 0,
        width: clientWidth + 'px'
      })
    })
  }
  componentWillUnmount() {
    offWindowResize();
  }

  handleRenderTabbars() {

    const { itemClick } = this.props;

    let tabbars = [
      {
        normal: HomeIcon,
        highlight: HomeIcon_H,
        title: '补借条',
        path: RoutePath.HomeIndex,
        message: 0
      },
      {
        normal: LoanIcon,
        highlight: LoanIcon_H,
        title: '查信用',
        message: 0,
        path: RoutePath.Query
      },
      {
        normal: PromotionIcon,
        highlight: PromotionIcon_H,
        title: '我的',
        message: 0,
        path: RoutePath.MineIndex
      }
    ];
    return tabbars.map((value, index) => {
      const { itemIndex } = this.props;
      return (
        <div
          className='tabbar-item-container'
          onClick={ (e) => {
            e.preventDefault();

            if (!window.locationParams.token || !window.locationParams.accountId) {
              global.jmDialog.showDialog({
                type: 1
              })
              return;
            }

            hashHistory.replace({
              pathname: value.path,
            });
            itemClick && itemClick(index);
          }}
          style={{
            width: document.documentElement.clientWidth / tabbars.length + 'px',

          }}
          key={`tabbar_item_key_${index}`}
        >
          <div className='tabbar-img'>
            <img src={ itemIndex === index ? value.highlight : value.normal } />
          </div>
          <text
            style={{
              color: itemIndex === index ? '#1682D3' : '#969696'
            }}
          >{ value.title }</text>

          <div className="msg-dot">
            <Badge
              num={ value.message }
            />
          </div>

        </div>
      );
    })
  }
  render() {
    return (
      <div
        className='tabbar-container'
        style={{
          height: window.tabbarHeight + 'rem'
        }}
      >
        <div
          id='tabbar-tabs'
          className="tabbar-tabs"
          style={{
            width: document.getElementById("page").clientWidth + 'px',
            left: (document.getElementsByTagName("body")[0].clientWidth - document.getElementById("page").clientWidth) / 2 + 'px',
            height: window.tabbarHeight + 'rem'
          }}
        >
          { this.renderTabbars() }
        </div>
      </div>
    );
  }

}

