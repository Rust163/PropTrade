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
      "MINSTEP" +        // Минимальный шаг цены
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
          ),

    getCurrency: () => mmvbApi.get("/engines/currency/markets/selt/securities.json?" +
        "iss.meta=off&" + // Отключаем метаданные
        "securities.columns=" +
          "SECID," +       // Тикер (например: USD000UTSTOM)
          "BOARDID," +     // Режим торгов (CETS, SELT)
          "SHORTNAME," +   // Короткое название (USD/RUB)
          "LATNAME," +     // Международное название
          "SECNAME," +     // Полное название
          "DECIMALS," +    // Количество знаков после запятой
          "MINSTEP," +     // Минимальный шаг цены
           "LOTSIZE," +     // Размер лота
           "FACEVALUE," +   // Номинал
           "FACEUNIT," +    // Валюта номинала
          "CURRENCYID," +  // Валюта инструмента
          "SECTYPE," +     // Тип ценной бумаги
          "LISTLEVEL," +   // Уровень листинга
          "SETTLEDATE," +  // Дата расчетов
          "PREVPRICE," +   // Цена предыдущего закрытия
          "BASECURRENCY," + // Базовая валюта (USD)
          "QUOTECURRENCY," + // Котируемая валюта (RUB)
          "CROSSRATE" +    // Кросс-курс
        "&marketdata.columns=" +
          "LAST," +        // Последняя цена
          "OPEN," +        // Цена открытия
          "HIGH," +        // Максимум дня
          "LOW," +         // Минимум дня
          "VOLUME," +      // Объем в лотах
          "VALUE," +       // Объем в деньгах
          "WAPRICE," +     // Средневзвешенная цена
          "LASTCHANGE," +  // Изменение цены
          "LASTCHANGEPRCNT," + // Изменение в %
          "LASTBID," +     // Лучшая цена покупки
          "LASTOFFER," +   // Лучшая цена продажи
          "NUMTRADES," +   // Количество сделок
          "TRADINGSTATUS," + // Статус торгов
          "UPDATETIME," +  // Время обновления
          "BID," +         // Лучшая цена покупки (стакан)
          "ASK," +         // Лучшая цена продажи (стакан)
          "BIDDEPTH," +    // Глубина покупки
          "ASKDEPTH"    // Глубина продажи"
    ),

    getOrderBook: (secId, boardId) => mmvbApi.get(
      `/engines/stock/markets/shares/boards/${boardId}/securities/${secId}/orderbook.json?` +
      'iss.meta=off&' +
      'orderbook.columns=price,quantity'
    ),
};