import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookings(state, action) {
      state.bookings = action.payload;
    },
    addBooking(state, action) {
      state.bookings.push(action.payload);
    },
    removeBooking(state, action) {
      state.bookings = state.bookings.filter(b => b.id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
});

export const { setBookings, addBooking, removeBooking, setLoading, setError, clearError } = bookingSlice.actions;

export default bookingSlice.reducer;

