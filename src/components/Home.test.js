import React from 'react';
import renderer from 'react-test-renderer';
import Help from './Help'

it('renders Help correctly', () => {
  const tree = renderer.create(
    <Help></Help>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
