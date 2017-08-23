import React from 'react';

export default function TimelineItem(props) {

  return (
    <li className={props.active && "timeline-active"}>
        <i className="fa fa-envelope"></i>
        <div className="timeline-item">
            <span className="time"><i className="fa fa-clock-o"></i> {props.time}</span>
            <h3 className="timeline-header"><a href="#">{props.title}</a></h3>
            <div className="timeline-body">
                {props.description}
            </div>

            <div className="timeline-footer">
                <a className="btn btn-success btn-xs">Acknowledge Alert</a>
                <a className="btn btn-danger btn-xs pull-right">Delete Alert</a>
            </div>
        </div>

    </li>

  )
}
