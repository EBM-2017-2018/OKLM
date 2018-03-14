import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';

import MyDocs from './MyDocs';
import UploadForm from './UploadForm';

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
        <Route path="/upload" component={UploadForm}/>
      </div>
    )
  }
}

export default withRouter(Content);
