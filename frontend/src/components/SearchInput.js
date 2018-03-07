import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles, Input, InputAdornment } from 'material-ui';
import { Search as SearchIcon } from 'material-ui-icons';
import queryString from 'query-string';

const styles = theme => ({
  searchUnderline: {
    '&::after': {
      background: [theme.palette.primary.contrastText, '!important']
    },
    '&::before': {
      background: [theme.palette.primary.light, '!important']
    }
  },
  searchInput: {
    color: theme.palette.primary.contrastText,
    marginRight: 5 * theme.spacing.unit,
    marginLeft: 5 * theme.spacing.unit,
    maxWidth: 400,
    flex: 1,
  }
});

const SEARCH_RESULTS_PATH = '/search';

class SearchInput extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    query: ''
  };

  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({ query: queryString.parse(location.search).query })
    });
  };

  componentWillUnmount() {
    this.unlisten();
  };

  updateSearchQuery = event => {
    const { history } = this.props;
    const queryParams = queryString.parse(history.location.search);
    const targetUrl = `${SEARCH_RESULTS_PATH}?${queryString.stringify({ ...queryParams, query: event.target.value })}`;
    if (history.location.pathname === SEARCH_RESULTS_PATH) {
      history.replace(targetUrl);
    } else {
      history.push(targetUrl);
    }
  };

  render() {
    const { classes } = this.props;

    return <Input
      id="name"
      color="inherit"
      className={classes.searchInput}
      classes={{
        underline: classes.searchUnderline
      }}
      value={this.state.query}
      placeholder="Rechercher un document..."
      onChange={this.updateSearchQuery}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon/>
        </InputAdornment>
      }
    />
  }
}

export default withStyles(styles)(withRouter(SearchInput));
