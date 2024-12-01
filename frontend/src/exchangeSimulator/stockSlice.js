// redux/stocksSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние
const initialState = {
    stocks: [],
    isTrading: false,
    speed: 1
};

// Слайс для управления акциями и состоянием торгов
export const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        setStocks: (state, action) => {
            state.stocks = action.payload;
        },
        updateStockPrices: (state) => {
            state.stocks = state.stocks.map(stock => ({
                ...stock,
                price: +(stock.price * (1 + (Math.random() * 2 - 1) * 0.01)).toFixed(2)
            }));
        },
        setTradingStatus: (state, action) => {
            state.isTrading = action.payload;
        },
        setSpeed: (state, action) => {
            state.speed = action.payload;
        }
    }
});

// Экспортируем actions
export const { setStocks, updateStockPrices, setTradingStatus, setSpeed, setDate } = stocksSlice.actions;

// Экспортируем редьюсер
export default stocksSlice.reducer;
