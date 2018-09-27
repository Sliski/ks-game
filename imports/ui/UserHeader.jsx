import React, { Component } from 'react';

export default class UserHeader extends Component {
  handleLogout() {
    Meteor.logout();
  }

  render() {
    return (
      <div>
        <div>placeholder-header</div>

        {this.props.user ? (
          <div>
            <div>
              Logged as
              {` ${this.props.user.username}`}
            </div>
            <input type="button" onClick={this.handleLogout.bind(this)} value="Logout" />
          </div>
        ) : null}
      </div>
    );
  }
}
