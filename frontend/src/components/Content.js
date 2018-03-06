import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import MyDocs from './MyDocs';
import {Route} from 'react-router-dom';

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
      </div>
    )
  }
}

export default Content;
