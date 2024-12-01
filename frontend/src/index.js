import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './exchangeSimulator/store'; // Путь к вашему store
import ExchangeSimulator from './exchangeSimulator/ExchangeSimulator'; // Ваш компонент
import App from './App'; // Если хотите использовать App, или можете заменить на ExchangeSimulator напрямую

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
