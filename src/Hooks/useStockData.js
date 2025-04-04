import { useState, useEffect } from "react";
import mmvbApi from "../Components/Services/mmvbApi";

export const useStockData = () => {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true); // Начинаем с true
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await mmvbApi.getStocks();
      console.log("Полный ответ API:", response); // Для отладки
      
      if (!response?.securities?.data) {
        throw new Error("Данные не получены или имеют неверный формат");
      }

      // Преобразование данных
      const securities = response.securities.data.map((row, index) => {
        const item = {};
        response.securities.columns.forEach((col, i) => {
          item[col] = row[i];
        });
        
        // Добавляем рыночные данные, если они есть
        if (response.marketdata?.data?.[index]) {
          response.marketdata.columns.forEach((col, i) => {
            item[col] = response.marketdata.data[index][i];
          });
        }
        
        return item;
      });

      setStock(securities.slice(0, 600));
    } catch (err) {
      console.error("Ошибка получения данных:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { stock, loading, error, refetch: fetchData };
};