import React, { Component } from 'react';

import NotificationMenu from './notification_menu';
import SettingMenu from './setting_menu'

export default class Navbar extends Component {

  render() {
    return (
      <header className="main-header">
        <a href="/" className="logo">
          <span className="logo-mini"><b>Br</b>N</span>
          <span className="logo-lg"><b>Brewing</b>Nerd</span>
        </a>
        <nav className="navbar navbar-static-top">
          <a className="sidebar-toggle" onClick={this.props.toggleSidebar} >
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <NotificationMenu/>
              <SettingMenu/>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
