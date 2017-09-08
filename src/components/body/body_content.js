import React from 'react';
import PropTypes from 'prop-types';

export default function BodyContent(props) {
  return (
    <section className="content">
      {props.children}
    </section>
  );
}

BodyContent.propTypes = {
  children: PropTypes.element,
};

BodyContent.defaultProps = {
  children: null,
};
