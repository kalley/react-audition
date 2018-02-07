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
  margin: 0 auto;
  max-width: 960px;
  text-transform: uppercase;
`;

const Content = styled('main')`
  margin: 0 auto;
  max-width: 960px;
  padding: 4.25rem 0;
`;

const Centered = styled('div')`
  margin: 0 1rem;
`;

const App = () => (
  <div className="app">
    <Header>
      <Centered>
        <Title>Front Porch</Title>
      </Centered>
    </Header>
    <Content>
      <Centered>
        <Dashboard />
      </Centered>
    </Content>
  </div>
);

export default App;
