import React from 'react';
import PropTypes from 'prop-types';

/*
*  BootStrap Style Slider
*
* Inputs : min (Minimum Range), max (max range), range_low (low Value of range or from zero),
*      range_high (high Value of range or from zero), value_selector ()
*
*
*
*/
function toPercentage(props, selector) {
  const percentage = ((selector - props.min) / (props.max - props.min)) * 100;
  return percentage;
}


export default function Slider(props) {
  const leftPercent = toPercentage(props, props.range_low);
  const rightPercent = toPercentage(props, props.range_high);
  const selectionPercent = toPercentage(props, props.value_selector);

  return (
    <div className="slider slider-horizontal slider-square" id="green">
      <div className="slider-track auto-cursor">
        <div className="tooltip tooltip-main bottom-none in" role="presentation" style={{ left: `${leftPercent}%`, marginLeft: '-25px' }}>
          <div className="tooltip-inner">{props.range_low}</div>
        </div>
        <div className="tooltip tooltip-main bottom-none in" role="presentation" style={{ left: `${rightPercent}%`, marginLeft: '-8px' }}>
          <div className="tooltip-inner">{props.range_high}</div>
        </div>
        <div className="slider-track-low" style={{ left: '0px', width: `${leftPercent}%` }} />
        <div className="slider-selection" style={{ left: `${leftPercent}%`, width: `${(rightPercent - leftPercent)}%` }} />
        <div className="slider-track-high" style={{ left: '0px', width: `${(100 - rightPercent)}%` }} />

        <div className="slider-handle min-slider-handle line" style={{ left: `${selectionPercent}%` }} />
      </div>
    </div>
  );
}

Slider.propTypes = {
  range_low: PropTypes.string.isRequired,
  range_high: PropTypes.string.isRequired,
  value_selector: PropTypes.string.isRequired,
};
