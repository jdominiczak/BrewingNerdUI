import React from 'react';

export default function TimelineItem(props) {

  return (
    <li className={props.active && "timeline-active"}>
        <i className={"fa " + props.icon}></i>
        <div className="timeline-item">
            <span className="time"><i className="fa fa-clock-o"></i> {props.time}</span>
            <h3 className="timeline-header"><a href="#">{props.title}</a></h3>
            <div className="timeline-body">
                {props.description}
            </div>

            <div className="timeline-footer">
              {props.active ?
                <a className="btn btn-success btn-xs" onClick={() => props.toggleAlert(props.id, true)}>Acknowledge Alert</a> :
                <a className="btn btn-warning btn-xs" onClick={() => props.toggleAlert(props.id, false)}>Reset Alert</a>
              }
                <a className="btn btn-info btn-xs btn-left-margin">More Info</a>
                <a className="btn btn-danger btn-xs pull-right" onClick={() => props.deleteAlert(props.id)}>Delete Alert</a>
            </div>
        </div>

    </li>

  )
}
