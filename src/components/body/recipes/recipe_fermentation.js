import React from 'react';

import DateLineChart from '../elements/charts/date_line_chart';
import Units from '../../../util/units';

function generateMashData(recipe) {
  //console.log(mash)
  let startDate = Date.now();
  if (recipe.date) {
    startDate = new Date(recipe.date)
  }
  let dataArray = []

  //loop through the fermentation steps
  let steps = recipe.fermentation_profile.fermentation_steps
  console.log(steps)
  for(let step of steps) {
    console.log(step)
    //start Temp
    dataArray.push({x: startDate, y:Units.celsiusToFahrenheit(step.start_temp)})
    //end temp
    //add the length to startDate
    startDate = new Date(startDate.getTime() + (step.length * 1000*60*60*24))
    dataArray.push({x: startDate, y:Units.celsiusToFahrenheit(step.end_temp)})
  }
  if (recipe.age_temp && recipe.age) {
    // Handle the Aging Process
    dataArray.push({x: startDate, y:Units.celsiusToFahrenheit(recipe.age_temp)})
    //add the length to startDate
    startDate = new Date(startDate.getTime() + (recipe.age * 1000*60*60*24))
    dataArray.push({x: startDate, y:Units.celsiusToFahrenheit(recipe.age_temp)})
  }


  console.log(dataArray)
  return dataArray
}


export default function RecipeFermentation(props) {
  //console.log(props)
  return (
    <div>
      <div className="row">
        <div className="form-group col-md-12">
          <h4><strong>Fermentation Profile:</strong> {props.recipe.fermentation_profile.name}</h4>
        </div>
      </div>
      <div className="row">
        <div className="form-group col-lg-4 col-md-12">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Start</th>
                <th>End</th>
                <th>Length</th>
              </tr>
              {props.recipe.fermentation_profile.fermentation_steps.map((step) => {
                return (
                  <tr key={step.order}>
                    <td>{step.name}</td>
                    <td>{Units.celsiusToFahrenheit(step.start_temp, 0)}</td>
                    <td>{Units.celsiusToFahrenheit(step.end_temp, 0)}</td>
                    <td>{step.length} Days</td>
                  </tr>
                )
              })}

                <tr>
                  <td>Bulk Age</td>
                  <td>{props.recipe.age_temp ? Units.celsiusToFahrenheit(props.recipe.age_temp, 0) : "-"}</td>
                  <td>{props.recipe.age_temp ? Units.celsiusToFahrenheit(props.recipe.age_temp, 0) : "-"}</td>
                  <td>{props.recipe.age ? Number(props.recipe.age).toFixed(0) : "-"} Days</td>
                </tr>

            </tbody>
          </table>
        </div>
        <div className="form-group col-md-12 col-lg-8">
          <DateLineChart data={generateMashData(props.recipe)}/>
        </div>
      </div>
    </div>
  )

}
