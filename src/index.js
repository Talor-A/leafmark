import React from "react";
import ReactDOM from "react-dom";
import withFirebaseAuth from "react-with-firebase-auth";
import {app, providers, firebaseAppAuth } from './firebase'
import Bookshelf from './bookshelf'

class App extends React.Component {
  constructor() {
    super();
    this.state = { cities: [] };
  }

  render() {
    const { user, signOut, signInWithTwitter } = this.props;

    const lis = this.state.cities.map(c => {
      return (
        <li key={c.id}>
          {c.name} - {c.temperature}
        </li>
      );
    });
    return (
      <main>
        <h1>Leafmark</h1>
        {user != null ? (
          <p>Hello, {user.displayName}</p>
        ) : (
          <p>Please sign in.</p>
        )}
        {user != null ? (
          <button onClick={signOut}>Sign out</button>
        ) : (
          <button onClick={signInWithTwitter}>Sign in with Twitter</button>
        )}
        <ul>{lis}</ul>
        {user != null && <Bookshelf user={user}/>}
      </main>
    );
  }
}
const AppWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);

ReactDOM.render(<AppWithAuth />, document.getElementById("root"));
