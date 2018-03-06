import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
  Typography
} from 'material-ui';
import FileIcon from 'material-ui-icons/InsertDriveFile';

import { getUserDocs } from '../api';

const styles = theme => ({
  root: {},
  headline: {
    marginBottom: theme.spacing.unit * 2
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing.unit * 2
  },
  icon: {
    marginLeft: 2 * theme.spacing.unit
  }
});

class MyDocs extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    files: [{ name: 'Bienvenue en EBM.pdf', date: '03/05/2017' }]
  }

  componentDidMount() {
    getUserDocs().then(files => this.setState({
      files
    }));
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="headline" className={classes.headline}>
          Mes documents
        </Typography>
        <List className={classes.list}>
          {this.state.files.map(file => (
            <ListItem button>
              <ListItemIcon className={classes.icon}>
                <FileIcon />
              </ListItemIcon>
              <ListItemText primary={file.name} secondary={file.date} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(MyDocs);
