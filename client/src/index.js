// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';

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
