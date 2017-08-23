
import React, { Component } from 'react';

import BodyHeader from '../body_header';
import BodyContent from '../body_content';
import Timeline from '../elements/timeline';

export default class Alert extends Component {

  render() {
    let breadcrumbs = [{"name":"Home", "link":"/"}]

    return (
      <div>
        <BodyHeader headerTitle="Alerts" headerSmallTitle="Small Title" breadcrumbs={breadcrumbs}/>
        <BodyContent>
          <Timeline/>
        </BodyContent>
      </div>
  )};

}
