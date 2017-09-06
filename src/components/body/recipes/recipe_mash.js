import React from 'react';
import Units from '../../../util/units';



function RecipeMashStep(props) {
  //console.log(props)
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
  )
}

function RecipeSpargeStep(props) {
  //console.log(props)
  return (
    <tr>
      <td>--</td>
      <td>Sparge</td>
      <td>--</td>
      <td>--</td>
      <td>{Number(Units.celsiusToFahrenheit(props.mash.mash_profile.sparge_temp)).toFixed(1)}&deg;F</td>
      <td>--</td>
      <td>--</td>
      <td>--</td>
      <td>{Number(Units.litersToGallons(props.mash.sparge_volume)).toFixed(2)}g</td>
    </tr>
  )
}




export default function RecipeMash(props) {
  //console.log(props)
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
              {props.mash.mash_steps.map(step => { return( <RecipeMashStep key={step.url} step={step} />) } )}
              <RecipeSpargeStep mash={props.mash} />
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )

}
