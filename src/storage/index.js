import thunk from 'redux-thunk';
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import { composeWithDevTools } from '@redux-devtools/extension';

import reducers from 'reducers';
import storage from 'redux-persist/lib/storage';

/* Primary store */
const persistConfig = {
  key: 'root',
  storage,
};

const appReducers = persistReducer(persistConfig, combineReducers(reducers));
const store = createStore(appReducers, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);

export {
  store,
  persistor,
};
