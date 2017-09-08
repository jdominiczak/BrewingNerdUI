import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { sortArrayByProp } from '../../../util';
import { getRecipeStatus } from '../../../util/recipe_util';
import BnDate from '../../../util/bn_date';
import { setSelectedRecipe, fetchRecipesIfNeeded } from '../../../actions/recipe_actions';

class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = { sortByProperty: 'created_at', sortByAscending: false };
    this.setSort = this.setSort.bind(this);
    this.setSelectedRecipe = this.setSelectedRecipe.bind(this);
  }

  componentDidMount() {
    this.props.fetchRecipesIfNeeded();
  }

  setSort(sortBy) {
    if (this.state.sortByProperty === sortBy) {
      // just toggle ascending
      this.setState(prevState => ({
        sortByAscending: !prevState.sortByAscending,
      }));
    } else {
      this.setState({
        sortByProperty: sortBy,
        sortByAscending: false,
      });
    }
  }

  setSelectedRecipe(url, id) {
    this.props.setSelectedRecipe(url);
    this.props.history.push(`/recipes/${id}`);
  }

  renderArrow(property) {
    if (this.state.sortByProperty === property) {
      if (this.state.sortByAscending) {
        return ' \u2191';
      }
      return ' \u2193';
    }
    return '';
  }

  renderRow(recipe) {
    return (
      <tr
        key={recipe.id}
        onClick={() => this.setSelectedRecipe(recipe.url, recipe.id)}
      >
        <td>{recipe.name}</td>
        <td>{recipe.type}</td>
        <td>{getRecipeStatus(recipe)}</td>
        <td>{BnDate.toPrettyDateTime(new Date(recipe.created_at))}</td>
        <td>{BnDate.toPrettyDateTime(new Date(recipe.modified_at))}</td>
      </tr>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="box">
            <div className="box-header">
              <h3 className="box-title">Recipe List</h3>
              <div className="box-tools">
                <ul className="pagination pagination-sm no-margin pull-right">
                  <li><a href="#">&laquo;</a></li>
                  <li><a href="#">1</a></li>
                  <li><a href="#">&raquo;</a></li>
                </ul>
              </div>
            </div>
            <div className="box-body no-padding">
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th onClick={() => this.setSort('name')}>Name{this.renderArrow('name')}</th>
                    <th onClick={() => this.setSort('type')}>Type{this.renderArrow('type')}</th>
                    <th>Status</th>
                    <th onClick={() => this.setSort('created_at')}>Created At{this.renderArrow('created_at')}</th>
                    <th onClick={() => this.setSort('modified_at')}>Last Modified{this.renderArrow('modified_at')}</th>
                  </tr>
                  {sortArrayByProp(this.state.sortByProperty,
                    this.props.recipes,
                    this.state.sortByAscending)
                    .map(recipe => this.renderRow(recipe))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setSelectedRecipe, fetchRecipesIfNeeded }, dispatch);
}

function mapStateToProps(state) {
  return {
    recipes: state.recipes.recipes,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecipeList));

RecipeList.propTypes = {
  fetchRecipesIfNeeded: PropTypes.func.isRequired,
  setSelectedRecipe: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  recipes: PropTypes.shape({}).isRequired,
};
