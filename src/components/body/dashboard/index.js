import React, { Component } from 'react';

import BodyHeader from '../body_header';
import BodyContent from '../body_content';

export default class Dashboard extends Component {



  render() {
    let breadcrumbs = [{"name":"Home", "link":"/"}]

    return (
      <div>
        <BodyHeader headerTitle="Dashboard" headerSmallTitle="Small Title" breadcrumbs={breadcrumbs}/>
        <BodyContent>
          <h1>Hello!</h1>
        </BodyContent>
      </div>
  )};

}
