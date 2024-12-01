import React from 'react';
import { Link } from 'react-router-dom';
import './StartPage.css'; // Подключение CSS файла

function StartPage() {
    return (
        <div>
            <header className="header">Биржа акций</header>
            <div className="content">
                <nav className="menu">
                    <ul>
                        <li>
                            <Link to="/brokers" className="menu-link">Список брокеров</Link>
                        </li>
                        <li>
                            <Link to="/stocks" className="menu-link">Список акций</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default StartPage;
