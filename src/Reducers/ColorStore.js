import { configureStore } from '@reduxjs/toolkit';
import reducer from './ColorReducer';

const store = configureStore({
  reducer: reducer,
});

export default store;