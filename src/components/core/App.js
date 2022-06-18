import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import Domain from 'components/shared/domain';

import { store, persistor } from 'storage';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Domain />
    </PersistGate>
  </Provider>
);

export default App;
