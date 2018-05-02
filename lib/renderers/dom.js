import React from 'react';
import ReactDom from 'react-dom';

import StateApi from 'state-api';
import App from 'components/App';

const store = new StateApi(window.initialData);

// use hydrate instead of render on component already rendered serverside
ReactDom.hydrate(<App store={store} />, document.getElementById('root'));
