import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


import Header from './header';
import BodyHeader from './body/body_header';
import BodyContent from './body/body_content';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarCollapsed: false
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);

  }

  toggleSidebar() {
    this.setState(prevState => ({
      sidebarCollapsed: !prevState.sidebarCollapsed
    }));
  }


  render() {
    let sidebarClass = "sidebar-mini"
    if (this.state.sidebarCollapsed) {
      sidebarClass += " sidebar-collapse";
    }
    let breadcrumbs = [{"name":"breadcrumb1", "link":"/test1"}, {"name":"breadcrumb2", "link":"/test2"}, {"name":"Last One", "active":"active"}]

    return (

      <div className={sidebarClass}>
        <Header sidebarCollapsed={this.state.sidebarCollapsed} toggleSidebar={this.toggleSidebar}/>
        <div className="content-wrapper">
          <BodyHeader headerTitle="Big Title" headerSmallTitle="Small Title" breadcrumbs={breadcrumbs}/>
          <BodyContent text="test1"/>
        </div>
      </div>

    );
  }
}
