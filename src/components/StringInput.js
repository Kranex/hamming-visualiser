import React, { Component } from 'react';
import './StringInput.css'

class StringInput extends Component {
  constructor(props){
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleChange(event) {
    // keypress handles input checking so just set the internal state here.
    this.setState({value: event.target.value});
  }

  onKeyPress(event) {
    // Check that the key is 0-9 or enter, if it isn't cancel it.
    if(!(/[0-9]|Enter/.test(event.key)))
      event.preventDefault();
  }

  onPaste(event) {
    // Check that the pasted content only contains 0-9 or '\n'.
    if(!(/[0-9\n]*/.test(event.target.value))) {
      event.preventDefault();
    }
  }

  onClick(event) {
    // check the input and lift the state up.

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
      return;                                 // visualise the data.
    }


                                              // Sort the set as an array and
                                              // lift it up.
    this.props.onVisualise(Array.from(strings).sort((left, right) => {
      return parseInt(left) - parseInt(right)
    }));
  }

  render() {
    return (
        <div className='col'>
          <textarea className='row textarea'
              value={this.state.value}
              onChange={this.handleChange}
              onPaste={this.onPaste}
              onKeyPress={this.onKeyPress}
            />
          <div className="row visualise">
            <button onClick={this.onClick}>Visualise</button>
          </div>
        </div>
    )
  }
}

export default StringInput;
