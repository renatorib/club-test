console.log(require.resolve('components/HelloWorld'));

import React from 'react';
import HelloWorld from 'components/HelloWorld';

console.log(require.cache[require.resolve('components/HelloWorld')]);

export default () => (
  <div className="App">
    <h1>App</h1>
    <HelloWorld />
  </div>
);
