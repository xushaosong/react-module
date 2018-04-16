import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { setTestData } from '../action/test';
import { Toast } from  'antd-mobile';
import './test.less';
class Test extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div
        className='container-div'
        onClick={e => {
        e.preventDefault();
        dispatch(setTestData()).then(res => {
          Toast.success('成功')
        }).catch(e => {
          Toast.fail('失败')
        })
      }}>测试模板结果：{this.props.data}</div>
    )
  }
}

function selector(store) {
  return store.Test;
}

export default connect(selector)(Test);
