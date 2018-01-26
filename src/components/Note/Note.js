import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './Note.css';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = { showNote: false };
    this.handleClick = this.handleClick.bind(this);
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
    return (x + Math.ceil(Math.random() * (y-x))) + s;
  }

  /**
   * Show/hide front/back face
   */

  handleClick(evt) {
    this.setState({ showNote: true });
  }

  render() {
    return (
      <Draggable handle=".cursor">
        <div
            className="note"
            style={ this.style }
            onClick={ this.handleClick }
        >
          <div className="front-note">
            <div className="cursor"></div>
            <p>{ this.props.contentNote }</p>
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Note;
