import React, { Component } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';


export default class Header extends Component {




  render() {

    return (
      <div>
        <Navbar toggleSidebar={this.props.toggleSidebar}/>
        <Sidebar />
      </div>
    );
  }
}
