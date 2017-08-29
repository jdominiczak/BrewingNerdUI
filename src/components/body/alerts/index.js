
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BodyHeader from '../body_header';
import BodyContent from '../body_content';

import { bindActionCreators } from 'redux';
import { sortArrayByProp } from '../../../util';
import BnDate from '../../../util/date'

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
    let data = { acknowledged: acknowledged }
    this.props.modifyAlert(alertURL, data);
  }


  renderTimelineObjects() {
    let output = []
    let dateString = "";
    for(const alert of sortArrayByProp("created_at",this.props.alerts)) {
      let dateTime = new Date(alert.created_at);
      let thisDateString = BnDate.toWordsDate(dateTime);
      if (dateString != thisDateString) {
        dateString = thisDateString;
        output.push(<TimelineDate key={dateString} date={dateString} />)
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
          more_link={"/alerts/" + alert.id}
          time={BnDate.toPrettyTime(dateTime)}
          icon="fa-exclamation-circle"/>
        )
    }
    return output;
  }

  render() {
    let breadcrumbs = [{"name":"Home", "link":"/"}, {"name":"Alerts", "link":"/alerts"}]
    return (
      <div>
        <BodyHeader headerTitle="Alerts" headerSmallTitle="" breadcrumbs={breadcrumbs}/>
        <BodyContent>
          <Timeline>
            {this.renderTimelineObjects()}
          </Timeline>
        </BodyContent>
      </div>
  )};

}


function mapStateToProps(state) {
  return {
    alerts: state.alerts.alerts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ modifyAlert, deleteAlert }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
