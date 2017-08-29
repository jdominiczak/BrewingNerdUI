import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import MenuItem from './menu_item';

export default class MenuContainer extends Component {
  constructor(props) {
    super(props);
    if (props.status == "active") {
      this.state = {isMenuVisible: true}
    } else {
      this.state = {isMenuVisible: false};
    }
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState(prevState => ({
      isMenuVisible: !prevState.isMenuVisible
    }));
  }


  render() {
    if(this.props.status) {
      //var liClass = ( this.state.isMenuVisible ? "treeview menu-open " + this.props.status : "treeview " + this.props.status )
      var liClass = ( this.state.isMenuVisible ? "treeview menu-open " + this.props.status : "treeview " + this.props.status )
    } else {
      var liClass = ( this.state.isMenuVisible ? "treeview menu-open" : "treeview")
    }

    if(this.props.children.length > 0) {
      return (
          <li className={liClass} >
            <a href="#" onClick={this.toggleMenu} >
              <i className={"fa " + this.props.icon}></i> <span>{this.props.name}</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"></i>
                </span>
            </a>
            {this.state.isMenuVisible &&
              <ul className="treeview-menu">
                {this.props.children.map((child) => <MenuItem key={child.name} name={child.name} link={child.link}/>)}
              </ul>
            }
        </li>
      )
    } else {
      return (
          <li className={liClass} >
          <Link to={this.props.link || "/"}  >
            <i className={"fa " + this.props.icon}></i> <span>{this.props.name}</span>
          </Link>
        </li>
      )
    }
  }
}

MenuContainer.defaultProps = {
  children: []
}
