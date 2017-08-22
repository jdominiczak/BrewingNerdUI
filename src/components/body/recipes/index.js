import React, { Component } from 'react';

import BodyHeader from '../body_header';
import BodyContent from '../body_content';

export default class Recipes extends Component {



  render() {
    let breadcrumbs = [{"name":"Home", "link":"/"},{"name":"Recipes", "link":"/recipes"}]

    return (
      <div>
        <BodyHeader headerTitle="Recipes" headerSmallTitle="Small Title" breadcrumbs={breadcrumbs}/>
        <BodyContent>
          <h1>Hello!</h1>
        </BodyContent>
      </div>
  )};

}
