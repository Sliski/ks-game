import React, { Component } from 'react';
import GameController from '../api/controllers/gameController.js';

export default class Chat extends Component {
  handleChange(e) {
    GameController.userTypeInTextArea(this.props.game._id, e.target.value);
  }

  render() {
    return (
      <textarea
        className="chat"
        style={{ resize: 'none' }}
        cols="40"
        rows="5"
        onChange={this.handleChange.bind(this)}
        value={this.props.game.textarea}
      />
    );
  }
}
