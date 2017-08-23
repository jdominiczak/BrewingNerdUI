import React from 'react';
import TimelineItem from './timeline_item';
import TimelineDate from './timeline_date';

export default function Timeline(props) {

  return (
    <ul className="timeline">
      <TimelineDate date="24 Aug. 2017" />
      <TimelineItem active={true} title="Title" description="Description" time="12:12"/>
      <TimelineItem active={false} title="Title2" description="Description2" time="12:13"/>
    </ul>
  );
}
