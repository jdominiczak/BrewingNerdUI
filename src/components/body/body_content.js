import React, { Component } from 'react';

export default class BodyContent extends Component {


  render(){
    return (
      <section className="content">

        <div className="row">
          {this.props.text}
        </div>
      </section>
    )
  }
}
