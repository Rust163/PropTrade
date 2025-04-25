import React from "react";

function CurrencyTable({
    currency,
    loadingCurrency,
    errorCurrency
}) {
    if (loadingCurrency) return <div>Загрузка...</div>;
    if (errorCurrency) return <div>Ошибка: {errorCurrency}</div>;
    if (!currency.length) return <div>Нет данных</div>;
    return(
        <>
            <thead>
            <tr className="table-active">
              <th className="text-center">Тикер</th>
              <th className="text-center">Короткое название</th>
              <th className="text-center">Полное название</th>
              <th className="text-center">Режим торгов</th>
              <th className="text-center">Минимальный шаг цены</th>
              <th className="text-center">Размер лота</th>
              <th className="text-center">Номинал</th>
              <th className="text-center">Последняя цена</th>
              <th className="text-center">Цена открытия</th>
              <th className="text-center">Максимум дня</th>
              <th className="text-center">Минимум дня</th>
              <th className="text-center">Объем в лотах</th>
              <th className="text-center">Лучшая цена покупки</th>
              <th className="text-center">Лучшая цена продажи</th>
              <th className="text-center">Спред</th>
              <th className="text-center">Изменение в %</th>
              <th className="text-center">Глубина покупки</th>
              <th className="text-center">Глубина продажи</th>
              <th className="text-center">Волатильность</th>
            </tr>
          </thead>
            <tbody>
                {currency.map((item) =>(
            <tr key={`${item.SECID}-${item.BOARDID}`}>
              <td className="text-center">{item.SECID}</td>
              <td className="text-center">{item.SHORTNAME}</td>
              <td className="text-center">{item.SECNAME}</td>
              <td className="text-center">{item.BOARDID}</td>
              <td className="text-center">{item.MINSTEP}</td>
              <td className="text-center">{item.LOTSIZE}</td>
              <td className="text-center">{item.FACEVALUE}</td>
              <td className="text-center">{item.LAST}</td>
              <td className="text-center">{item.OPEN}</td>
              <td className="text-center">{item.HIGH}</td>
              <td className="text-center">{item.LOW}</td>
              <td className="text-center">{item.VOLUME}</td>
              <td className="text-center">{item.LASTBID}</td>
              <td className="text-center">{item.LASTOFFER}</td>
              <td className="text-center">{item.LASTBID - item.LASTOFFER}</td>
              <td className="text-center">{item.LASTCHANGEPRCNT}</td>
              <td className="text-center">{item.BIDDEPTH}</td>
              <td className="text-center">{item.ASKDEPTH}</td>
             { /*<td className="text-center">{}</td>*/}
            </tr>
                ))}
          </tbody>
        </>
    );
}
export default CurrencyTable;
/*"securities.columns=" +
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
          "ASKDEPTH"    // Глубина продажи"*/