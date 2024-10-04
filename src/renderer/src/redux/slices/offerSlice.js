import { createSlice } from '@reduxjs/toolkit';

const offerSlice = createSlice({
  name: 'offer',
  initialState: {
    offers: [],
    offer: null,
    error: null,
    errorValidation: null,
    loadingGet: false,
  },
  reducers: {
    setOffers(state, action) {
      state.error = null;
      state.offers = action.payload;
    },
    setOffer(state, action) {
      state.error = null;
      state.offer = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    addOffer(state, action) {
      state.error = null;
      state.offers = [action.payload, ...state.offers];
    },
    removeOffer(state, action) {
      state.error = null;
      state.offers = state.offers.filter((offer) => offer.id !== action.payload);
    },
    updateOffer(state, action) {
      state.error = null;
      state.offers = state.offers.map((offer) =>
        offer.id === action.payload.id ? action.payload.offer : offer
      );
      if (state.offer && state.offer.id === action.payload.id) {
        state.offer = action.payload.offer;
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

export const offerReducer = offerSlice.reducer;
export const offerActions = offerSlice.actions;
