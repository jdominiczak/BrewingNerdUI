import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function TimelineItem(props) {
  return (
    <li className={props.active && 'timeline-active'}>
      <i className={`fa ${props.icon}`} />
      <div className="timeline-item">
        <span className="time"><i className="fa fa-clock-o" />{props.time}</span>
        <h3 className="timeline-header"><Link to={props.more_link}>{props.title}</Link></h3>
        <div className="timeline-body">
          {props.description}
        </div>
        <div className="timeline-footer">
          {props.active ?
            <a
              className="btn btn-success btn-xs"
              tabIndex="0"
              role="button"
              onClick={() => props.toggleAlert(props.id, true)}
            >Acknowledge Alert</a> :
            <a
              className="btn btn-warning btn-xs"
              tabIndex="0"
              role="button"
              onClick={() => props.toggleAlert(props.id, false)}
            >Reset Alert</a>
          }
          <Link
            to={props.more_link}
            className="btn btn-info btn-xs btn-left-margin"
          >More Info</Link>

          <a
            className="btn btn-danger btn-xs pull-right"
            tabIndex="-1"
            role="button"
            onClick={() => props.deleteAlert(props.id)}
          >Delete Alert</a>
        </div>
      </div>
    </li>
  );
}

TimelineItem.propTypes = {
  active: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  more_link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  toggleAlert: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  deleteAlert: PropTypes.func.isRequired,
};
