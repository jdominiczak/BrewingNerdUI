import React from 'react';
import PropTypes from 'prop-types';
import NotificationMenu from './notification_menu';
import SettingMenu from './setting_menu';

export default function Navbar(props) {
  return (
    <header className="main-header">
      <a href="/" className="logo">
        <span className="logo-mini"><b>Br</b>N</span>
        <span className="logo-lg"><b>Brewing</b>Nerd</span>
      </a>
      <nav className="navbar navbar-static-top">
        <a className="sidebar-toggle" role="button" tabIndex="0" onClick={props.toggleSidebar}>
          <div />
        </a>
        <div className="navbar-custom-menu">
          <ul className="nav navbar-nav">
            <NotificationMenu />
            <SettingMenu />
          </ul>
        </div>
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};
