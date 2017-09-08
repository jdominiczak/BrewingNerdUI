import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { setSelectedRecipeByID } from '../../../actions/recipe_actions';

import BodyHeader from '../body_header';
import BodyContent from '../body_content';

import RecipeDetailForm from './recipe_detail_form';


class RecipeDetail extends Component {
  componentDidMount() {
    this.props.setSelectedRecipeByID(this.props.match.params.recipeID);
  }
  // TODO: On componentDidMount fire off the events to get the list of recipes and set a recipe
  // maybe handle what happens if it's invalid

  render() {
    const breadcrumbs = [
      { name: 'Home', link: '/' },
      { name: 'Recipes', link: '/recipes' },
      { name: 'Recipe Detail', link: '#' }];

    // Show the Error Page
    if (this.props.recipes.errorFetchingSelected) {
      return (
        <div>
          <BodyHeader headerTitle="Recipe" headerSmallTitle="" breadcrumbs={breadcrumbs} />
          <BodyContent>
            <div style={{ textAlign: 'center' }} className="row">
              <div className="col-md-12">
                <h2>404</h2>
                <h2>Recipe Not Found</h2>
              </div>
            </div>
          </BodyContent>
        </div>
      );
    } else if (this.props.recipes.isFetchingSelected ||
      this.props.recipes.selectedRecipe.name === undefined) {
    // Show the loading Page if we are fetching or we don't have a selectedRecipe set yet
      return (
        <div>
          <BodyHeader
            headerTitle="Recipe"
            headerSmallTitle="Loading..."
            breadcrumbs={breadcrumbs}
          />
          <BodyContent>
            <RecipeDetailForm loading />
          </BodyContent>
        </div>
      );
    }
    // Show the real thing now
    return (
      <div>
        <BodyHeader
          headerTitle="Recipe"
          headerSmallTitle={this.props.recipes.selectedRecipe.name === undefined ? '' : this.props.recipes.selectedRecipe.name}
          breadcrumbs={breadcrumbs}
        />
        <BodyContent>
          <RecipeDetailForm recipe={this.props.recipes.selectedRecipe} />
        </BodyContent>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    recipes: state.recipes,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setSelectedRecipeByID }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);

RecipeDetail.propTypes = {
  setSelectedRecipeByID: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  recipes: PropTypes.shape({
    errorFetchingSelected: PropTypes.bool.isRequired,
    isFetchingSelected: PropTypes.bool.isRequired,
    selectedRecipe: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};
