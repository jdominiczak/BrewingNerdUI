import React, { Component } from 'react';

import BodyHeader from '../body_header';
import BodyContent from '../body_content';

import RecipeList from './recipe_list';

export default class Recipes extends Component {

  render() {
    let breadcrumbs = [{"name":"Home", "link":"/"},{"name":"Recipes", "link":"/recipes"}]

    return (
      <div>
        <BodyHeader headerTitle="Recipes" breadcrumbs={breadcrumbs}/>
        <BodyContent>
          <RecipeList/>
        </BodyContent>
      </div>
  )};

}
