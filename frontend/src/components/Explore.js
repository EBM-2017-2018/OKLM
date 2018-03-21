import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { List, withStyles } from 'material-ui';
import { Breadcrumbs, Breadcrumb } from 'react-breadcrumbs';

import CategoryContent from './CategoryContent';
import CategoryRoute from './CategoryRoute';
import NavButton from './NavButton';
import { getTopLevelCategories } from '../api';

const styles = theme => ({
  root: {},
  list: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing.unit * 2
  },
  headline: {
    marginBottom: theme.spacing.unit * 2
  },
  progress: {
    display: 'block',
    margin: [[theme.spacing.unit, 'auto']]
  }
});

export class Explore extends Component {
  state = {
    categories: [],
    loading: true
  };

  componentDidMount() {
    getTopLevelCategories().then(data => {
      this.setState({
        isRoot: true,
        loading: false,
        categories: data
      });
    });
  }

  render() {
    const { classes, match } = this.props;

    return <div className={classes.root}>
      <Breadcrumbs/>
      <Breadcrumb data={{
        title: <NavButton to="/explore" title="Explorer" />,
        pathname: '/explore'
      }} />
      <List className={classes.list}>
        {!this.state.loading && <Route path={match.url} exact render={
          () => <CategoryContent categories={this.state.categories} documents={[]} baseUrl={match.url}/>
        } />}
        {!this.state.loading && <CategoryRoute path={match.url + '/:categoryName'} categories={this.state.categories} />}
      </List>
    </div>
  }
}

const ExploreWrapper = withStyles(styles)(withRouter(Explore));

export default ExploreWrapper;
