import React from 'react';

export default function TimelineDate(props) {

  return (
    <li className="time-label">
        <span className="bg-red">
            {props.date}
        </span>
    </li>
  )
}
