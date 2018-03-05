import React from 'react';
import ReactDOM from 'react-dom';
import AppsMenu from './AppsMenu';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppsMenu open anchorEl={div} closeCallback={() => null} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
