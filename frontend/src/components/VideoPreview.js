import React from 'react';
import { Paper, withStyles } from 'material-ui';

const styles = theme => ({
  video: {
    width: '100%',
    marginBottom:  - theme.spacing.unit / 2
  }
});

export const VideoPreview = ({ document, classes }) => (
  <Paper>
    <video controls className={classes.video}>
      <source src={document.uri}/>
      Impossible de charger cette vidéo
    </video>
  </Paper>
);

export default withStyles(styles)(VideoPreview);
