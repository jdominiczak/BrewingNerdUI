import React from 'react';

import BodyHeader from '../body_header';
import BodyContent from '../body_content';

import RecipeList from './recipe_list';

export default function Recipes() {
  const breadcrumbs = [{ name: 'Home', link: '/' }, { name: 'Recipes', link: '/recipes' }];

  return (
    <div>
      <BodyHeader headerTitle="Recipes" breadcrumbs={breadcrumbs} />
      <BodyContent>
        <RecipeList />
      </BodyContent>
    </div>
  );
}
