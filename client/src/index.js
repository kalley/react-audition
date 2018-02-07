// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { injectGlobal } from 'react-emotion';
import App from './App';
import configureStore from './store';

injectGlobal`
  html {
    font-size: 14px;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }

  * {
    box-sizing: border-box;
  }
  
  @media(min-width: 37.5em) {
    html {
      font-size: 16px;
    }
  }
`;

const store = configureStore();

const rootElement = document.getElementById('root');

const render = AppComponent => {
  // flow is very picky...
  if (!rootElement) {
    return;
  }

  ReactDOM.render(
    <Provider store={store}>
      <AppComponent />
    </Provider>,
    rootElement
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(require('./App').default);
  });
}
