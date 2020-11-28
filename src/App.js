import React, {Component} from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import HeatMap from 'react-heatmap-grid'

import StringInput from './components/StringInput.js'

function hammingDistance(stringA, stringB) {
  var length = Math.min(stringA.length, stringB.length);
  var dist = Math.abs(stringA.length - stringB.length);
  for (var i = 0; i < length; i++)
    if (stringA.charAt(i) !== stringB.charAt(i))
      dist++;

  return dist;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {strings: [''], hammingMatrix: [[0]]};

    this.handleVisualise = this.handleVisualise.bind(this);
  }


  handleVisualise(strings) {
    const size = strings.length;

    var matrix = [];

    for (var i = 0; i < size; i++)
      matrix.push(Array(size).fill(0));

    for (i = 0; i < size; i++)
      for (var j = i+1; j < size; j++)
        matrix[i][j] = matrix[j][i] = hammingDistance(strings[i], strings[j]);

    console.log(matrix);
    this.setState({
      strings: strings,
      hammingMatrix: matrix
    });
  }

  render() {
    var items = this.state.strings.map(value =>
      <li key={value}>
        {value}
      </li>
    );

    return (
      <div className="App">
        <Container fluid>
          <Row>
            <Col>
              <StringInput onVisualise={this.handleVisualise}/>
            </Col>
            <Col>
              <HeatMap
                squares
                xLabels={this.state.strings}
                yLabels={this.state.strings}
                data={this.state.hammingMatrix}
                cellStyle={(background, value, min, max, data, x, y) => ({
                  background: `rgba(66, 86, 244, ${1 - (max - value) / (max - min)})`,
                  fontSize: "11px",
                })}
                cellRender={value => value && `${value}`}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
