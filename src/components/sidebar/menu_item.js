import React, { Component } from 'react';

export default class MenuItem extends Component {
  render() {
    return (
      <li><a href={this.props.link}><i className="fa fa-circle-o"></i> {this.props.name}</a></li>
    )};
}
