import React from 'react';
import { ListItem, ListItemIcon, ListItemText, withStyles } from 'material-ui';
import FileIcon from 'material-ui-icons/InsertDriveFile';

import moment from 'moment';
import 'moment/locale/fr';

const styles = theme => ({
  icon: {
    marginLeft: 2 * theme.spacing.unit
  }
});

const dispCreationTime = (creationTime) => 'publié le ' + moment(creationTime).format('ddd DD/MM/YYYY à HH:mm');

export const DocumentItem = ({ document, classes }) => <ListItem button>
  <ListItemIcon className={classes.icon}>
    <FileIcon />
  </ListItemIcon>
  <ListItemText primary={document.title} secondary={dispCreationTime(document.creationTime)} />
</ListItem>;

export default withStyles(styles)(DocumentItem);
