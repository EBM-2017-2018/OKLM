import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  withStyles,
  Typography,
  CircularProgress
} from 'material-ui';
import DocumentItem from './DocumentItem';

import moment from 'moment';
import 'moment/locale/fr';

import { getUserDocs } from '../api';

moment.locale('fr');

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
  },
  progress: {
    display: 'block',
    margin: [[theme.spacing.unit, 'auto']]
  }
});

class MyDocs extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    files: [],
    loading: true
  }

  componentDidMount() {
    getUserDocs().then(files => this.setState({
      files,
      loading: false
    })).catch(e => console.error(e));
  }

  dispCreationTime(creationTime) {
    return 'publié le ' + moment(creationTime).format('ddd DD/MM/YYYY à HH:mm');
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="headline" className={classes.headline}>
          Mes documents
        </Typography>
        <List className={classes.list}>
          {this.state.loading && <CircularProgress className={classes.progress} />}
          {!this.state.loading && this.state.files.map(document => (
            <DocumentItem document={document} key={document._id}/>
          ))}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(MyDocs);
