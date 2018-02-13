import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './Note.css';

class Note extends Component {
  componentWillMount() {
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 200, 'px'),
      top: this.randomBetween(0, window.innerHeight - 450, 'px')
    };
  }

  /**
   * 
   */
  handleClose = () => {
    const { onRemove, index } = this.props;
    onRemove(index);
  }

  /**
   *
   * @param {*} x
   * @param {*} y
   * @param {*} s
   */
  randomBetween = (x, y, s) => {
    return (x + Math.ceil(Math.random() * (y - x))) + s;
  }

  render() {
    const { checked } = this.props;
    const colorClass = checked ? 'e-note' : 'n-note';

    return (
      <Draggable bounds=".board">
        <div
            className="note"
            style={ this.style }
        >
          <div className={`front-note ${colorClass}`}>
            <span className="delete-sticky" onClick={ this.handleClose }>X</span>
            <p>{ this.props.contentNote }</p>
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Note;
