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
        <li className="dropdown messages-menu">
          <a href="#" className="dropdown-toggle" onClick={this.toggleMenu}>
            <i className="fa fa-exclamation-triangle"></i>
            {this.props.alerts.length > 0 &&
              <span className="label label-danger">{this.props.alerts.length}</span>
            }
          </a>
            {this.state.isNotificationMenuVisible &&
              <ul className="dropdown-menu" style={{display:"block"}}>
                <li className="header">You have {this.props.alerts.length} alerts</li>
                <li>
                  <ul className="menu">
                    {this.props.alerts.map((alert) =>
                      <NotificationItem key={alert.id} title={alert.title} text={alert.text} time={alert.time}/>
                    )}
                  </ul>
                </li>
                <li className="footer"><a href="#">See All Alerts</a></li>
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
