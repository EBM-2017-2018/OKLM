import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';

import MyDocs from './MyDocs';
import UploadForm from './UploadForm';
import SearchResults from './SearchResults';
import Explore from './Explore';

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
        <Route path="/mydocs" component={MyDocs}/>
        <Route path="/upload" component={UploadForm} />
        <Route path="/search" component={SearchResults} />
        <Route path="/explore" component={Explore} />
      </div>
    )
  }
}

export default withRouter(Content);
