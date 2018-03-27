import React from 'react';
import { Paper, withStyles } from 'material-ui';

const styles = theme => ({
  image: {
    width: '100%',
    padding: theme.spacing.unit / 2,
    paddingBottom: 0
  }
})

export const ImagePreview = ({ document, classes }) => (
  <Paper>
    <img src={document.uri} alt="preview" className={classes.image}/>
  </Paper>
);

export default withStyles(styles)(ImagePreview);
