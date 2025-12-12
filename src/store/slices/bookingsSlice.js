import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { dataApi } from '../../api/dataApi'; // ← NAMED EXPORT

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await dataApi.getBookings();
      return Array.isArray(response) ? response : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (booking, { rejectWithValue }) => {
    try {
      const response = await dataApi.postBooking(booking);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBooking = createAsyncThunk(
  'bookings/deleteBooking',
  async (id, { rejectWithValue }) => {
    try {
      await dataApi.deleteBooking(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearBookings: (state) => {
      state.items = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.items = state.items.filter((booking) => booking.id !== action.payload);
      });
  },
});

export const selectBookingsByUser = createSelector(
  [state => state.bookings.items, (state, userId) => userId],
  (bookings, userId) => bookings.filter(booking => booking.userId === userId)
);

export const selectBookingsLoading = (state) => state.bookings.loading;
export const selectBookingsError = (state) => state.bookings.error;

export const { clearBookings, clearError: clearBookingsError } = bookingsSlice.actions;
export default bookingsSlice.reducer;
