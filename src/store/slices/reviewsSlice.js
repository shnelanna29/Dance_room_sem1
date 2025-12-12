import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { dataApi } from '../../api/dataApi'; // ← NAMED EXPORT
import { reviewsApi } from '../../api/reviewsApi'; // ← NAMED EXPORT

export const fetchUserReviews = createAsyncThunk(
  'reviews/fetchUserReviews',
  async (userId, { rejectWithValue }) => {
    try {
      const allReviews = await dataApi.getReviews();
      const userReviews = Array.isArray(allReviews) 
        ? allReviews.filter(r => r.userId === userId)
        : [];
      return userReviews;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (review, { rejectWithValue }) => {
    try {
      const response = await dataApi.postReview(review);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async ({ id, review }, { rejectWithValue }) => {
    try {
      const response = await reviewsApi.updateReview(id, review);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (id, { rejectWithValue }) => {
    try {
      await reviewsApi.deleteReview(id);
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

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.items = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.items.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.items = state.items.filter(r => r.id !== action.payload);
      });
  },
});

export const selectAverageRating = createSelector(
  [state => state.reviews.items],
  (reviews) => {
    if (reviews.length === 0) return 0;
    return Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length * 10) / 10;
  }
);

export const { clearReviews, clearError: clearReviewsError } = reviewsSlice.actions;
export default reviewsSlice.reducer;
