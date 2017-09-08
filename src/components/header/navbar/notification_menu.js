import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAlertsIfNeeded } from '../../../actions/alert_actions';
import { sortArrayByProp } from '../../../util';
import NotificationItem from './notification_item';

class NotificationMenu extends Component {
  static renderAlert(alert) {
    const alertTime = Date.parse(alert.created_at); // This is already UTC
    const nowTime = Date.now();
    let diffTime = ((nowTime - alertTime) / 1000); // Seconds /(24*60*60);
    let timeString = '';
    // Difference is less than 60 seconds
    if (diffTime < 60) {
      timeString = `${Number(diffTime).toFixed(0)}s`;
    } else if (diffTime < (60 * 60)) {
      // less than 60 minutes
      diffTime /= 60;
      timeString = `${Number(diffTime).toFixed(0)}m`;
    } else if (diffTime < (60 * 60 * 24)) {
      // less than one day
      diffTime /= (60 * 60);
      timeString = `${Number(diffTime).toFixed(0)}h`;
    } else if (diffTime < (60 * 60 * 24 * 30)) {
      diffTime /= (60 * 60 * 24);
      timeString = `${Number(diffTime).toFixed(0)}d`;
    } else if (diffTime < (60 * 60 * 24 * 365)) {
      diffTime /= (60 * 60 * 24 * 30);
      timeString = `${Number(diffTime).toFixed(0)}mo`;
    } else {
      diffTime /= (60 * 60 * 24 * 365);
      timeString = `${Number(diffTime).toFixed(0)}y`;
    }

    return (
      <NotificationItem
        key={alert.id}
        id={alert.id}
        title={alert.title}
        text={alert.description}
        time={timeString}
        type={alert.type}
        acknowledged={alert.acknowledged}
      />
    );
  }

  constructor(props) {
    super(props);
    this.state = { isNotificationMenuVisible: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }


  componentDidMount() {
    // TODO: This needs to be uncommented for production
    // this.alert_refresh = setInterval(() => this.props.dispatch(fetchAlertsIfNeeded()), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.alert_refresh);
  }


  toggleMenu() {
    this.setState(prevState => ({
      isNotificationMenuVisible: !prevState.isNotificationMenuVisible,
    }));

    this.props.dispatch(fetchAlertsIfNeeded());
  }

  handleClickOutside() {
    if (this.state.isNotificationMenuVisible) {
      this.toggleMenu();
    }
  }

  render() {
    const alerts = sortArrayByProp('created_at', this.props.alerts);
    return (
      <li className="dropdown messages-menu">
        <a role="button" tabIndex="-1" className="dropdown-toggle" onClick={this.toggleMenu}>
          <i className="fa fa-exclamation-triangle" />
          {alerts.length > 0 &&
            <span className="label label-danger">{alerts.length}</span>
          }
        </a>
        {this.state.isNotificationMenuVisible &&
          <ul className="dropdown-menu" style={{ display: 'block' }}>
            <li className="header">You have {alerts.length} alerts</li>
            <li>
              <ul className="menu">
                {alerts.map(alert => NotificationMenu.renderAlert(alert))}
              </ul>
            </li>
            <li className="footer"><Link to="/alerts">See All Alerts</Link></li>
          </ul>
        }
      </li>
    );
  }
}

function mapStateToProps(state) {
  return {
    alerts: state.alerts.alerts,
  };
}

export default connect(mapStateToProps)(onClickOutside(NotificationMenu));

NotificationMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  alerts: PropTypes.shape({
  }),
};

NotificationMenu.defaultProps = {
  alerts: {},
};
