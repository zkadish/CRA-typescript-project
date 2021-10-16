import React from 'react';
import Records from '../Records';
import { Provider } from 'react-redux';
import { store } from '../../store';

function App() {
  return (
    <Provider store={store}>
      <Records />
    </Provider>
  );
}

export default App;
