import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],  // All users
    user: null, // Current user (for viewing or editing)
    error: null,
    errorValidation: null,
    loadingGet: false,
  },
  reducers: {
    setUsers(state, action) {
      state.error = null;
      state.users = action.payload;
    },
    setUser(state, action) {
      state.error = null;
      state.user = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    addUser(state, action) {
      state.error = null;
      state.users = [action.payload, ...state.users];
    },
    removeUser(state, action) {
      state.error = null;
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser(state, action) {
      state.error = null;
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
      if (state.user && state.user.id === action.payload.id) {
        state.user = action.payload;
      }
    },
    setErrorValidation(state, action) {
      state.errorValidation = action.payload;
    },
    setLoadingGet(state, action) {
      state.loadingGet = action.payload;
    },
  },
});

// Export the reducer and actions
export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
