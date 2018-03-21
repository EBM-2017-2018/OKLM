import React, { Fragment } from 'react';
import { CircularProgress, ListSubheader, withStyles } from 'material-ui';
import { Link } from 'react-router-dom';

import { AddCategoryButton, AddDocumentButton } from './AddButtons';
import CategoryItem from './CategoryItem';
import DocumentItem from './DocumentItem';

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

export const CategoryContent = ({ id, name, categories, documents, baseUrl, classes, loading }) => (
  <Fragment>
    <AddCategoryButton parentId={id} disabled={loading} />
    <AddDocumentButton parentId={id} disabled={loading} />

    {loading ?
      <CircularProgress className={classes.progress} /> :
      <Fragment>
        <ListSubheader>Catégories ({categories.length})</ListSubheader>
        {categories.map(category => (
          <CategoryItem category={category} key={category._id} component={Link} to={baseUrl + '/' + category.name} />
        ))}

        <ListSubheader>Documents ({documents.length})</ListSubheader>
        {documents.map(document => <DocumentItem document={document} key={document._id} />)}
      </Fragment>
    }
  </Fragment>
);

export default withStyles(styles)(CategoryContent);
