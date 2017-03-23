import renderer from 'react-test-renderer';
import React from 'react'
import Help from './help'

test('test', () => {
  const tree = renderer.create(
    <Help />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
