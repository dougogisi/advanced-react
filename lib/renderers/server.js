import React from 'react';
import ReactDomServer from 'react-dom/server';
import axios from 'axios';
import StateApi from 'state-api';

import App from 'components/App';
import config from 'config';

const serverRender = async () => {
  const resp = await axios.get(`http://${config.host}:${config.port}/data`);
  const store = new StateApi(resp.data);

  return {
    initialMarkup: ReactDomServer.renderToString(
      <App store={store} />
    ),
    initialData: resp.data,
  };
};

export default serverRender;
