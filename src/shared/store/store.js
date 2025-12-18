import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { bookingReducer } from './slices/bookingSlice';
import { reviewsReducer } from './slices/reviewsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
    reviews: reviewsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
