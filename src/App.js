import React, {Component} from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import StringInput from './components/StringInput.js'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {strings: []};

    this.handleVisualise = this.handleVisualise.bind(this);
  }

  handleVisualise(strings) {
    this.setState({
      strings: strings
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
              {items}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
