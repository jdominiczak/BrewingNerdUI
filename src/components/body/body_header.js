import React, { Component } from 'react';

export default class BodyHeader extends Component {



  // <li key={i} className="active"><a href={x.link}>{x.name}</a></li>
  render() {


    return (
      <section className="content-header">
        <h1>
          {this.props.headerTitle}
          <small>{this.props.headerSmallTitle}</small>
        </h1>
        <ol className="breadcrumb">
          {this.props.breadcrumbs.map((x, i) => (

              <li><a href={x.link}>{x.name}</a></li>

          ))}
        </ol>
      </section>
    )};
}
