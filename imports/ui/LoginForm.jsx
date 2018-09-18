import React, {Component} from 'react';
import GameHeader from './GameHeader.jsx';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMsg: ''
    }
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleRegister(e) {
    e.preventDefault();

    let username = this.state.username.trim();
    let password = this.state.password.trim();
    if (username === '') {
      this.setState({errorMsg: 'Login is required.'});
      return;
    }

    this.setState({errorMsg: ''});
    Accounts.createUser({
      username: username,
      password: password
    }, (error, result) => {
      if (error) {
        this.setState({errorMsg: error.reason});
      }
    });
  }

  handleLogin(e) {
    e.preventDefault();

    let username = this.state.username.trim();
    let password = this.state.password.trim();

    Meteor.loginWithPassword(username, password, function(error) {
      console.log(error.reason);
    });
  }

  render() {
    return (<div className="ui container">
      <GameHeader user={this.props.user}/>

      <div className="ui segment">
        <div>Sign in or Register:</div>
        <form className={(
            this.state.errorMsg !== ''
            ? 'error '
            : '') + "ui form"} name="login-form" onSubmit={this.handleLogin.bind(this)}>

          <div className="ui error message">
            <div className="header">{this.state.errorMsg}</div>
          </div>

          <div className="inline fields">
            <div className="field">
              <input type="text" onChange={this.handleUsernameChange.bind(this)} placeholder="Login"/>
            </div>
            <div className="field">
              <input type="password" onChange={this.handlePasswordChange.bind(this)} placeholder="Password"/>
            </div>
            <div>
              <input className="ui button" type="submit" value="Login"/>
              <input className="ui button" type="button" value="Register" onClick={this.handleRegister.bind(this)}/>
            </div>
          </div>
        </form>
      </div>
    </div>)
  }
}
