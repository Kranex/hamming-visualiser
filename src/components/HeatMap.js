import React from 'react';
import './HeatMap.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function HeatMap(props) {
  /**
  var columns = [props.yLabels.map(val => // Create first column from the yLabels.
    <Row className='yLabel'>
      {val}
    </Row>
  )];


  for(var i = 0; i < props.xLabels.length; i++) {
    columns.push([                            // add the correct X label.
      <Row>
        <div className='xLabel rotate'>
          {props.xLabels[i]}
        </div>
      </Row>
    ]);

    for(var j = 0; j < props.yLabels.length; j++)
      columns[i+1].push(                      // Add all the data in the column
        <Row className='data'>
          {props.data[i][j]}
        </Row>
      );
  }
                                              // wrap all the columns in a <Col>
  var table = columns.map(column => <div className='col align-items-end'>{column}</div>);
  */
  const min = Math.min(...props.data.map(col => Math.min(...col)));
  const max = Math.max(...props.data.map(col => Math.max(...col)));

  // Create X axis labels.
  var rows = [
    <Row md={props.xLabels.length + 1} className="xLabels">
      <Col>x</Col>
      {props.xLabels.map( val => <Col>{val}</Col>)}
    </Row>
  ];

  for(var j = 0; j < props.yLabels.length; j++){
    // Create Y Axis label.
    var row = [<Col className="yLabels"> {props.yLabels[j]} </Col>];
    
    // Fill row with data.
    row.push(props.data[j].map(val =>
      <Col className="data" style={{"background-color": props.scale((val-min)/(max-min))}}>
        {val}
      </Col>
    ));
    rows.push(<Row>{row}</Row>);
  }

  return (
    <Container>
      {rows}
    </Container>
  );
}

export default HeatMap;
