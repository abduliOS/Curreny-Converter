/**
 * @format
 */
import 'react-native'
import * as React from 'react'
import App from '../src/Containers/Startup/Index'
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'
const mockStore = configureMockStore();
const store = mockStore({});
// it('renders correctly', () => {
//   renderer.create(<App />)
// })

it('renders correctly', () => {
  const tree = renderer
      .create(
      <Provider store={store}>
          <App /> </Provider>)
      .toJSON();
  expect(tree).toMatchSnapshot();
});


