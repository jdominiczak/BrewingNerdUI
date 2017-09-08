import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MenuItem from './menu_item';

export default class MenuContainer extends Component {
  static renderMenuItem(child) {
    return <MenuItem key={child.name} name={child.name} link={child.link} />;
  }

  constructor(props) {
    super(props);
    if (props.status === 'active') {
      this.state = { isMenuVisible: true };
    } else {
      this.state = { isMenuVisible: false };
    }
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState(prevState => ({
      isMenuVisible: !prevState.isMenuVisible,
    }));
  }

  render() {
    let liClass = '';
    if (this.props.status) {
      liClass = (this.state.isMenuVisible ? `treeview menu-open ${this.props.status}` : `treeview ${this.props.status}`);
    } else {
      liClass = (this.state.isMenuVisible ? 'treeview menu-open' : 'treeview');
    }

    if (this.props.childItem.length > 0) {
      return (
        <li className={liClass} >
          <a role="button" tabIndex="-1" onClick={this.toggleMenu} >
            <i className={`fa ${this.props.icon}`} /> <span>{this.props.name}</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right" />
            </span>
          </a>
          {this.state.isMenuVisible &&
            <ul className="treeview-menu">
              {this.props.childItem.map(child => MenuContainer.renderMenuItem(child))}
            </ul>
          }
        </li>
      );
    }
    return (
      <li className={liClass} >
        <Link to={this.props.link || '/'}>
          <i className={`fa ${this.props.icon}`} /> <span>{this.props.name}</span>
        </Link>
      </li>
    );
  }
}

MenuContainer.propTypes = {
  icon: PropTypes.string,
  childItem: PropTypes.arrayOf(PropTypes.shape({})),
  link: PropTypes.string,
  status: PropTypes.string,
  name: PropTypes.string.isRequired,
};

MenuContainer.defaultProps = {
  icon: '',
  link: '#',
  childItem: [],
  status: '',
};
