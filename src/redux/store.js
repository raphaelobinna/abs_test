import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import positionReducer from './slices/positions';
import userReducer from './slices/users';

export default configureStore({
  reducer: {
    auth: authReducer,
    position: positionReducer,
    user: userReducer,
  },
});
