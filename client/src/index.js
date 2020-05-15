import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';

ReactDOM.render(
  <Router>
    <Security
      issuer={`${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`}
      client_id={process.env.REACT_APP_OKTA_CLIENT_ID}
      redirect_uri={`${window.location.origin}/implicit/callback`}
    >
      <Route path="/" exact component={App} />
      <Route path="/implicit/callback" component={ImplicitCallback} />
    </Security>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
