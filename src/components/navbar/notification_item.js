import React, { Component } from 'react';

export default function NotificationItem(props) {

    return (
      <li>
        <a href="#">
          <div className="pull-left">
            <img src="/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
          </div>
          <h4>
            {props.title}
            <small><i className="fa fa-clock-o"></i> {props.time}</small>
          </h4>
          <p>{props.text}</p>
        </a>
      </li>
    );

}
