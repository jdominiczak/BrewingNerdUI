
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BodyHeader from '../body_header';
import BodyContent from '../body_content';
import Timeline from '../elements/timeline';
import { bindActionCreators } from 'redux';
import { sortArrayByProp } from '../../../util';

import { modifyAlert, deleteAlert } from '../../../actions';

import TimelineItem from '../elements/timeline_item';
import TimelineDate from '../elements/timeline_date';


class Alert extends Component {
  constructor(props) {
    super(props);
    this.toggleAlert = this.toggleAlert.bind(this);
  }

  toggleAlert(alertURL, acknowledged) {
    //console.log(alertURL, acknowledged);
    let data = { acknowledged: acknowledged }
    this.props.modifyAlert(alertURL, data);
  }


  renderTimelineObjects() {
    let output = []
    let sortedAlerts = sortArrayByProp("created_at",this.props.alerts);
    //console.log(sortedAlerts);
    let dateString = "";

    for(const alert of sortedAlerts) {

      let dateTime = new Date(alert.created_at);
      let thisDateString = (dateTime.getMonth() + 1) + "/" + dateTime.getDate() + "/" + dateTime.getFullYear()
      if (dateString != thisDateString) {
        // Put out a date object and update the dateTime
        dateString = thisDateString;
        output.push(<TimelineDate key={dateString} date={dateString} />)
      }
      let timeString = dateTime.getHours() + ":" + dateTime.getMinutes()
      output.push(<TimelineItem key={alert.id} id={alert.url} deleteAlert={this.props.deleteAlert} toggleAlert={this.toggleAlert} active={!alert.acknowledged} title={alert.title} description={alert.description} time={timeString} icon="fa-exclamation-circle"/>)
      //console.log(thisDateString)

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
