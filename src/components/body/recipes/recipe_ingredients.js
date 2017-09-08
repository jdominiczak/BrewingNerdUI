import React from 'react';
import PropTypes from 'prop-types';
import Units from '../../../util/units';

function renderRow(type, item, other = null) {
  if (type === 'fermentable') {
    return (
      <tr key={item.url}>
        <td>{Units.kgToTextPoundsOz(Number(item.amount))}</td>
        <td>{Number(Number(item.amount) / other).toFixed(4) * 100 }%</td>
        <td>{item.fermentable.name}</td>
        <td>Fermentable ({item.fermentable.type})</td>
        <td>{item.add_after_boil ? 'After Boil' : 'Mash'}</td>
      </tr>
    );
  } else if (type === 'hop') {
    return (
      <tr key={item.url}>
        <td>{Units.kgToTextPoundsOz(Number(item.amount))}</td>
        <td>{Number(item.ibu_component).toFixed(2)} IBU</td>
        <td>{item.hop.name} ({Number(item.alpha).toFixed(1)}% AA)</td>
        <td>Hop ({item.form})</td>
        <td>{item.use} {item.use === 'Dry Hop' ? `${Number(item.time / 1440).toFixed(0)} days` : `${Number(item.time).toFixed(0)} min`}</td>
      </tr>
    );
  } else if (type === 'misc') {
    return (
      <tr key={item.url}>
        <td>{item.amount_is_weight ? `${Number(Units.kgToPounds(item.amount)).toFixed(2)} lb` : `${Number(item.amount).toFixed(2)} item` }</td>
        <td>--</td>
        <td>{item.misc.name}</td>
        <td>Misc ({item.misc.type})</td>
        <td>{item.use} {item.use === 'Primary' ? `${Number(item.time / 1440).toFixed(0)} days` : `${Number(item.time).toFixed(0)} min`}</td>
      </tr>
    );
  } else if (type === 'yeast') {
    return (
      <tr key={item.url}>
        <td>{item.amount_is_weight ? `${Number(Units.kgToPounds(item.amount)).toFixed(2)} lb` : `${Number(item.amount).toFixed(2)} L` }</td>
        <td>--</td>
        <td>{item.yeast.name} ({item.yeast.product_id}-{item.yeast.laboratory})</td>
        <td>Yeast ({item.yeast.type})</td>
        <td>{item.use} {item.add_to_secondary ? 'Primary Yeast' : 'Secondary Yeast'}</td>
      </tr>
    );
  }
  return null;
}

function totalFermentables(usages) {
  let weight = 0;
  // for (let usage of usages) {
  usages.forEach((usage) => {
    weight += Number(usage.amount);
  });
  return weight;
}

export default function RecipeIngredients(props) {
  const totalWeight = totalFermentables(props.recipe.fermentable_usages);

  return (
    <table className="table table-bordered">
      <tbody>
        <tr>
          <th style={{ textAlign: 'center' }}colSpan="5">Ingredients</th>
        </tr>
        <tr>
          <th>Amount</th>
          <th>%/IBU</th>
          <th>Name</th>
          <th>Type</th>
          <th>Time</th>
        </tr>
        {props.recipe.fermentable_usages.map(fermentable => renderRow('fermentable', fermentable, totalWeight))}
        {props.recipe.hop_usages.map(hop => renderRow('hop', hop))}
        {props.recipe.misc_usages.map(misc => renderRow('misc', misc))}
        {props.recipe.yeast_usages.map(yeast => renderRow('yeast', yeast))}
      </tbody>
    </table>
  );
}

RecipeIngredients.propTypes = {
  recipe: PropTypes.shape({
    fermentable_usages: PropTypes.arrayOf(PropTypes.shape({})),
    hop_usages: PropTypes.arrayOf(PropTypes.shape({})),
    misc_usages: PropTypes.arrayOf(PropTypes.shape({})),
    yeast_usages: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};
