import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuth } from '@okta/okta-react';
import { useAuth } from './components/auth/auth';

const App = widthAuth(({auth} )=> {
  const [authenticated, user] = useAuth(auth);
  {authenticated !== null && (
    console.log("this checks if user is authenticated or not, things in here will only show up if user is authenticated")
    // can modify page
    // if (user) {
    //   url.searchParams.set('firstName', user.given_name);
    //   url.searchParams.set('lastName', user.family_name);
    // }
  )};


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
})

export default App;
