

import React, { Component } from 'react';
import './badge.less';

export default class Badge extends Component {
  render() {
    const { num } = this.props;

    if (num === null || num === undefined || 0 === parseInt(num)) {
      return null;
    }
    return (
          <div className="message-badge">
              <text>{ num }</text>
            </div>
    );
  }
}
