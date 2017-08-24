import React, { Component } from 'react';
import NotificationItem from './notification_item';
import onClickOutside from 'react-onclickoutside';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAlerts } from '../../../actions';
import { sortArrayByProp } from '../../../util';
import { Link } from 'react-router-dom';

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
    this.props.fetchAlerts();
  }

  handleClickOutside = evt => {
    //this.closeMenu();
    if(this.state.isNotificationMenuVisible) {
      this.toggleMenu();
    }
  }

  renderAlert(alert) {
    let alertTime = Date.parse(alert.created_at);  //This is already UTC
    let nowTime = Date.now();
    let diffTime = ((nowTime - alertTime)/1000) //Seconds /(24*60*60);
    let timeString = ""
    //Difference is less than 60 seconds
    if (diffTime < 60) {
      timeString = ~~diffTime + "s";
    }
    else if (diffTime < (60*60) ) {
      //less than 60 minutes
      diffTime = diffTime/60;
      timeString = ~~diffTime + "m";
    }
    else if (diffTime < (60*60*24) ) {
      //less than one day
      diffTime = diffTime/(60*60);
      timeString = ~~diffTime + "h";
    } else if (diffTime < (60*60*24*30) ) {
      diffTime = diffTime/(60*60*24);
      timeString = ~~diffTime + "d";
    } else if (diffTime < (60*60*24*365) ) {
      diffTime = diffTime/(60*60*24*30);
      timeString = ~~diffTime + "mo";
    } else {
      diffTime = diffTime/(60*60*24*365);
      timeString = ~~diffTime + "y";
    }

    return (
      <NotificationItem key={alert.id} id={alert.id} title={alert.title} text={alert.description} time={timeString} type={alert.type} acknowledged={alert.acknowledged}/>
    );
  }


  render() {
      //console.log(sortArrayByProp("created_at",this.props.alerts));
      //console.log(this.props.alerts);
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
                    {sortArrayByProp("created_at",this.props.alerts).map(this.renderAlert)}
                  </ul>
                </li>
                <li className="footer"><Link to="/alerts">See All Alerts</Link></li>
              </ul>
            }
        </li>
      )};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAlerts }, dispatch);
}

function mapStateToProps(state) {
  return {
    alerts: state.alerts.alerts
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(NotificationMenu));
