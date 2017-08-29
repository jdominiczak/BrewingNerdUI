import React, { Component } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';


export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarCollapsed: false,
      windowHeight: 0
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.updateWindowHeight = this.updateWindowHeight.bind(this);

  }

  updateWindowHeight() {
    this.setState( { windowHeight: window.innerHeight });
    console.log("Updating Height");
  }

  componentDidMount() {
    this.updateWindowHeight();
    window.addEventListener('resize', this.updateWindowHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowHeight);
  }

  toggleSidebar() {
    this.setState(prevState => ({
      sidebarCollapsed: !prevState.sidebarCollapsed
    }));
  }

  render() {
    let sidebarClass = "sidebar-mini"
    if (this.state.sidebarCollapsed) {
      sidebarClass += " sidebar-collapse";
    }

    //console.log(window.innerHeight);
    return (
      <div className={sidebarClass}>
        <Navbar toggleSidebar={this.toggleSidebar}/>
        <Sidebar />
        <div className="content-wrapper" style={{minHeight: this.state.windowHeight - 100}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
