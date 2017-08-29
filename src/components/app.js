import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


import Header from './header';
import Footer from './header/footer';
import BodyHeader from './body/body_header';
import BodyContent from './body/body_content';
import Dashboard from './body/dashboard';
import Recipes from './body/recipes';
import Alerts from './body/alerts';
import AlertDetail from './body/alerts/alert_detail'

export default class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <div className="wrapper">
          <Header>
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/recipes" component={Recipes} />
              <Route path="/alerts/:alertID" component={AlertDetail} />
              <Route path="/alerts" exact component={Alerts} />

              <Redirect to="/" />
            </Switch>
          </Header>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
