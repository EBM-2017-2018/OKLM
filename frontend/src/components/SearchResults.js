import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  withStyles,
  Typography,
  CircularProgress
} from 'material-ui';
import { withRouter } from 'react-router';
import queryString from 'query-string';

import moment from 'moment';
import 'moment/locale/fr';

import { search } from '../api';
import CategoryItem from './CategoryItem';
import DocumentItem from './DocumentItem';

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
        {this.state.loading && <List className={classes.list}>
          <CircularProgress className={classes.progress} />
        </List>}
        {!this.state.loading && this.state.categories.length > 0 && <List className={classes.list}>
          {this.state.categories.map(category => (
            <CategoryItem category={category} key={category._id} />
          ))}
        </List>}
        {!this.state.loading && this.state.documents.length > 0 && <List>
          {this.state.documents.map(document => <DocumentItem document={document} key={document._id}/>)}
        </List>}
        {!this.state.loading && this.state.documents.length === 0 && this.state.categories.length === 0 && <List className={classes.list}>
          <ListItem className={classes.center}><em>Aucun résultat ne correspond à votre recherche</em></ListItem>
        </List>}
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(SearchResults));
