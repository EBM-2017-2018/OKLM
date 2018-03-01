import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'material-ui';

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
        <Button variant="raised" color="secondary">
          Click me!
        </Button>
      </div>
    )
  }
}

export default Content;
