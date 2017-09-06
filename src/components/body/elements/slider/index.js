import React from 'react';

/**
*  BootStrap Style Slider
*
* Inputs : min (Minimum Range), max (max range), range_low (low Value of range or from zero),
*      range_high (high Value of range or from zero), value_selector ()
*
*
*
**/
function toPercentage(props, selector) {
  let percentage = ((selector - props.min)/(props.max-props.min)) * 100;
  return ( percentage)
}


export default function Slider(props) {
  let leftPercent = toPercentage(props, props.range_low);
  let rightPercent = toPercentage(props, props.range_high);
  let selectionPercent = toPercentage(props, props.value_selector);

  return (
    <div className="slider slider-horizontal slider-square" id="green">
      <div className="slider-track auto-cursor">
        <div className="tooltip tooltip-main bottom-none in" role="presentation" style={{left: leftPercent + "%", marginLeft: "-25px"}}>
          <div className="tooltip-inner">{props.range_low}</div>
        </div>
        <div className="tooltip tooltip-main bottom-none in" role="presentation" style={{left: rightPercent + "%", marginLeft: "-8px"}}>
          <div className="tooltip-inner">{props.range_high}</div>
        </div>
        <div className="slider-track-low" style={{left: "0px", width: leftPercent + "%"}}></div>
        <div className="slider-selection" style={{left: leftPercent + "%", width: (rightPercent - leftPercent) + "%"}}></div>
        <div className="slider-track-high" style={{left: "0px", width: (100 - rightPercent) + "%"}}></div>

        <div className="slider-handle min-slider-handle line" style={{left: selectionPercent + "%"}}></div>
      </div>
    </div>
  )
}
