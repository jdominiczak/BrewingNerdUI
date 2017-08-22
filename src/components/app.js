import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


import Header from './header';
import BodyHeader from './body/body_header';
import BodyContent from './body/body_content';
import Dashboard from './body/dashboard';
import Recipes from './body/recipes';

export default class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <Header>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/recipes" component={Recipes} />
            <Redirect to="/" />
          </Switch>
        </Header>
      </BrowserRouter>
    );
  }
}
