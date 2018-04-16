import React, { Component } from 'react';

import { Flex } from 'antd-mobile'
import './empty-list.less';

export default class EmptyList extends Component {
  render() {
    return (
       <Flex
         style={this.props.style}
         justify='center'
         align='center'
         direction='column'
         className='empty-list-container'
         onClick={e  =>{
           e.preventDefault();
           this.props.callback && this.props.callback();
         }}
       >
        <img src={ require('../../../source/image/empty.png')}/>
         <div>点击刷新</div>
         <div>没有数据</div>
      </Flex>
    )
  }
}