import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from '../elements/slider'
import Units from '../../../util/units'
import BnDate from '../../../util/date'
import * as RecipeUtil from '../../../util/recipe_util';
import RecipeIngredients from './recipe_ingredients';
import RecipeFermentation from './recipe_fermentation';
import RecipeMash from './recipe_mash';


class RecipeDetailForm extends Component {

  render() {

    /**
    *  Loading Box
    **/
    if(this.props.loading){
      return (
        <div className="box">
          <div className="box-header">
                <h3 className="box-title">Loading</h3>
          </div>
          <div className="box-body">
            Loading...
          </div>
        </div>
      )
    }
    /**
    *  Regular Box
    **/
    else {
      return (
        <div className="box">
          <div className="box-header with-border">
                <h2 className="box-title">{this.props.recipe.name} <small>{this.props.recipe.style.name} ({this.props.recipe.style.category_number}{this.props.recipe.style.style_letter}, {this.props.recipe.style.style_guide})</small></h2>

          </div>
          <div className="box-body">
            <form role="form">
              <div className="row">

              </div>
              <div className="row">
                <div className="form-group col-md-2 col-xs-3">
                  <div className="box-pane" style={{textAlign: "center"}}>
                    <i className="fa fa-beer fa-5x" style={{color: RecipeUtil.getColorFromSRM(this.props.recipe.est_color)}}></i>
                  </div>
                </div>
                <div className="form-group col-md-4 col-xs-4">

                  <div className="box-pane">
                    <dl className="dl-horizontal dl-horizontal-narrow">
                      <dt>Type</dt>
                      <dd>{this.props.recipe.type}</dd>
                      <dt>Batch Size</dt>
                      <dd>{Number(Units.litersToGallons(this.props.recipe.batch_size)).toFixed(2)} Gal</dd>
                      <dt>Boil Time</dt>
                      <dd>{Number(this.props.recipe.boil_time).toFixed(0)} min.</dd>
                      <dt>Calories</dt>
                      <dd>{Number(this.props.recipe.est_calories).toFixed(0)} Cal/pt. (Est.)</dd>
                      <dt>Efficiency</dt>
                      <dd>{Number(this.props.recipe.est_efficiency).toFixed(1)} % (Est.)</dd>
                    </dl>
                  </div>
                </div>
                <div className="form-group col-md-6 col-xs-4">
                  <div className="box-pane">
                    <dl className="dl-horizontal">
                      <dt>Brew Date</dt>
                      <dd>{BnDate.toPrettyDate(new Date(this.props.recipe.date))}</dd>
                      <dt>Brewer</dt>
                      <dd>{this.props.recipe.brewer=="" ? "None" : this.props.recipe.brewer}</dd>
                      <dt>Assistant Brewer</dt>
                      <dd>{this.props.recipe.asst_brewer=="" ? "None" : this.props.recipe.asst_brewer}</dd>
                      <dt>Taste Rating</dt>
                      <dd>{Number(this.props.recipe.taste_rating).toFixed(0)}</dd>

                    </dl>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-12">
                  <div className="box-pane">
                    {this.props.recipe.notes!="" &&
                    <p><strong>Notes: </strong> {this.props.recipe.notes}</p>
                    }
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-12">
                  <div className="box-pane">
                    <dl className="dl-horizontal dl-horizontal-narrow">
                      <dt><small>OG </small>{Number(this.props.recipe.est_og).toFixed(3)}</dt>
                      <dd>
                        <Slider min="1.0000" max="1.1000" range_low={Number(this.props.recipe.style.og_min).toFixed(3)} range_high={Number(this.props.recipe.style.og_max).toFixed(3)} value_selector={Number(this.props.recipe.est_og).toFixed(3)} />
                      </dd>
                      <dt><small>FG </small>{Number(this.props.recipe.est_fg).toFixed(3)}</dt>
                      <dd>
                        <Slider min="1.0000" max="1.1000" range_low={Number(this.props.recipe.style.fg_min).toFixed(3)} range_high={Number(this.props.recipe.style.fg_max).toFixed(3)} value_selector={Number(this.props.recipe.est_fg).toFixed(3)} />
                      </dd>
                      <dt><small>IBU </small>{Number(this.props.recipe.est_ibu).toFixed(0)}</dt>
                      <dd>
                        <Slider min="1" max="120" range_low={Number(this.props.recipe.style.ibu_min).toFixed(0)} range_high={Number(this.props.recipe.style.ibu_max).toFixed(0)} value_selector={Number(this.props.recipe.est_ibu).toFixed(0)} />
                      </dd>
                      <dt><small>ABV </small>{Number(this.props.recipe.est_abv).toFixed(1)}<small>%</small></dt>
                      <dd>
                        <Slider min="0" max="12" range_low={Number(this.props.recipe.style.abv_min).toFixed(1)} range_high={Number(this.props.recipe.style.abv_max).toFixed(1)} value_selector={Number(this.props.recipe.est_abv).toFixed(1)} />
                      </dd>
                      <dt><small>SRM </small>{Number(this.props.recipe.est_color).toFixed(1)}</dt>
                      <dd>
                        <Slider min="1" max="120" range_low={Number(this.props.recipe.style.color_min).toFixed(1)} range_high={Number(this.props.recipe.style.color_max).toFixed(1)} value_selector={Number(this.props.recipe.est_color).toFixed(1)} />
                      </dd>
                      <dt><small>Carb </small>{Number(this.props.recipe.carbonation).toFixed(1)}</dt>
                      <dd>
                        <Slider min="0" max="5" range_low={Number(this.props.recipe.style.carb_min).toFixed(1)} range_high={Number(this.props.recipe.style.carb_max).toFixed(1)} value_selector={Number(this.props.recipe.carbonation).toFixed(1)} />
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <RecipeIngredients recipe={this.props.recipe}/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <RecipeMash mash={this.props.recipe.mash_profile_usage}/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <RecipeFermentation recipe={this.props.recipe}/>
                </div>
              </div>
            </form>
          </div>
        </div>
      )
    }

  }


}

function mapStateToProps(state) {
  return {
    recipe: state.recipes.selectedRecipe
  };
}

export default connect(mapStateToProps)(RecipeDetailForm);
