import React, { Component } from 'react';
import NotificationItem from './notification_item';
import onClickOutside from 'react-onclickoutside';
import { connect } from 'react-redux';

class NotificationMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {isNotificationMenuVisible: false};
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState(prevState => ({
      isNotificationMenuVisible: !prevState.isNotificationMenuVisible
    }));
  }

  handleClickOutside = evt => {
    //this.closeMenu();
    if(this.state.isNotificationMenuVisible) {
      this.toggleMenu();
    }
  }

  render() {
      return (
        <li className="dropdown notifications-menu">
          <a href="#" className="dropdown-toggle" onClick={this.toggleMenu}>
            <i className="fa fa-cogs"></i>
          </a>
            {this.state.isNotificationMenuVisible &&
              <ul className="dropdown-menu" style={{display:"block"}}>
                <li className="header">Settings</li>
                <li>
                  <ul className="menu">
                    <li>
                      <a href="#">
                        <i className="fa fa-user-circle text-red"></i> Account
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-wrench text-red"></i> Devices
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-question-circle text-red"></i> About
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-sign-out text-red"></i> Log Out
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            }
        </li>
      )};
}

function mapStateToProps(state) {
  return {
    alerts: state.alerts
  };
}

export default connect(mapStateToProps)(onClickOutside(NotificationMenu));
