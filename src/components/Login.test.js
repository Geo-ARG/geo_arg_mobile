import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import React from 'react'
import configureStore from 'redux-mock-store'
import Login from './Login'
import Camera from 'react-native-camera'

jest.mock('react-native-camera', () => 'Camera')
const middlewares = []
const mockStore = configureStore(middlewares)

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={mockStore({})}>
      <Login />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
