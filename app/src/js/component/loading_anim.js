
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './loading_anim.less';
export default class LoadingAnim extends Component {
  render() {
    var color = this.props.type === 'gray' ? '#c8c8c8' : '#fff'
    return (
      <div className="spinner"
           id={this.props.id}
           style={this.props.style}>
        <div className="spinner-container container1">
          <div style={{ backgroundColor: color}} className="circle1"/>
          <div style={{ backgroundColor: color}} className="circle2"/>
          <div style={{ backgroundColor: color}} className="circle3"/>
          <div style={{ backgroundColor: color}} className="circle4"/>
        </div>
        <div className="spinner-container container2">
          <div style={{ backgroundColor: color}} className="circle1"/>
          <div style={{ backgroundColor: color}} className="circle2"/>
          <div style={{ backgroundColor: color}} className="circle3"/>
          <div style={{ backgroundColor: color}} className="circle4"/>
        </div>
        <div className="spinner-container container3">
          <div style={{ backgroundColor: color}} className="circle1"/>
          <div style={{ backgroundColor: color}} className="circle2"/>
          <div style={{ backgroundColor: color}} className="circle3"/>
          <div style={{ backgroundColor: color}} className="circle4"/>
        </div>
      </div>
    )
  }
}