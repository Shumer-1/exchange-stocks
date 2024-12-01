import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import {setStocks, setTradingStatus, setSpeed, setDate} from './stockSlice';
import { Line } from 'react-chartjs-2';
import Modal from 'react-modal';
import './ExchangeSimulator.css';

const socket = io('http://localhost:3001', {
    transports: ['websocket'],
});

// Указываем корневой элемент для модального окна
Modal.setAppElement('#root');

const ExchangeSimulator = () => {
    const { stocks, isTrading, speed, date } = useSelector((state) => state.stocks);
    const dispatch = useDispatch();

    const [selectedStock, setSelectedStock] = useState(null);
    const [priceHistory, setPriceHistory] = useState({});
    const [daysHistory, setDaysHistory] = useState({});

    useEffect(() => {
        socket.on('stockUpdate', (updatedStocks) => {
            dispatch(setStocks(updatedStocks));

            // Обновляем историю цен для каждой акции
            setPriceHistory((prevHistory) => {
                const updatedHistory = { ...prevHistory };
                updatedStocks.forEach((stock) => {
                    if (!updatedHistory[stock.ticker]) {
                        updatedHistory[stock.ticker] = []; // Инициализируем массив, если отсутствует
                    }
                    updatedHistory[stock.ticker].push(stock.price); // Добавляем новое значение цены
                });
                return updatedHistory;
            });
            // Обновляем историю цен для каждой акции
            setDaysHistory((prevHistory) => {
                const updatedHistory = { ...prevHistory };
                updatedStocks.forEach((stock) => {
                    if (!updatedHistory[stock.ticker]) {
                        updatedHistory[stock.ticker] = []; // Инициализируем массив, если отсутствует
                    }
                    updatedHistory[stock.ticker].push(stock.date); // Добавляем новое значение цены
                });
                return updatedHistory;
            });
        });

        socket.emit('loadPage');
        socket.emit('getStocks'); // Запрос на получение данных

        return () => {
            socket.off('stockUpdate'); // Очистка слушателя
        };
    }, [dispatch]);

    const startTrading = () => {
        dispatch(setTradingStatus(true));
        socket.emit('startTrading', { speed });
    };

    const stopTrading = () => {
        dispatch(setTradingStatus(false));
        socket.emit('stopTrading');
        setPriceHistory({}); // Очистка истории цен при остановке торгов
        setDaysHistory({});
    };

    const handleSpeedChange = (e) => {
        dispatch(setSpeed(Number(e.target.value)));
    };
    const handleDateChange = (e) => {
        dispatch(setDate(e.target.value));
    }

    const handleShowChart = (stock) => {
        setSelectedStock(stock); // Устанавливаем выбранную акцию
    };

    const handleCloseChart = () => {
        setSelectedStock(null); // Закрываем модальное окно
    };

    return (
        <div className="content">
            <header className="header">Биржевые торги</header>

            <div className="settings">
                <label htmlFor="speed">Скорость обновления (сек):</label>
                <input
                    id="speed"
                    type="number"
                    value={speed}
                    onChange={handleSpeedChange}
                    disabled={isTrading}
                />

                <button onClick={startTrading} disabled={isTrading}>
                    Начать торги
                </button>
                <button onClick={stopTrading} disabled={!isTrading}>
                    Остановить торги
                </button>
            </div>

            <div className="stock-prices">
                <h3>Текущие цены акций:</h3>
                <table className="stockTable">
                    <thead>
                    <tr>
                        <th>Компания</th>
                        <th>Тикер</th>
                        <th>Цена ($)</th>
                        <th>Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {stocks.map((stock) => (
                        <tr key={stock.ticker}>
                            <td>{stock.companyName}</td>
                            <td>{stock.ticker}</td>
                            <td>{stock.price.toFixed(2)}</td>
                            <td>
                                <button onClick={() => handleShowChart(stock)}>График</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Модальное окно для графика */}
            {selectedStock && (
                <Modal
                    isOpen={!!selectedStock}
                    onRequestClose={handleCloseChart}
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >
                    <h3>График изменений для {selectedStock.companyName} ({selectedStock.ticker})</h3>
                    <Line
                        data={{
                            labels: daysHistory[selectedStock.ticker]?.map((date) => date), // Используем даты для оси X
                            datasets: [
                                {
                                    label: 'Цена ($)',
                                    data: priceHistory[selectedStock.ticker] || [],
                                    borderColor: 'rgba(75,192,192,1)',
                                    borderWidth: 2,
                                    fill: false,
                                    pointRadius: 5,
                                    pointHoverRadius: 7,
                                    spanGaps: false, // Отключение соединения пропущенных точек
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: false,
                                    suggestedMin:
                                        Math.min(...(priceHistory[selectedStock.ticker] || [0])) * 0.95,
                                    suggestedMax:
                                        Math.max(...(priceHistory[selectedStock.ticker] || [0])) * 1.05,
                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Дата',
                                    },
                                    ticks: {
                                        autoSkip: true,
                                        maxRotation: 90,
                                        minRotation: 45,
                                    },
                                },
                            },
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top',
                                },
                            },
                        }}
                    />
                    <button onClick={handleCloseChart} className="close-button">
                        Закрыть
                    </button>
                </Modal>
            )}
        </div>
    );
};

export default ExchangeSimulator;
