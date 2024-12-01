import React, { useState, useEffect } from 'react';
import './BrokerList.css';
import {Link} from "react-router-dom"; // Импортируем стили

// Компонент модального окна
function Modal({ isOpen, onClose, onSave, newBroker, setNewBroker }) {
    if (!isOpen) return null;

    const handleSave = () => {
        if (newBroker.name.trim() && newBroker.balance.trim()) {
            onSave();
            setNewBroker({ name: '', balance: '' }); // Сбрасываем форму
        }
    };

    return (
        <div className="modal">
            <div className="modalContent">
                <h2>Добавить нового брокера</h2>
                <input
                    type="text"
                    value={newBroker.name}
                    onChange={(e) => setNewBroker({ ...newBroker, name: e.target.value })}
                    placeholder="Имя брокера"
                />
                <input
                    type="number"
                    value={newBroker.balance}
                    onChange={(e) => setNewBroker({ ...newBroker, balance: e.target.value })}
                    placeholder="Баланс"
                />
                <button onClick={handleSave}>Сохранить</button>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
}

function BrokerList() {
    const [brokers, setBrokers] = useState([]);
    const [newBroker, setNewBroker] = useState({ name: '', balance: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBroker, setEditingBroker] = useState(null); // Брокер, который редактируется

    const loadBrokers = () => {
        fetch('http://localhost:3001/brokers')
            .then((response) => response.json())
            .then((data) => setBrokers(data))
            .catch((error) => console.error('Error loading brokers:', error));
    };

    useEffect(() => {
        loadBrokers();
    }, []);

    const addBroker = () => {
        const broker = { id: Date.now().toString(), name: newBroker.name, balance: parseFloat(newBroker.balance) };
        fetch('http://localhost:3001/brokers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(broker),
        })
            .then(() => {
                loadBrokers();
                setIsModalOpen(false); // Закрыть модальное окно
            })
            .catch((error) => console.error('Error adding broker:', error));
    };

    const deleteBroker = (id) => {
        fetch(`http://localhost:3001/brokers/${id}`, {
            method: 'DELETE',
        })
            .then(() => loadBrokers())
            .catch((error) => console.error('Error deleting broker:', error));
    };

    // Редактирование баланса брокера
    const handleEditBalance = (broker) => {
        setEditingBroker(broker); // Устанавливаем брокера для редактирования
        saveUpdatedBalance();
    };

    const saveUpdatedBalance = () => {
        if (editingBroker && editingBroker.balance) {
            fetch(`http://localhost:3001/brokers/${editingBroker.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ balance: parseFloat(editingBroker.balance) }),
            })
                .then(() => {
                    loadBrokers();
                    setEditingBroker(null); // Закрываем редактирование
                })
                .catch((error) => console.error('Error updating broker balance:', error));
        }
    };

    return (
        <div className="content">
            <div className="header">Список брокеров</div>
            <div className="center-container">
                <Link to="/" className="menu-link">Меню</Link>
            </div>
            <table className="brokerTable">
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Баланс</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {brokers.map((broker) => (
                    <tr key={broker.id}>
                        <td>{broker.name}</td>
                        <td>
                            {editingBroker && editingBroker.id === broker.id ? (
                                <input
                                    type="number"
                                    value={editingBroker.balance}
                                    onChange={(e) => setEditingBroker({...editingBroker, balance: e.target.value})}
                                />
                            ) : (
                                broker.balance
                            )}
                        </td>
                        <td>
                            <button onClick={() => deleteBroker(broker.id)}>Удалить</button>
                            <button onClick={() => handleEditBalance(broker)}>
                                {editingBroker && editingBroker.id === broker.id ? 'Сохранить' : 'Редактировать'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <button className="addBroker" onClick={() => setIsModalOpen(true)}>Добавить</button>


            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} // Закрытие модального окна
                onSave={addBroker} // Сохранение нового брокера
                newBroker={newBroker}
                setNewBroker={setNewBroker}
            />
        </div>
    );
}

export default BrokerList;
