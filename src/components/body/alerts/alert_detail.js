import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { modifyAlert, deleteAlert } from '../../../actions/alert_actions';


import BodyHeader from '../body_header';
import BodyContent from '../body_content';
import AlertBox from './alert_box';
import BnDate from '../../../util/bn_date';

class AlertDetail extends Component {
  constructor(props) {
    super(props);
    this.toggleAlert = this.toggleAlert.bind(this);
  }

  /*
  * Alert Box inputs: title, time, created, modified, resolved, type,
  *                   description, sourceLink, sourceText, acknowledged,
  *        functions: toggleAlert(), deleteAlert()
  */
  toggleAlert(alertURL, acknowledged) {
    const data = { acknowledged };
    this.props.modifyAlert(alertURL, data);
  }


  renderAlertBox() {
    const alert = this.props.alerts[this.props.match.params.alertID];
    // console.log(alert)
    if (alert === undefined) {
      return (
        <AlertBox loading />
      );
    }
    return (
      <AlertBox
        title={alert.title}
        resolved={alert.resolved_timestamp === null ? 'No' : 'Yes'}
        type={alert.type}
        description={alert.description}
        acknowledged={alert.acknowledged}
        time={BnDate.toWordsDateAndDayAndTime(new Date(alert.created_at))}
        modified={BnDate.toPrettyDateTime(new Date(alert.modified_at))}
        created={BnDate.toPrettyDateTime(new Date(alert.created_at))}
        active={alert.acknowledged}
        toggleAlert={this.toggleAlert}
        sourceLink={alert.target}
        sourceText={alert.target}
        url={alert.url}
      />
    );
  }


  render() {
    const breadcrumbs = [{ name: 'Home', link: '/' },
      { name: 'Alerts', link: '/alerts' },
      { name: 'Alert Detail' }];
    return (
      <div>
        <BodyHeader headerTitle="Alerts" headerSmallTitle="" breadcrumbs={breadcrumbs} />
        <BodyContent>
          {this.renderAlertBox()}
        </BodyContent>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    alerts: state.alerts.alerts,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ modifyAlert, deleteAlert }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertDetail);

AlertDetail.propTypes = {
  modifyAlert: PropTypes.func.isRequired,
  alerts: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      alertID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

AlertDetail.defaultProps = {

};
