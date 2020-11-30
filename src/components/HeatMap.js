import React from 'react';
import './HeatMap.css';

function HeatMap(props) {
  const min = Math.min(...props.data.map(col => Math.min(...col)));
  const max = Math.max(...props.data.map(col => Math.max(...col)));

  // Create X axis labels.
  var rows = [
    <div className="row xLabels">
      <div className="col"></div>
      {props.xLabels.map( val => <label className="col xLabel">{val}</label>)}
    </div>
  ];

  for(var j = 0; j < props.yLabels.length; j++){
    // Create Y Axis label.
    var row = [<label className="row yLabel"> {props.yLabels[j]} </label>];
    
    // Fill row with data.
    row.push(props.data[j].map(val =>
      <div className="col dataCol dataRow data" style={{"backgroundColor": props.scale((val-min)/(max-min))}}>
        <label className="center">{val}</label>
      </div>
    ));
    rows.push(<div className="row">{row}</div>);
  }

  return (
    <div className="col">
      {rows}
    </div>
  );
}

export default HeatMap;
