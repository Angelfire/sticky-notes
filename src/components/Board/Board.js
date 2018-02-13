import React, { Component } from 'react';
import { loadState, saveState } from '../../utils/helpers';
import { s4 } from '../../utils/helpers';
import Note from '../Note/Note';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      noteText: '',
      checked: false
    };
  }

  /**
   * Just a lazy ID creator
   */
  getUniqueIdentifier = () => {
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  }

  /**
   * 
   */
  handleCheck = () => {
     this.setState({ checked: !this.state.checked });
  }

  /**
   * Add Note and save it to localstorage
   * @param {*} text
   */
  handleClick = () => {
    const { noteText, checked } = this.state;

    let notes = [
      ...this.state.notes,
      {
        id: this.getUniqueIdentifier(),
        note: noteText,
        checked: checked
      }
    ];

    this.setState({ notes, noteText: '', checked: false });
    saveState(notes);
    this.textInput.value = '';
  }

  /**
   * Set the value of each note
   * @param {*} evt
   */
  handleChange = evt => {
    this.setState({ noteText: evt.target.value });
  }

  /**
   * Prevent submit on enter
   * @param {*} evt
   */
  submitHandler = evt => {
    evt.preventDefault();
    this.handleClick();
  }

  /**
   * Remove note and remove it from localStorage
   * @param {number} index
   */
  removeNote = i => {
    const arr = this.state.notes;
    const ele = arr[i];
    arr.splice(i, 1);
    this.setState({ notes: arr });
    saveState(arr);

    return ele;
  }

  /**
   * Render each note
   * @param {object} note
   * @param {number} index
   */
  eachNote = (note, i) => {
    return (
      <Note
        key={ note.id }
        contentNote={ note.note }
        index={ i }
        onRemove={ this.removeNote }
        checked={ note.checked }
      />
    );
  }

  componentDidMount () {
    this.textInput.focus();
  }

  componentWillMount() {
    loadState() && this.setState({
      notes: loadState()
    });
  }

  render() {
    return (
      <div className="board">
        <form className="add-sticky" onSubmit={ this.submitHandler }>
          <input
            type="text"
            ref={input => { this.textInput = input }}
            className="note_text"
            placeholder="Sticky Note text"
            onChange={ this.handleChange }
            maxLength="115"
          />
          <input
            type="button"
            className="add_button"
            value="Add Sticky Note"
            onClick={ this.handleClick }
          />
          <div className="hp-note">
            <input
              type="checkbox"
              checked = {this.state.checked}
              name="e-note"
              value="e-note"
              onChange={this.handleCheck}
            />
            <label htmlFor="e-note">Important note</label>
          </div>
        </form>
        <div className="notes">
          { this.state.notes.map(this.eachNote) }
        </div>
      </div>
    );
  }
}

export default Board;
