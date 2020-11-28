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
    if(!(/[0-9\n]*/.test(event.target.value))) {
      event.preventDefault();
    }
  }

  onClick(event) {
    const vals = this.state.value.split("\n"); // Split the text field by lines

    var errors = [];                          // List of lines with errors.
    var strings = new Set();                  // We don't need duplicates so we
                                              // can use a set.

    vals.forEach((item, index) => {           // Check that every line
      if(item !== ""){                        // is either empty
        if(!(/^[0-9]{5}$/.test(item))){       // or 5 digits.
          errors.push(index);
        } else {
          strings.add(item);
        }
      }
    });

    if(errors.length !== 0) {                 // If we have any errors, notify
      alert("Errors on lines: " + errors);    // the user of them and don't
      event.preventDefault();                 // visualise the data.
    }


                                              // Sort the set as an array and
                                              // lift it up.
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
