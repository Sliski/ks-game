import React, { Component } from 'react';
import UserHeader from './UserHeader.jsx';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMsg: '',
    };
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleRegister(e) {
    e.preventDefault();

    const username = this.state.username.trim();
    const password = this.state.password.trim();
    if (username === '') {
      this.setState({ errorMsg: 'Login is required.' });
      return;
    }

    this.setState({ errorMsg: '' });
    Accounts.createUser(
      {
        username,
        password,
      },
      (error) => {
        if (error) {
          this.setState({ errorMsg: error.reason });
        }
      },
    );
  }

  handleLogin(e) {
    e.preventDefault();

    const username = this.state.username.trim();
    const password = this.state.password.trim();

    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        this.setState({ errorMsg: error.reason });
      }
    });
  }

  render() {
    return (
      <div>
        <UserHeader user={this.props.user} />

        <div>
          <div>Sign in or Register:</div>
          <form
            className={`${this.state.errorMsg !== '' ? 'error ' : ''}ui form`}
            name="login-form"
            onSubmit={this.handleLogin.bind(this)}
          >
            <div>{this.state.errorMsg}</div>

            <div>
              <input
                type="text"
                onChange={this.handleUsernameChange.bind(this)}
                placeholder="Login"
              />
            </div>
            <div>
              <input
                type="password"
                onChange={this.handlePasswordChange.bind(this)}
                placeholder="Password"
              />
            </div>
            <div>
              <input type="submit" value="Login" />
              <input type="button" value="Register" onClick={this.handleRegister.bind(this)} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
