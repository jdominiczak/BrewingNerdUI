import React from 'react';
import PropTypes from 'prop-types';
import Units from '../../../util/units';

function RecipeMashStep(props) {
  //  console.log(props)
  return (
    <tr>
      <td>{props.step.mash_step.mash_order}</td>
      <td>{props.step.mash_step.name}</td>
      <td>{props.step.mash_step.type}</td>
      <td>{Number(props.step.mash_step.step_time).toFixed(0)} Min.</td>
      <td>{Number(Units.celsiusToFahrenheit(props.step.mash_step.step_temp)).toFixed(1)}&deg;F</td>
      <td>{Number(props.step.mash_step.ramp_time).toFixed(0)} Min.</td>
      <td>{Number(Units.celsiusToFahrenheit(props.step.mash_step.end_temp)).toFixed(1)}&deg;F</td>
      <td>{props.step.mash_step.water_grain_ratio}qt/lb</td>
      <td>{Number(Units.litersToGallons(props.step.infuse_amount)).toFixed(2)}g</td>
    </tr>
  );
}

function RecipeSpargeStep(props) {
  //  console.log(props)
  return (
    <tr>
      <td>--</td>
      <td>Sparge</td>
      <td>--</td>
      <td>--</td>
      <td>
        {Number(Units.celsiusToFahrenheit(props.mash.mash_profile.sparge_temp)).toFixed(1)}&deg;F
      </td>
      <td>--</td>
      <td>--</td>
      <td>--</td>
      <td>{Number(Units.litersToGallons(props.mash.sparge_volume)).toFixed(2)}g</td>
    </tr>
  );
}

function renderMashStep(step) {
  return (
    <RecipeMashStep key={step.url} step={step} />);
}

export default function RecipeMash(props) {
  //  console.log(props)
  return (
    <div>
      <div className="row">
        <div className="form-group col-md-12">
          <h4><strong>Mash Profile:</strong> {props.mash.mash_profile.name}</h4>
          <p><strong>Mash pH:</strong>{props.mash.mash_profile.sparge_temp}</p>
        </div>
      </div>
      <div className="row">

        <div className="form-group col-md-12">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Step Time</th>
                <th>Step Temp</th>
                <th>Ramp Time</th>
                <th>End Temp</th>
                <th>Ratio</th>
                <th>Amount</th>
              </tr>
              {props.mash.mash_steps.forEach(step => renderMashStep(step))}
              <RecipeSpargeStep mash={props.mash} />
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

RecipeMashStep.propTypes = {
  step: PropTypes.shape({
    infuse_amount: PropTypes.string.isRequired,
    mash_step: PropTypes.shape({
      mash_order: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      step_time: PropTypes.string.isRequired,
      step_temp: PropTypes.string.isRequired,
      ramp_time: PropTypes.string.isRequired,
      end_temp: PropTypes.string.isRequired,
      water_grain_ratio: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

RecipeSpargeStep.propTypes = {
  mash: PropTypes.shape({
    sparge_volume: PropTypes.string.isRequired,
    mash_profile: PropTypes.shape({
      sparge_temp: PropTypes.string.isRequired,
    }).isRequired,

  }).isRequired,
};

RecipeMash.propTypes = {
  mash: PropTypes.shape({
    mash_profile: PropTypes.shape({
      name: PropTypes.string.isRequired,
      sparge_temp: PropTypes.string.isRequired,
    }),
    mash_steps: PropTypes.arrayOf(PropTypes.shape({
    })),
  }).isRequired,
};
