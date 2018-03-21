import React, { Component, Fragment } from 'react';
import { withStyles } from 'material-ui';
import { Route } from 'react-router-dom';

import CategoryContent from './CategoryContent';
import CategoryRoute from './CategoryRoute';

import { getCategoryContent } from '../api';

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

export class CategoryInnerRoute extends Component {
  state = {
    id: '',
    name: '',
    categories: [],
    documents: [],
    loading: true
  };

  fetchCategory = () => getCategoryContent(this.props.categoryId).then(data => {
    this.setState({
      loading: false,
      categories: data.content.categories,
      documents: data.content.documents,
      name: data.name,
      id: data._id
    });
  });

  componentDidMount() {
    this.fetchCategory();
  }

  render() {
    const { name, categories, documents, id } = this.state;
    const { match } = this.props;
    return this.state.loading ?
      <CategoryContent loading={true} /> :
      <Fragment>
        <Route path={match.path} exact render={
          () => <CategoryContent name={name} categories={categories} documents={documents} baseUrl={match.url} id={id} refresh={this.fetchCategory}/>
        } />
        <CategoryRoute path={match.url + '/:categoryName'} categories={categories} refresh={this.fetchCategory}/>
      </Fragment>
  }
}

export default withStyles(styles)(CategoryInnerRoute);
