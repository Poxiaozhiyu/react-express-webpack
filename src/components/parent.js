'use strict';

import React, {Component} from 'react';
import Comp from './comp';

class Parent extends Component {
  render() {
    return (
      <Comp comp-name="Express" current-time={this.props['current-time']} />
    );
  }
}

export default Parent;