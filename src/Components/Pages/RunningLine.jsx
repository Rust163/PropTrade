import { useState, React, useEffect } from "react";
import axios from "axios";
import "../../styles/RunningLine.css";
import { motion } from "framer-motion";

function RunningLine() {
  const [activeButton, setActiveButton] = useState("Взлеты дня");
  const [positive, setPositive] = useState([]);
  const [negative, setNegative] = useState([]);
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    try {
      const response = await axios.get(
        "https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json?sort_order=desc&sort_column=LASTTOPREVPRICE"
      );

      if (!response.data?.marketdata?.data) {
        throw new Error("Некорректный формат данных от API (marketdata)");
      }

      const { columns, data } = response.data.marketdata;
      const formatData = data.map(row => {
        const security = {};
        columns.forEach((column, index) => {
          security[column] = row[index];
        });
        return security;
      });

      const positiveData = formatData
        .filter(item => item.LASTTOPREVPRICE > 0)
        .slice(0, 15);
      const negativeData = formatData
        .filter(item => item.LASTTOPREVPRICE < 0)
        .slice(0, 15);

      setPositive(positiveData);
      setNegative(negativeData);
    } catch (error) {
      console.error("Ошибка при загрузке данных (marketdata):", error);
      setError(error);
    }
  };

  const fetchIndexData = async () => {
    try {
      const response = await axios.get(
        "https://iss.moex.com/iss/engines/stock/markets/index/securities.json?iss.meta=off&securities.columns=SECID,SHORTNAME,PREVADMITTEDQUOTE,LASTVALUE,CHANGEPRCT"
      );
  
      console.log("Raw API response:", response.data);
  
      // Проверяем наличиe 
      const securitiesData = response.data.securities?.data;
      if (!securitiesData || !Array.isArray(securitiesData)) {
        throw new Error("Не удалось получить данные индексов");
      }
  
      // Список основных индексов для фильтрации
      const MAIN_INDICES = ['IMOEX', 'RTSI', 'MOEXBMI', 'MOEX10', 'MOEXFN', 'RGBITR'];
  
      // Преобразуем данные
      const indices = securitiesData
        .filter(row => MAIN_INDICES.includes(row[0])) // Фильтруем по SECID
        .map(row => ({
          SECID: row[0],
          name: row[1],
          prevValue: row[2],
          currentValue: row[3],
          changePercent: row[4]
        }))
        .sort((a, b) => MAIN_INDICES.indexOf(a.SECID) - MAIN_INDICES.indexOf(b.SECID));
        
  
      console.log("Processed indices:", indices);
      
      if (indices.length === 0) {
        throw new Error("Не найдены данные по основным индексам");
      }
  
      setIndices(indices);
    } catch (error) {
      console.error("Ошибка при загрузке индексов:", error);
      setError(new Error("Не удалось загрузить данные индексов. Попробуйте позже."));
      
      // Запасной вариант - тестовые данные
      
    }
  };

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
          className={`btnB ${activeButton === "Взлеты дня" ? "active" : ""}`}
          onClick={() => setActiveButton("Взлеты дня")}
        >
          Взлеты дня
        </button>
        <button
          className={`btnB ${activeButton === "Падения дня" ? "active" : ""}`}
          onClick={() => setActiveButton("Падения дня")}
        >
          Падения дня
        </button>
        <button
          className={`btnB ${activeButton === "Индексы" ? "active" : ""}`}
          onClick={() => setActiveButton("Индексы")}
        >
          Индексы
        </button>
      </div>

      {activeButton === "Взлеты дня" && (
        <motion.div
          className="motion-items"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
        >
          {[...positive, ...positive].map((item, index) => (
            <div key={index} className="item-box">
              <span className="name-color">{item.SECID}</span>
              <br />
              <span className="price-color">{item.LAST}</span>
              <span className="change-color">+
                {item.LASTTOPREVPRICE?.toFixed(2) ?? "N/A"}%
              </span>
            </div>
          ))}
        </motion.div>
      )}

      {activeButton === "Падения дня" && (
        <motion.div
          className="motion-items"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
        >
          {[...negative, ...negative].map((item, index) => (
            <div key={index} className="item-box">
              <span className="name-color">{item.SECID}</span>
              <br />
              <span className="price-color">{item.LAST}</span>
              <span className="change-color2">
                {item.LASTTOPREVPRICE?.toFixed(2) ?? "N/A"}%
              </span>
            </div>
          ))}
        </motion.div>
      )}

      {activeButton === "Индексы" && (
        <motion.div
          className="motion-items"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {indices.map((item, index) => (
            <div key={index} className="item-box">
              <span className="name-color">{item.name}</span>
              <br />
              <span className="price-color">{item.PREVPRICE?.toFixed(2) ?? "N/A"}</span>
              <span className={`change-color ${item.LASTCHANGEPRCNT >= 0 ? "positive" : "negative"}`}>
              {item.changePercent?.toFixed(2) ?? "N/A"}%
              </span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default RunningLine;