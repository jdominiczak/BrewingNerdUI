import React, { Component } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';


export default class Header extends Component {
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

    return (
      <div className={sidebarClass}>
        <Navbar toggleSidebar={this.toggleSidebar}/>
        <Sidebar />
        <div className="content-wrapper">
          {this.props.children}
        </div>
      </div>
    );
  }
}
