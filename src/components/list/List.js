import React from 'react';
import Note from './note/Note.js';
import Grid from 'material-ui/Grid';
import swal from 'sweetalert';
import './List.css';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [
        {
          task: 'water the plants',
          isComplete: false,
        },
        {
          task: 'go to the gym',
          isComplete: false,
        },
        {
          task: 'cook dinner',
          isComplete: true,
        }
      ],
      noteText: 'test',
    }
  }

  addToList() {
    if (!this.state.noteText) {
      swal("Oops!", "You left the input field blank", "error");
      return;
    }
    this.setState({ notes: [...this.state.notes, {task: this.state.noteText, isComplete: false}] })
    this.setState({ noteText: '' })
  }

  toggleNoteStatus(key, task) {
    let updateNotes = this.state.notes.map((note) => {
      if (note.task === task) {
        note.isComplete = !note.isComplete;
      }
      return note;
    })
    this.setState({
      notes: updateNotes
    })
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.setState({ notes: [...this.state.notes, {task: this.state.noteText, isComplete: false}] })
    }
    return;
  }

  updateNoteText(noteText) {
    this.setState({ noteText: noteText.target.value })
  }

  render() {
    let notes = this.state.notes.map((val, key) => {
      return <Note toggleNoteStatus={() => this.toggleNoteStatus(key, val.task)} task={val.task} status={val.isComplete} key={key}></Note>
    })

    return (
      <div className="list">
        <Grid container spacing={8} justify='center'>
          {notes}
        </Grid>
        <Grid container spacing={8} justify='center'>
          <Grid item xs={11} md={6}>
            <div className="note-input">
              <input
                placeholder="Add a task"
                type="text"
                value={this.state.noteText}
                onKeyPress={this.handleKeyPress.bind(this)}
                onChange={noteText => this.updateNoteText(noteText)}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={8} justify='center'>
          <Grid item xs={12} md={6}>
            <div className="btn-container">
              <a className="btn" onClick={this.addToList.bind(this)}>
                <div className="plus">
                  <div className="vertical"></div>
                  <div className="horizontal"></div>
                </div>
              </a>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default List;
