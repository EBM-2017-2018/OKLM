import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  withStyles,
  Typography
} from 'material-ui';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import moment from 'moment';
import 'moment/locale/fr';

import { search } from '../api';
import CategoryContent from './CategoryContent';

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
  },
  center: {
    justifyContent: 'center'
  }
});

class SearchResults extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    categories: [],
    documents: [],
    loading: true
  }

  updateSearch(location) {
    this.setState({ loading: true });
    const query = queryString.parse(location.search).query;
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
    this.timeoutID = setTimeout(() => 
      query && search(query).then(({ categories, documents }) => this.setState({
        categories,
        documents,
        loading: false
      })).catch(e => console.error(e)),
      300
    );
  }

  componentDidMount() {
    this.updateSearch(this.props.location);
    this.unlisten = this.props.history.listen(location => this.updateSearch(location));
  }

  componentWillUnmount() {
    this.unlisten();
  }

  dispCreationTime(creationTime) {
    return 'publié le ' + moment(creationTime).format('ddd DD/MM/YYYY à HH:mm');
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="headline" className={classes.headline}>
          Résultats de recherche
        </Typography>
        <List className={classes.list}>
          <CategoryContent documents={this.state.documents} categories={this.state.categories} loading={this.state.loading} hideControls={true}/>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(SearchResults));
