
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import BodyHeader from '../body_header';
import BodyContent from '../body_content';


import { sortArrayByProp } from '../../../util';
import BnDate from '../../../util/bn_date';

import { modifyAlert, deleteAlert } from '../../../actions/alert_actions';
import Timeline from './timeline';
import TimelineItem from './timeline_item';
import TimelineDate from './timeline_date';


class Alert extends Component {
  constructor(props) {
    super(props);
    this.toggleAlert = this.toggleAlert.bind(this);
  }

  toggleAlert(alertURL, acknowledged) {
    const data = { acknowledged };
    this.props.modifyAlert(alertURL, data);
  }


  renderTimelineObjects() {
    const output = [];
    let dateString = '';
    // for(const alert of sortArrayByProp("created_at",this.props.alerts)) {
    sortArrayByProp('created_at', this.props.alerts).forEach((alert) => {
      const dateTime = new Date(alert.created_at);
      const thisDateString = BnDate.toWordsDate(dateTime);
      if (dateString !== thisDateString) {
        dateString = thisDateString;
        output.push(<TimelineDate key={dateString} date={dateString} />);
      }
      output.push(
        <TimelineItem
          key={alert.id}
          id={alert.url}
          deleteAlert={this.props.deleteAlert}
          toggleAlert={this.toggleAlert}
          active={!alert.acknowledged}
          title={alert.title}
          description={alert.description}
          more_link={`/alerts/${alert.id}`}
          time={BnDate.toPrettyTime(dateTime)}
          icon="fa-exclamation-circle"
        />,
      );
    });
    return output;
  }

  render() {
    const breadcrumbs = [{ name: 'Home', link: '/' }, { name: 'Alerts', link: '/alerts' }];
    return (
      <div>
        <BodyHeader headerTitle="Alerts" headerSmallTitle="" breadcrumbs={breadcrumbs} />
        <BodyContent>
          <Timeline>
            {this.renderTimelineObjects()}
          </Timeline>
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

export default connect(mapStateToProps, mapDispatchToProps)(Alert);

Alert.propTypes = {
  modifyAlert: PropTypes.func.isRequired,
  deleteAlert: PropTypes.func.isRequired,
  alerts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};
