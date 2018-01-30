import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './Note.css';

class Note extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 200, 'px'),
      top: this.randomBetween(0, window.innerHeight - 200, 'px')
    };
  }

  /**
   *
   * @param {*} x
   * @param {*} y
   * @param {*} s
   */
  randomBetween(x, y, s) {
    return (x + Math.ceil(Math.random() * (y - x))) + s;
  }


  render() {
    return (
      <Draggable>
        <div
            className="note"
            style={ this.style }
        >
          <div className="front-note">
            <p>{ this.props.contentNote }</p>
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Note;
