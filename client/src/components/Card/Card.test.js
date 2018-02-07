import React from 'react';
import { mount } from 'enzyme';
import * as emotion from 'emotion';
import { createSerializer } from 'jest-emotion';
import Card from './Card';

expect.addSnapshotSerializer(createSerializer(emotion));

describe('<Card />', () => {
  it('renders', () => {
    const component = mount(<Card title="Test" />);

    expect(component).toMatchSnapshot();
  });

  it('renderTitle renders a different title component', () => {
    const renderTitle = ({ title }) => <div>{title}</div>;
    const component = mount(<Card renderTitle={renderTitle} title="Test" />);

    expect(component).toMatchSnapshot();
  });
});
