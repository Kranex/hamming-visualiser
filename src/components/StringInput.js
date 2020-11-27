import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class StringInput extends Component {
  constructor(props){
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  onKeyPress(event) {
    const key = event.key;
    if(!(/[0-9]|Enter/.test(key)))
      event.preventDefault();
  }

  onPaste(event) {
    if(!(/[0-9]|\n/.test(event.target.value))) {
      event.preventDefault();
    }
  }

  onClick(event) {
    const vals = this.state.value.split("\n"); // Split the text field by lines

    var strings = new Set();
    var errors = [];                         // Init error lines.
    vals.forEach((item, index) => {
      if(item !== ""){
        if(!(/^[0-9]{5}$/.test(item))){
          errors.push(index);
        } else {
          strings.add(item);
        }
      }
    });

    if(errors.length !== 0) {
      alert("Errors on lines: " + errors);
      event.preventDefault();
    }


    this.props.onVisualise(Array.from(strings).sort((left, right) => {
      return parseInt(left) - parseInt(right)
    }));
  }

  render() {
    return (
      <Container>
        <Col>
          <Row>
              <textarea
                value={this.state.value}
                onChange={this.handleChange}
                onPaste={this.onPaste}
                onKeyPress={this.onKeyPress}
              />
          </Row>
          <Row>
              <button onClick={this.onClick}>Visualise</button>
          </Row>
        </Col>
      </Container>
    )
  }
}

export default StringInput;
