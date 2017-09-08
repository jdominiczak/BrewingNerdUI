import React from 'react';
import PropTypes from 'prop-types';

export default function Timeline(props) {
  return (
    <ul className="timeline">
      {props.children}
    </ul>
  );
}


/*
<TimelineDate date="24 Aug. 2017" />
<TimelineItem active={true} title="Title" description="Description" time="12:12"/>
<TimelineItem active={false} title="Title2" description="Description2" time="12:13"/>
*/
Timeline.propTypes = {
  children: PropTypes.element,
};

Timeline.defaultProps = {
  children: null,
};
