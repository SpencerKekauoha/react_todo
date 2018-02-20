import React from 'react';
import Grid from 'material-ui/Grid';

function Note(props) {

  return (
    <Grid item xs={11} md={6} lg={4}>
      <div className={ (!props.status) ? 'note incomplete' : 'note complete' }>
        <span>{props.task}</span>
        <div className="check-container">
          <a
            className="check"
            onClick={ props.toggleNoteStatus }
            >
          </a>
        </div>
      </div>
    </Grid>
  )
}

export default Note;
