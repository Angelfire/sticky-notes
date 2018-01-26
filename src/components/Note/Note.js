import React, { Component } from 'react';
import './Note.css';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = { showNote: false, isDragging: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
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

  handleStart() {
    this.setState({ isDragging: true });
  }

  handleStop(evt) {
    this.setState({ isDragging: false });
  }

  /**
   * Show/hide front/back face
   */

  handleClick(evt) {
    this.setState({ showNote: true });
  }

  /**
   * Close back face
   */
  handleCloseClick(evt) {
    evt.stopPropagation();

    this.setState({ showNote: false });
  }

  render() {
    const flipNote = this.state.showNote ? 'flip-note' : '';

    return (
        <div
            className={ `note ${flipNote}` }
            style={ this.style }
            onClick={ this.handleClick }
        >
            <div className="faces">
            <div className="front-note">
                <div className="cursor"></div>
                <p>{ this.props.contentNote }</p>
            </div>
            <div className="back-note">
                <span
                className="icon-close"
                onClick={ this.handleCloseClick }
                >
                X
                </span>
                <p>{ this.props.contentNote }</p>
            </div>
            </div>
        </div>
    );
  }
}

export default Note;
