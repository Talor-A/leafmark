import React from "react";
import ReactDOM from "react-dom";
import withFirebaseAuth from "react-with-firebase-auth";
import { app, providers, firebaseAppAuth } from "./firebase";
import Bookshelf from "./bookshelf";

class App extends React.Component {
  constructor() {
    super();
    this.state = { cities: [] };
  }

  render() {
    const { user, signOut, signInWithTwitter, signInWithGoogle } = this.props;

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
            <>
              <button onClick={signInWithTwitter}>Sign in with Twitter</button>
              <button onClick={signInWithGoogle}>Sign in with Google</button>
            </>
          )}
        <ul>{lis}</ul>
        {user != null && <Bookshelf user={user} />}
      </main>
    );
  }
}



class AppWithAuth extends React.Component {
  constructor() {
    super()
    this.state = { user: app.auth().currentUser }
  }
  componentDidMount() {
    app.auth().onAuthStateChanged((user) => this.setState({ user }))
  }
  signOut() {
    app.auth().signOut().then(() => console.log('signed out.'))
      .catch(e => console.error(e))
  }
  signIn(provider) {
    app.auth().signInWithPopup(provider).then(function (result) {
      // code which runs on success
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      console.error(errorCode);

      var errorMessage = error.message;
      console.error(errorMessage);
      alert(errorCode + "\n\n" + errorMessage);
    });
  }
  signInWithGoogle() {
    return this.signIn(providers.googleProvider)
  }
  signInWithTwitter() {
    return this.signIn(providers.twitterProvider)
  }

  render() {
    return (
      <App
        user={this.state.user}
        signOut={this.signOut.bind(this)}
        signInWithGoogle={this.signInWithGoogle.bind(this)}
        signInWithTwitter={this.signInWithTwitter.bind(this)}
      />
    )
  }
}

ReactDOM.render(<AppWithAuth />, document.getElementById("root"));
