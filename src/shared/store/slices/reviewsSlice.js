import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews(state, action) {
      state.reviews = action.payload;
    },
    addReview(state, action) {
      state.reviews.push(action.payload);
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

export const { setReviews, addReview, setLoading, setError, clearError } = reviewsSlice.actions;

export default reviewsSlice.reducer;

