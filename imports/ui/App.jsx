import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Games from '../api/collections/games.js';
import RoomsList from './RoomsList.jsx';
import Room from './Room.jsx';
import LoginForm from './LoginForm.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGameId: null,
    };
  }

  handleEnterGame(gameId) {
    this.setState({ selectedGameId: gameId });
  }

  handleBackToRoomsList() {
    this.setState({ selectedGameId: null });
  }

  selectedGame() {
    const selectedGame = _.find(this.props.games, game => game._id === this.state.selectedGameId);
    return selectedGame;
  }

  render() {
    if (!this.props.user) {
      return <LoginForm />;
    }

    if (this.state.selectedGameId === null) {
      return (
        <RoomsList
          games={this.props.games}
          enterGameHandler={this.handleEnterGame.bind(this)}
          user={this.props.user}
        />
      );
    }
    return (
      <Room
        game={this.selectedGame()}
        backToRoomsListHandler={this.handleBackToRoomsList.bind(this)}
        user={this.props.user}
      />
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('games');

  return { user: Meteor.user(), games: Games.find().fetch() };
})(App);
