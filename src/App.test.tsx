import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  /**
   * @author @is-it-ayush
   * This is a basic test example. This will pass as it use's regex to find the Multimail text in the App.tsx which exists.
   * More test's can be added to test the functionality of the app later.
   */
  expect(getByText(/Multimail/i)).toBeInTheDocument();

});
