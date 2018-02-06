// @flow
import './App.css';
import React, { type ComponentType } from 'react';
import Dashboard from './containers/Dashboard';

const App: ComponentType<{}> = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Front Porch</h1>
    </header>
    <main className="App-content">
      <Dashboard />
    </main>
  </div>
);

export default App;
