import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import bookingsReducer from './slices/bookingsSlice'
import reviewsReducer from './slices/reviewsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingsReducer,
    reviews: reviewsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export const RootState = store.getState
export const AppDispatch = store.dispatch
export default store
