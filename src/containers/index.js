'use strict';

import React, {Component} from 'react';
import {render} from 'react-dom';
import Pubsub from 'pubsub-js';
import Comp from '../components/comp';
import Parent from '../components/parent';

import '../style/index.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: Date().toLocaleString()
    };
    this._updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    Pubsub.subscribe('UPDATE_STATE', msg => {
      this.updateState();
    })
  }

  comonentWillUnmount() {
    Pubsub.unSubscribe('UPDATE_STATE');
  }

  updateState() {
    this.setState({
      currentTime: Date().toLocaleString()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, React!</h1>
        <Parent current-time={this.state.currentTime} />
        <h3>{this.state.currentTime}</h3>
        <button onClick={this._updateState}>更新State</button>
      </div>
    );
  }
}

render(
  <App />,
  document.querySelector('#root')
);