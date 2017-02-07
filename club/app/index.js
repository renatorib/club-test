import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from 'components/HelloWorld';
import { AppContainer } from 'react-hot-loader';

const Root = () => (
  <AppContainer>
    <HelloWorld />
  </AppContainer>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
