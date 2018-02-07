// @flow
import React from 'react';
import styled from 'react-emotion';
import Dashboard from './containers/Dashboard';

const Header = styled('header')`
  background-color: #309bf8;
  color: white;
  padding: 3.75rem 0;
`;

const Title = styled('h1')`
  font-size: 1.22em;
  font-weight: 400;
  margin: 0 150px;
  text-transform: uppercase;
`;

const Content = styled('main')`
  margin: 0 150px;
  padding: 4.25rem 0;
`;

const App = () => (
  <div className="app">
    <Header>
      <Title>Front Porch</Title>
    </Header>
    <Content>
      <Dashboard />
    </Content>
  </div>
);

export default App;
