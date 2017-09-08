import React from 'react';
import PropTypes from 'prop-types';

import Slider from '../elements/slider';
import Units from '../../../util/units';
import BnDate from '../../../util/bn_date';
import * as RecipeUtil from '../../../util/recipe_util';
import RecipeIngredients from './recipe_ingredients';
import RecipeFermentation from './recipe_fermentation';
import RecipeMash from './recipe_mash';


// class RecipeDetailForm extends Component {

export default function RecipeDetailForm(props) {
  /*
  *  Loading Box
  */
  if (props.loading) {
    return (
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Loading</h3>
        </div>
        <div className="box-body">
          Loading...
        </div>
      </div>
    );
  }
  return (
    <div className="box">
      <div className="box-header with-border">
        <h2 className="box-title">
          {`${props.recipe.name} `}
          <small>
            {`${props.recipe.style.name} (${props.recipe.style.category_number}${props.recipe.style.style_letter},\
              ${props.recipe.style.style_guide})`}
          </small></h2>
      </div>
      <div className="box-body">
        <form >
          <div className="row" />
          <div className="row">
            <div className="form-group col-md-2 col-xs-3">
              <div className="box-pane" style={{ textAlign: 'center' }}>
                <i
                  className="fa fa-beer fa-5x"
                  style={{ color: RecipeUtil.getColorFromSRM(props.recipe.est_color) }}
                />
              </div>
            </div>
            <div className="form-group col-md-4 col-xs-4">

              <div className="box-pane">
                <dl className="dl-horizontal dl-horizontal-narrow">
                  <dt>Type</dt>
                  <dd>{props.recipe.type}</dd>
                  <dt>Batch Size</dt>
                  <dd>
                    {Number(Units.litersToGallons(props.recipe.batch_size)).toFixed(2)} Gal
                  </dd>
                  <dt>Boil Time</dt>
                  <dd>{Number(props.recipe.boil_time).toFixed(0)} min.</dd>
                  <dt>Calories</dt>
                  <dd>{Number(props.recipe.est_calories).toFixed(0)} Cal/pt. (Est.)</dd>
                  <dt>Efficiency</dt>
                  <dd>{Number(props.recipe.est_efficiency).toFixed(1)} % (Est.)</dd>
                </dl>
              </div>
            </div>
            <div className="form-group col-md-6 col-xs-4">
              <div className="box-pane">
                <dl className="dl-horizontal">
                  <dt>Brew Date</dt>
                  <dd>{BnDate.toPrettyDate(new Date(props.recipe.date))}</dd>
                  <dt>Brewer</dt>
                  <dd>{props.recipe.brewer === '' ? 'None' : props.recipe.brewer}</dd>
                  <dt>Assistant Brewer</dt>
                  <dd>{props.recipe.asst_brewer === '' ? 'None' : props.recipe.asst_brewer}</dd>
                  <dt>Taste Rating</dt>
                  <dd>{Number(props.recipe.taste_rating).toFixed(0)}</dd>

                </dl>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <div className="box-pane">
                {props.recipe.notes !== '' &&
                <p><strong>Notes: </strong> {props.recipe.notes}</p>
                }
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <div className="box-pane">
                <dl className="dl-horizontal dl-horizontal-narrow">
                  <dt><small>OG </small>{Number(props.recipe.est_og).toFixed(3)}</dt>
                  <dd>
                    <Slider
                      min="1.0000"
                      max="1.1000"
                      range_low={Number(props.recipe.style.og_min).toFixed(3)}
                      range_high={Number(props.recipe.style.og_max).toFixed(3)}
                      value_selector={Number(props.recipe.est_og).toFixed(3)}
                    />
                  </dd>
                  <dt><small>FG </small>{Number(props.recipe.est_fg).toFixed(3)}</dt>
                  <dd>
                    <Slider
                      min="1.0000"
                      max="1.1000"
                      range_low={Number(props.recipe.style.fg_min).toFixed(3)}
                      range_high={Number(props.recipe.style.fg_max).toFixed(3)}
                      value_selector={Number(props.recipe.est_fg).toFixed(3)}
                    />
                  </dd>
                  <dt><small>IBU </small>{Number(props.recipe.est_ibu).toFixed(0)}</dt>
                  <dd>
                    <Slider
                      min="1"
                      max="120"
                      range_low={Number(props.recipe.style.ibu_min).toFixed(0)}
                      range_high={Number(props.recipe.style.ibu_max).toFixed(0)}
                      value_selector={Number(props.recipe.est_ibu).toFixed(0)}
                    />
                  </dd>
                  <dt><small>ABV </small>
                    {Number(props.recipe.est_abv).toFixed(1)}<small>%</small>
                  </dt>
                  <dd>
                    <Slider
                      min="0"
                      max="12"
                      range_low={Number(props.recipe.style.abv_min).toFixed(1)}
                      range_high={Number(props.recipe.style.abv_max).toFixed(1)}
                      value_selector={Number(props.recipe.est_abv).toFixed(1)}
                    />
                  </dd>
                  <dt><small>SRM </small>{Number(props.recipe.est_color).toFixed(1)}</dt>
                  <dd>
                    <Slider
                      min="1"
                      max="120"
                      range_low={Number(props.recipe.style.color_min).toFixed(1)}
                      range_high={Number(props.recipe.style.color_max).toFixed(1)}
                      value_selector={Number(props.recipe.est_color).toFixed(1)}
                    />
                  </dd>
                  <dt><small>Carb </small>{Number(props.recipe.carbonation).toFixed(1)}</dt>
                  <dd>
                    <Slider
                      min="0"
                      max="5"
                      range_low={Number(props.recipe.style.carb_min).toFixed(1)}
                      range_high={Number(props.recipe.style.carb_max).toFixed(1)}
                      value_selector={Number(props.recipe.carbonation).toFixed(1)}
                    />
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <RecipeIngredients recipe={props.recipe} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <RecipeMash mash={props.recipe.mash_profile_usage} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <RecipeFermentation recipe={props.recipe} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

RecipeDetailForm.propTypes = {
  loading: PropTypes.bool,
  recipe: PropTypes.shape({
    name: PropTypes.string,
    est_color: PropTypes.string,
    type: PropTypes.string,
    batch_size: PropTypes.string,
    boil_time: PropTypes.string,
    est_calories: PropTypes.string,
    est_efficiency: PropTypes.string,
    date: PropTypes.string,
    brewer: PropTypes.string,
    asst_brewer: PropTypes.string,
    taste_rating: PropTypes.string,
    notes: PropTypes.string,
    est_og: PropTypes.string,
    est_fg: PropTypes.string,
    est_ibu: PropTypes.string,
    est_abv: PropTypes.string,
    carbonation: PropTypes.string,
    style: PropTypes.shape({
      name: PropTypes.string,
      category_number: PropTypes.number,
      style_letter: PropTypes.string,
      style_guide: PropTypes.string,
      og_min: PropTypes.string,
      og_max: PropTypes.string,
      fg_min: PropTypes.string,
      fg_max: PropTypes.string,
      ibu_min: PropTypes.string,
      ibu_max: PropTypes.string,
      abv_min: PropTypes.string,
      abv_max: PropTypes.string,
      color_min: PropTypes.string,
      color_max: PropTypes.string,
      carb_min: PropTypes.string,
      carb_max: PropTypes.string,
    }),
    mash_profile_usage: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
};

RecipeDetailForm.defaultProps = {
  loading: false,
  recipe: null,
};
