import React, {Component} from 'react';

export default class GameBoard extends Component {
  handleLogout() {
    Meteor.logout();
  }

  render() {
    return (<div className="ui menu inverted">
      <div className="header item">
        Placeholder for header
      </div>

      {
        this.props.user
          ? (<div className="right menu">
            <i className="meh icon"/> {this.props.user.username}
            <input className="ui button" type="button" onClick={this.handleLogout.bind(this)} value="Logout"/>
          </div>)
          : null
      }
    </div>)
  }
}
