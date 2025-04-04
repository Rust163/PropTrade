import axios from "axios";
/*https://iss.moex.com/iss/engines/futures/markets/forts/securities.json список фьючерсов */
/*https://iss.moex.com/iss/engines/stock/markets/shares/securities.json список акций*/
/*https://iss.moex.com/iss/engines/currency/markets/selt/securities.json список валютных пар */
/*https://iss.moex.com/iss/engines/futures/markets/options/securities.json список опционов */

const mmvbApi = axios.create({
    baseURL: "https://iss.moex.com/iss",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

mmvbApi.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error("API error:", error);
        if(error.response?.status === 401) {
            window.location.href = "/Home";
        }
        return Promise.reject(error);
    }
);

export default{
    getStocks: () => mmvbApi.get("/engines/stock/markets/shares/securities.json?" +
    "iss.meta=off&" + // Отключаем метаданные для уменьшения объема данных
    // Основные параметры инструментов
    "securities.columns=" +
      "SECID," +         // Тикер (например: SBER)
      "SHORTNAME," +     // Краткое название (Сбербанк)
      "SECNAME," +       // Полное название
      "ISIN," +          // Международный код
      "REGNUMBER," +     // Регистрационный номер
      "LOTSIZE," +       // Размер лота
      "CURRENCYID," +    // Валюта (RUB/USD)
      "LISTLEVEL," +     // Уровень листинга (эшелон 1, 2, 3)
      "SETTLEDATE," +    // Дата расчетов
      "BOARDID," +       // Режим торгов (TQBR, SMAL и тд)
      "PREVPRICE," +     // Цена предыдущего закрытия
      "STATUS," +        // Статус бумаги
      "SECTYPE," +       // Тип ценной бумаги
      "ISSUESIZE," +     // Объем выпуска
      "ISSUESIZEPLACED," + // Размещенный объем
      "FACEVALUE," +     // Номинал
      "FACEUNIT," +      // Валюта номинала
      "BUYBACKDATE," +   // Дата обратного выкупа
      "BUYBACKPRICE," +  // Цена выкупа
      "LATNAME" +       // Международное название
    // Рыночные данные
    "marketdata.columns=" +
      "LAST," +          // Последняя цена
      "OPEN," +          // Цена открытия
      "HIGH," +          // Максимум дня
      "LOW," +           // Минимум дня
      "VOLUME," +        // Объем торгов
      "MARKETPRICE," +   // Рыночная цена
      "LASTCHANGE," +    // Изменение цены
      "LASTTOPREVPRICE," + // Изменение в %
      "BID," +           // Лучшая цена покупки
      "ASK," +           // Лучшая цена продажи
      "BIDDEPTH," +      // Глубина покупки
      "ASKDEPTH," +      // Глубина продажи
      "NUMTRADES," +     // Количество сделок
      "WAPRICE," +       // Средневзвешенная цена
      "TRADINGSTATUS," + // Статус торгов
      "UPDATETIME"       // Время обновления
    ),


    getFutures: () => mmvbApi.get("/engines/futures/markets/forts/securities.json?" +
        "iss.meta=off&" + // отключаем метаданные для сокращения ответа
        "securities.columns=" +
          "SECID," +       // Тикер (например: SiZ3)
          "SHORTNAME," +   // Короткое название (Si-12.23)
          "LOTSIZE," +     // Размер лота
          "ASSETCODE," +   // Базовый актив (Si - USD/RUB)
          "EXPIRATION," +  // Дата экспирации
          "SETTLEDATE," +  // Дата поставки
          "INITIALMARGIN," + // Гарантийное обеспечение
          "MINSTEP," +     // Минимальный шаг цены
          "CURRENCYID," +  // Валюта (RUB/USD)
          "PREVPRICE," +   // Цена предыдущего закрытия
          "LATNAME" +      // Международное название
        "&marketdata.columns=" +
          "LAST," +        // Последняя цена
          "OPEN," +        // Цена открытия
          "HIGH," +        // Максимум дня
          "LOW," +         // Минимум дня
          "VOLUME," +      // Объем в деньгах
          "BUYSELLPRICE"   // Индикативная цена
          )
};