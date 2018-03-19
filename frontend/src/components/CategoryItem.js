import React from 'react';
import { ListItem, ListItemIcon, ListItemText, withStyles } from 'material-ui';
import Folder from 'material-ui-icons/Folder';

import moment from 'moment';
import 'moment/locale/fr';

const styles = theme => ({
  icon: {
    marginLeft: 2 * theme.spacing.unit
  }
});

const dispCreationTime = (creationTime) => 'publié le ' + moment(creationTime).format('ddd DD/MM/YYYY à HH:mm');

export const CategoryItem = ({ category, classes }) => <ListItem button>
  <ListItemIcon className={classes.icon}>
    <Folder />
  </ListItemIcon>
  <ListItemText primary={category.name} secondary={dispCreationTime(category.creationTime)} />
</ListItem>

export default withStyles(styles)(CategoryItem);
