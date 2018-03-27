import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, withRouter } from 'react-router-dom';

import MyDocs from './MyDocs';
import UploadForm from './UploadForm';
import SearchResults from './SearchResults';
import Explore from './Explore';
import { setToken } from 'ebm-auth/dist/browser';

class Content extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  render() {
    return (
      <div className={this.props.className}>
        <Route exact path="/" render={() => <Redirect to="/explore" />}/>
        <Route path="/mydocs" component={MyDocs}/>
        <Route path="/upload" component={UploadForm} />
        <Route path="/search" component={SearchResults} />
        <Route path="/explore" component={Explore} />
        <Route path="/logout" render={() => {
          setToken(null);
          return <Redirect to="/"/>;
        }}/>
      </div>
    )
  }
}

export default withRouter(Content);
