import renderer from 'react-test-renderer';
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Profile from './Profile'

const middlewares = []
const mockStore = configureStore(middlewares)

test('test', () => {
  const tree = renderer.create(
    <Provider store={mockStore({})}>
      <Profile />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
