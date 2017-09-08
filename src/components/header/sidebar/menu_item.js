import React from 'react';
import PropTypes from 'prop-types';

export default function MenuItem(props) {
  return (
    <li><a href={props.link}><i className="fa fa-circle-o" /> {props.name}</a></li>
  );
}

MenuItem.propTypes = {
  link: PropTypes.string,
  name: PropTypes.string.isRequired,
};

MenuItem.defaultProps = {
  link: '',
};
