import React from 'react';

// Component
import Note from './note/Note.js';

// Styles
import Grid from 'material-ui/Grid';
import swal from 'sweetalert';
import './List.css';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      noteText: ''
    }
  }

  addToList() {
    let duplicate = false;

    // Check if user has added a note
    if (!this.state.noteText) {
      swal("Oops!", "You left the input field blank", "error");
      return;
    }

    // Check if task has already been added
    this.state.notes.map((task) => {
      if (this.state.noteText.toLowerCase() === task.task.toLowerCase()) {
        duplicate = true;
      }
    });

    if (duplicate) {
      swal("Oops", "You already added this task", "error");
      return;
    }

    // If unique input, add task
    this.setState({ notes: [...this.state.notes, {task: this.state.noteText, isComplete: false}] })
    this.setState({ noteText: '' })
  }

  deleteFromList(key) {
    console.log('click', key);
    console.log(this.state.notes);
    this.state.notes.splice(key, 1)
    this.setState({ notes:  this.state.notes });
  }

  toggleNoteStatus(key, task) {
    // Toggle status to complete or incomplete
    let updateNotes = this.state.notes.map((note) => {
      if (note.task === task) {
        note.isComplete = !note.isComplete;
      }
      return note;
    })
    this.setState({
      notes: updateNotes
    })

    // Check if all tasks are complete
    let checkTasksComplete = this.state.notes.filter(status => status.isComplete !== true)
    if (checkTasksComplete === undefined || checkTasksComplete.length === 0) {
      swal("Woo Hoo!", "You finished all of your tasks!", "success");
    }
  }

  handleKeyPress(event) {
    let duplicate = false;

    // Add new note on keypress of Enter
    if (event.key === 'Enter') {

      // Check if task has already been added
      this.state.notes.map((task) => {
        if (this.state.noteText.toLowerCase() === task.task.toLowerCase()) {
          duplicate = true;
        }
      });

      if (duplicate) {
        swal("Oops", "You already added this task", "error");
        return;
      }

      // Check is user has entered a task
      if (!this.state.noteText) {
        swal("Oops!", "You left the input field blank", "error");
        return;
      }

      // If unique input, add task
      this.setState({ notes: [...this.state.notes, {task: this.state.noteText, isComplete: false}] })
      this.setState({ noteText: '' })
    }
    return;
  }

  updateNoteText(noteText) {
    // setstate according to user input
    this.setState({ noteText: noteText.target.value })
  }

  render() {
    let notes = this.state.notes.map((val, key) => {
      return <Note
                deleteFromList={() => this.deleteFromList(key)}
                toggleNoteStatus={() => this.toggleNoteStatus(key, val.task)}
                task={val.task}
                status={val.isComplete}
                key={key}>
              </Note>
    })

    return (
      <div className="list">
        <Grid container spacing={8} justify='center'>
          {notes}
        </Grid>
        <Grid container spacing={8} justify='center'>
          <Grid item xs={11} lg={8}>
            <div className="note-input">
              <input
                placeholder="Add a task"
                type="text"
                value={this.state.noteText}
                onKeyPress={this.handleKeyPress.bind(this)}
                onChange={noteText => this.updateNoteText(noteText)}
              />
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
