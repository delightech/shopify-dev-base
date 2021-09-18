// import { Page, Card, Button, } from '@shopify/polaris';
// eslint-disable-next-line no-use-before-define
import React from 'react';
import {
 BrowserRouter, Route, Switch,
  Link,
} from 'react-router-dom';
import { Home } from './components/Home';

export const App = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};
