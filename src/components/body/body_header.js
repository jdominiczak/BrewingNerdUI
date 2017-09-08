import React from 'react';
import PropTypes from 'prop-types';

function renderBreadcrumbs(x) {
  return (
    <li key={`${x.name}/${x.link}`}>
      <a href={x.link}>{x.name}</a>
    </li>
  );
}

export default function BodyHeader(props) {
  return (
    <section className="content-header">
      <h1>
        {props.headerTitle}
        <small>{props.headerSmallTitle}</small>
      </h1>
      <ol className="breadcrumb">
        {props.breadcrumbs.map(x => renderBreadcrumbs(x))}
      </ol>
    </section>
  );
}

BodyHeader.propTypes = {
  headerTitle: PropTypes.string,
  headerSmallTitle: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

BodyHeader.defaultProps = {
  headerTitle: '',
  headerSmallTitle: '',
};
