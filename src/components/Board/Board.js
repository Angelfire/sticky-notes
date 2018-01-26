import React, { Component } from 'react';
import Note from '../Note/Note';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      noteText: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  /**
   * Just a lazy ID creator
   */
  nextId() {
    this.uniqueId = this.uniqueId || 0;

    return this.uniqueId++;
  }

  /**
   * Add Note
   * @param {*} text
   */
  handleClick() {
    let notes = [
      ...this.state.notes,
      {
        id: this.nextId(),
        note: this.state.noteText
      }
    ];

    this.setState({ notes })
  }

  /**
   * Set the value of each note
   * @param {*} evt
   */
  handleChange(evt) {
    this.setState({ noteText: evt.target.value });
  }

  /**
   * Prevent submit on enter
   * @param {*} evt
   */
  submitHandler(evt) {
    evt.preventDefault();
  }

  /**
   * Render each note
   * @param {*} note
   */
  eachNote(note) {
    return (
      <Note
        key={ note.id }
        contentNote={ note.note }
      />
    );
  }

  render() {
    return (
      <div className="board">
        <form className="add-sticky" onSubmit={ this.submitHandler }>
          <input
            type="text"
            className="note_text"
            placeholder="Sticky Note text"
            onChange={ this.handleChange }
          />
          <input
            type="button"
            className="add_button"
            value="Add Sticky Note"
            onClick={ this.handleClick }
          />
        </form>
        <div className="notes">
          { this.state.notes.map(this.eachNote) }
        </div>
      </div>
    );
  }
}

export default Board;
