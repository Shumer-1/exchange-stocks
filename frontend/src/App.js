import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import BrokerList from './brokerList/BrokerList';
import StockList from './stockList/StockList';
import StartPage from "./start/StartPage";
import ExchangeSimulator from "./exchangeSimulator/ExchangeSimulator"; // Импорт stockList

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/brokers" element={<BrokerList />} />
                    <Route path="/stocks" element={<StockList />} />
                    <Route path="/exchange" element={<ExchangeSimulator/>}/>
                    <Route path="/" element={<StartPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
