'use strict';

import React, {Component} from 'react';
import Pubsub from 'pubsub-js';

class Comp extends React.Component {

  constructor(props) {
    super(props);
    this._updateState = this.updateState.bind(this);
  }

  updateState() {
    Pubsub.publish('UPDATE_STATE');
  }

  componentDidMount() {
  }

  comonentWillUnmount() {
  }

  render() {
    return (
      <div>
        <h2 style={{color: 'skyblue'}}>Hello, {this.props['comp-name']}!</h2>
        <h2>从父组件传来的时间：{this.props['current-time']}</h2>
        <button onClick={this._updateState}>更新</button>
      </div>
    );
  }
}

export default Comp;