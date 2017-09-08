import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import { connect } from 'react-redux';

class NotificationMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { isNotificationMenuVisible: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState(prevState => ({
      isNotificationMenuVisible: !prevState.isNotificationMenuVisible,
    }));
  }

  handleClickOutside() {
    // this.closeMenu();
    if (this.state.isNotificationMenuVisible) {
      this.toggleMenu();
    }
  }

  render() {
    return (
      <li className="dropdown notifications-menu">
        <a role="button" tabIndex="0" className="dropdown-toggle" onClick={this.toggleMenu}>
          <i className="fa fa-cogs" />
        </a>
        {this.state.isNotificationMenuVisible &&
          <ul className="dropdown-menu" style={{ display: 'block' }}>
            <li className="header">Settings</li>
            <li>
              <ul className="menu">
                <li>
                  <a role="button" tabIndex="-1">
                    <i className="fa fa-user-circle text-red" /> Account
                  </a>
                </li>
                <li>
                  <a role="button" tabIndex="-1">
                    <i className="fa fa-wrench text-red" /> Devices
                  </a>
                </li>
                <li>
                  <a role="button" tabIndex="-1">
                    <i className="fa fa-question-circle text-red" /> About
                  </a>
                </li>
                <li>
                  <a role="button" tabIndex="-1">
                    <i className="fa fa-sign-out text-red" /> Log Out
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        }
      </li>
    );
  }
}

function mapStateToProps(state) {
  return {
    alerts: state.alerts,
  };
}

export default connect(mapStateToProps)(onClickOutside(NotificationMenu));
