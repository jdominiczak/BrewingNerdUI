import React from 'react';
import PropTypes from 'prop-types';

export default function TimelineDate(props) {
  return (
    <li className="time-label">
      <span className="bg-red">
        {props.date}
      </span>
    </li>
  );
}

TimelineDate.propTypes = {
  date: PropTypes.string.isRequired,
};
