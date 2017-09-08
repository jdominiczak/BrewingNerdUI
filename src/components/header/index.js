import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from './navbar';
import Sidebar from './sidebar';


export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarCollapsed: false,
      windowHeight: 0,
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.updateWindowHeight = this.updateWindowHeight.bind(this);
  }

  componentDidMount() {
    this.updateWindowHeight();
    window.addEventListener('resize', this.updateWindowHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowHeight);
  }

  updateWindowHeight() {
    this.setState({ windowHeight: window.innerHeight });
  }

  toggleSidebar() {
    this.setState(prevState => ({
      sidebarCollapsed: !prevState.sidebarCollapsed,
    }));
  }

  render() {
    let sidebarClass = 'sidebar-mini';
    if (this.state.sidebarCollapsed) {
      sidebarClass += ' sidebar-collapse';
    }
    return (
      <div className={sidebarClass}>
        <Navbar toggleSidebar={this.toggleSidebar} />
        <Sidebar />
        <div className="content-wrapper" style={{ minHeight: this.state.windowHeight - 100 }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  children: PropTypes.shape({}),
};

Header.defaultProps = {
  children: {},
};
