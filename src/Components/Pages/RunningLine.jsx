import { useState, React, useEffect } from "react";
import axios from "axios";
import "../../styles/RunningLine.css";
import { motion } from "framer-motion";

function RunningLine() {
  const [activBatton, setActivButton] = useState("Взлеты дня");
  const [positive, setPositive] = useState([]); // данные для взлеты дня
  const [negative, setNegative] = useState([]); // данные для падения дня
  const [worldIndex, setWorldIndex] = useState([]); // данные для индексов
  const [loading, setLoading] = useState(true); // состояние загрузки данных
  const [error, setError] = useState(null); // состояние ошибки

  // Получаем данные о взлетах дня и падениях
  const fetchStockData = async () => {
    try {
      const response = await axios.get(
        "https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json?sort_order=desc&sort_column=LASTTOPREVPRICE"
      );
      console.log("Ответ API (marketdata):", response.data.marketdata);

      // Проверяем, есть ли данные в ответе
      if (!response.data || !response.data.marketdata || !response.data.marketdata.columns || !response.data.marketdata.data) {
        throw new Error("Некорректный формат данных от API (marketdata)");
      }

      const columns = response.data.marketdata.columns;
      const data = response.data.marketdata.data;

      // Преобразуем данные в массив объектов
      const formatData = data.map((row) => {
        const security = {};
        columns.forEach((column, index) => {
          security[column] = row[index];
        });
        return security;
      });

      console.log("Форматированные данные (marketdata):", formatData);

      // Фильтруем данные для взлетов и падений
      const positiveData = formatData
        .filter((item) => item.LASTTOPREVPRICE > 0)
        .slice(0, 15);
      const negativeData = formatData
        .filter((item) => item.LASTTOPREVPRICE < 0)
        .slice(0, 15);

      setPositive(positiveData);
      setNegative(negativeData);
    } catch (error) {
      console.error("Ошибка при загрузке данных (marketdata):", error);
      setError(error);
    }
  };

  // Получаем данные по индексам
  const fetchIndexData = async () => {
    try {
      const response = await axios.get(
        "https://iss.moex.com/iss/statistics/engines/stock/markets/index/analytics.json"
      );
      console.log("Ответ API (indices):", response.data.indices);

      // Проверяем, есть ли данные в ответе
      if (!response.data || !response.data.indices || !response.data.indices.columns || !response.data.indices.data) {
        throw new Error("Некорректный формат данных от API (indices)");
      }

      const indices = response.data.indices;

      const { columns, data } = indices;

      // Преобразуем данные в массив объектов
      const formatData = data.map((row) => {
        const index1 = {};
        columns.forEach((column, index) => {
          index1[column] = row[index];
        });
        return index1;
      });

      console.log("Форматированные данные (indices):", formatData);

      setWorldIndex(formatData.slice(0, 20)); // Сохраняем первые 5 индексов
    } catch (error) {
      console.error("Ошибка при загрузке данных (indices):", error);
      setError(error);
    }
  };

  // Загружаем данные
  useEffect(() => {
    const fetchData = async () => {
      await fetchStockData();
      await fetchIndexData();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Загружаем данные...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки данных: {error.message}</div>;
  }

  return (
    <div className="running-line-box pt-5">
      <div className="btn-box">
        <button
          id="items"
          className={`btnB ${activBatton === "Взлеты дня" ? "active" : ""}`}
          onClick={() => setActivButton("Взлеты дня")}
        >
          Взлеты дня
        </button>
        <button
          id="items2"
          className={`btnB ${activBatton === "Падения дня" ? "active" : ""}`}
          onClick={() => setActivButton("Падения дня")}
        >
          Падения дня
        </button>
        <button
          id="items3"
          className={`btnB ${activBatton === "Индексы" ? "active" : ""}`}
          onClick={() => setActivButton("Индексы")}
        >
          Индексы
        </button>
      </div>

      {activBatton === "Взлеты дня" && (
        <motion.div
          className="motion-items"
          initial={{ x: "50%" }}
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
        >
          {[...positive, ...positive].map((item, index) => (
            <div key={index} className="item-box">
              <span className="name-color">{item.SECID}</span>
              <br />
              <span className="price-color">{item.LAST}</span>
              <span className="change-color">
                {item.LASTTOPREVPRICE ? item.LASTTOPREVPRICE.toFixed(2) : "N/A"}%
              </span>
            </div>
          ))}
        </motion.div>
      )}

      {activBatton === "Падения дня" && (
        <motion.div
          className="motion-items"
          initial={{ x: "50%" }}
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
        >
          {[...negative, ...negative].map((item, index) => (
            <div key={index} className="item-box">
              <span className="name-color">{item.SECID}</span>
              <br />
              <span className="price-color">{item.LAST}</span>
              <span className="change-color2">
                {item.LASTTOPREVPRICE ? item.LASTTOPREVPRICE.toFixed(2) : "N/A"}%
              </span>LASTTOPREVPRICE
            </div>
          ))}
        </motion.div>
      )}

      {activBatton === "Индексы" && (
        <motion.div
          className="motion-items"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {worldIndex.map((item, index) => (
            <div key={index} className="item-box">
              <span className="name-color">{item.SECID}</span>
              <br />
              <span className="price-color">{item.LAST}</span>
              <span className="change-color">
                {item.LASTTOPREVPRICE ? item.LASTTOPREVPRICE.toFixed(2) : "N/A"}
              </span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default RunningLine;