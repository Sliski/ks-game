import React, { Component } from 'react';

export default class Token extends Component {
  _empty() {
    return '';
  }

  render() {
    return <div className={this.props.type}>&gt;</div>;
  }
}
