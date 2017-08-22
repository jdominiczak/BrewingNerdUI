import React, { Component } from 'react';

export default class NotificationItem extends Component {
  render() {
    return (
      <li>
        <a href="#">
          <div className="pull-left">
            <img src="/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
          </div>
          <h4>
            {this.props.title}
            <small><i className="fa fa-clock-o"></i> {this.props.time}</small>
          </h4>
          <p>{this.props.text}</p>
        </a>
      </li>
    )};

}
