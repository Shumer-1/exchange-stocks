import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './StockList.css';
import { Link } from "react-router-dom";

// Регистрируем компоненты для Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function StockList() {
    const [stocks, setStocks] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [viewChart, setViewChart] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/stocks")
            .then((response) => response.json())
            .then((data) => setStocks(data))
            .catch((error) => console.error("Error loading stocks:", error));
    }, []);

    const toggleParticipation = (ticker) => {
        const updatedStocks = stocks.map((stock) =>
            stock.ticker === ticker
                ? { ...stock, participatesInTrading: !stock.participatesInTrading }
                : stock
        );

        setStocks(updatedStocks);

        fetch(`http://localhost:3001/stocks/${ticker}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                participatesInTrading: updatedStocks.find(
                    (stock) => stock.ticker === ticker
                ).participatesInTrading,
            }),
        }).catch((error) => console.error("Error updating stock:", error));
    };

    const viewDetails = (ticker) => {
        const stock = stocks.find((stock) => stock.ticker === ticker);
        setSelectedStock(stock);
    };

    const closeDetails = () => setSelectedStock(null);

    const toggleViewChart = () => {
        setViewChart(!viewChart);
    };

    // Функция для подготовки данных для графика
    const getChartData = () => {
        if (!selectedStock) return {};

        // Сортировка исторических данных по дате в порядке возрастания
        const sortedData = selectedStock.historicalData.sort((a, b) => {
            return new Date(a.date) - new Date(b.date); // Сортируем по возрастанию
        });

        const labels = sortedData.map((data) => data.date);
        const dataPoints = sortedData.map((data) => data.open);

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Цена открытия',
                    data: dataPoints,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false,
                },
            ],
            options: {
                scales: {
                    x: {
                        reverse: false, // Время должно идти слева направо
                    },
                },
            },
        };
    };


    return (
        <div className="content">
            <h1 className="header">Перечень акций</h1>
            <div className="center-container">
                <Link to="/" className="menu-link">Меню</Link>
                <Link to="/exchange" className="menu-link">Торги</Link>
            </div>
            <table className="stockTable">
                <thead>
                <tr>
                    <th>Обозначение</th>
                    <th>Название компании</th>
                    <th>Участвует в торгах</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {stocks.map((stock) => (
                    <tr key={stock.ticker}>
                        <td>{stock.ticker}</td>
                        <td>{stock.companyName}</td>
                        <td>
                            {stock.participatesInTrading ? "Да" : "Нет"}
                            <button
                                className="toggle-btn"
                                onClick={() => toggleParticipation(stock.ticker)}
                            >
                                Изменить
                            </button>
                        </td>
                        <td>
                            <button
                                className="details-btn"
                                onClick={() => viewDetails(stock.ticker)}
                            >
                                История
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedStock && (
                <div className="stock-details">
                    <div className="modalContent">
                        <h2>
                            Исторические данные: {selectedStock.companyName} ({selectedStock.ticker})
                        </h2>
                        <button onClick={toggleViewChart}>
                            {viewChart ? "Показать таблицу" : "Показать график"}
                        </button>

                        {viewChart ? (
                            <div style={{ width: '600px', height: '400px' }}>
                                <Line data={getChartData()} />
                            </div>
                        ) : (
                            <table>
                                <thead>
                                <tr>
                                    <th>Дата</th>
                                    <th>Цена открытия</th>
                                </tr>
                                </thead>
                                <tbody>
                                {selectedStock.historicalData.map((data) => (
                                    <tr key={data.date}>
                                        <td>{data.date}</td>
                                        <td>{data.open}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}

                        <button onClick={closeDetails}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StockList;
