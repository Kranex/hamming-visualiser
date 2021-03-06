import React, {Component} from 'react';
import './App.css';

import gitLogo from './github.png'

import HeatMap from './components/HeatMap.js'
import StringInput from './components/StringInput.js'

import chroma from 'chroma-js';

const viridisColorscale = ['#fafa6e', '#9cdf7c', '#4abd8c', '#00968e', '#106e7c', '#2a4858'];

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
    this.state = {strings: [], hammingMatrix: [], scale: chroma.scale(viridisColorscale)};

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
      <div fluid className="container col App">
          <div className="row header">
            <h2 className="col title"> Hamming Visualiser </h2>
            <a className= "col link" href="https://github.com/kranex/hamming-Visualiser">
              <img className="gitLogo" src={gitLogo} alt="GitHub"/>
            </a>
          </div>
          <div className="row content">
            <div className="col input">
              <StringInput onVisualise={this.handleVisualise}/>
            </div>
            <div className="col visualiser">
              <HeatMap
                xLabels={this.state.strings}
                yLabels={this.state.strings}
                data={this.state.hammingMatrix}
                scale={this.state.scale}
              />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
