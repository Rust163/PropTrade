import React, { useState } from "react";
import { FaBars, FaTimes, FaCog, FaChartLine, FaUsers } from "react-icons/fa";
import "../../styles/TestTabs.css"; // Подключаем стили

function TestTabs() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Кнопка для открытия сайдбара */}
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </button>

      {/* Сайдбар */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li><FaChartLine /> Графики</li>
          <li><FaUsers /> Пользователи</li>
          <li><FaCog /> Настройки</li>
        </ul>
      </div>
    </>
  );
}

export default TestTabs;