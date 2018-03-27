import React, { Fragment } from 'react';
import { Breadcrumb } from 'react-breadcrumbs';
import { Route } from 'react-router-dom';

import CategoryInnerRoute from './CategoryInnerRoute';
import NavButton from './NavButton';

export const CategoryRoute = ({ path, categories }) => (
  <Route path={path} render={
    props => {
      const category = categories.find(cat => cat.name === props.match.params.categoryName);
      return <Fragment>
        <Breadcrumb data={{
          title: <NavButton title={props.match.params.categoryName} to={props.match.url} />,
          pathname: props.match.url
        }} />
        <CategoryInnerRoute {...props} categoryId={category._id} />
      </Fragment>;
    }
  } />
);

export default CategoryRoute;
