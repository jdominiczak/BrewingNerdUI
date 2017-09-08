import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function NotificationItem(props) {
  let color = 'fa-color-red';
  if (props.acknowledged) {
    color = 'fa-color-grey';
  }

  return (
    <li>
      <Link to={`/alerts/${props.id}`}>
        <div className="pull-left" >
          <large><i className={`fa fa-clock-o fa-3x ${color}`} /></large>
        </div>
        <h4>
          {props.title}
          <small><i className="fa fa-clock-o" /> {props.time}</small>
        </h4>
        <p>{props.text}</p>
      </Link>
    </li>
  );
}

NotificationItem.propTypes = {
  acknowledged: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  text: PropTypes.string,
};

NotificationItem.defaultProps = {
  text: '',
};
