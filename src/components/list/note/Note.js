import React from 'react';
import Grid from 'material-ui/Grid';

function Note(props) {

  return (
    <Grid item xs={11} lg={8}>
      <div className={ (!props.status) ? 'note incomplete' : 'note complete' }>
        <div className="check-container">
          <a
            className="check"
            onClick={ props.toggleNoteStatus }
            >
          </a>
          <span>{props.task}</span>
        </div>
        <a className="delete" onClick={props.deleteFromList}>
          <div className="criss"></div>
          <div className="cross"></div>
        </a>
      </div>
    </Grid>
  )
}

export default Note;
