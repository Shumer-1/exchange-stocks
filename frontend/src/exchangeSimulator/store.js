// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import stocksReducer from './stockSlice';

export const store = configureStore({
    reducer: {
        stocks: stocksReducer
    }
});
