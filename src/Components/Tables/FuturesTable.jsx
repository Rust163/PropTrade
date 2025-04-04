/*import React from "react";

function FuturesTable({
  futures,
  errorFutures,
  loadingFutures}){
    if (loadingFutures) return <div>Загрузка...</div>;
    if (errorFutures) return <div>Ошибка: {errorFutures}</div>;
    if (!futures.length) return <div>Нет данных{futures}</div>;
    console.log("Полный ответ API в компоненте FuturesTable:", futures);
    return(
        <>
          <thead>
            <tr className="table-active">
              <th className="text-center">Тикер</th>
              <th className="text-center">Короткое название</th>
              <th className="text-center">Базовый актив</th>
              <th className="text-center">Размер лота</th>
              <th className="text-center">Дата экспирации</th>
              <th className="text-center">Дата поставки</th>
              <th className="text-center">Гарантийное обеспечение</th>
              <th className="text-center">Минимальный шаг цены</th>
              <th className="text-center">Валюта (RUB/USD)</th>
              <th className="text-center">Цена предыдущего закрытия</th>
              <th className="text-center">Последняя цена</th>
              <th className="text-center">Цена открытия</th>
              <th className="text-center">Максимум дня</th>
              <th className="text-center">Минимум дня</th>
              <th className="text-center">Изменение(%)</th>
              <th className="text-center">Объем</th>
              <th className="text-center">Волатильность</th>
            </tr>
          </thead>
          <tbody>
          {futures.map((item) => (
          <tr key={`${item.SECID}-${item.BOARDID}`}>
              <td className="text-center">{item.SECID}</td>
              <td className="text-center">{item.SHORTNAME}</td>
              <td className="text-center">{item.ASSETCODE}</td>
              <td className="text-center">{item.LOTSIZE}</td>
              <td className="text-center">{item.EXPIRATION}</td>
              <td className="text-center">{item.SETTLEDATE}</td>
              <td className="text-center">{item.INITIALMARGIN}</td>
              <td className="text-center">{item.MINSTEP}</td>
              <td className="text-center">{item.CURRENCYID}</td>
              <td className="text-center">{item.PREVPRICE}</td>
              <td className="text-center">{item.LAST?.toFixed(2)}</td>
              <td className="text-center">{item.OPEN?.toFixed(2)}</td>
              <td className="text-center">{item.HIGH?.toFixed(2)}</td>
              <td className="text-center">{item.LOW?.toFixed(2)}</td>
              <td className={item.LAST?.toFixed(2) >= item.PREVPRICE?.toFixed(2) ? 'positive-change' : 'negative-change'}>
                {item.HIGH?.toFixed(2) && item.LOW.toFixed(2) ((item.HIGH - item.LOW) /item.LOW * 100) >= item.PREVPRICE ? '+' : '-'}%
              </td>
              <td className="text-center">{item.VOLUME}</td>
              <td className="text-center">
                {item.LAST?.toFixed(2) >= item.PREVPRICE?.toFixed(2) ? '+' : '-'}{item.LAST?.toFixed(2)}%
              </td>
            </tr>
          ))}
          </tbody>
        </>
    )
  }
  export default FuturesTable;
                
/*"SECID," +       // Тикер (например: SiZ3)
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
          "BUYSELLPRICE"   // Индикативная цена*/

          import React from "react";

function FuturesTable({
  futures = [],
  errorFutures,
  loadingFutures
}) {
  if (loadingFutures) return <div>Загрузка...</div>;
  if (errorFutures) return <div>Ошибка: {errorFutures}</div>;
  if (!futures.length) return <div>Нет данных</div>;

  // Функция для безопасного форматирования чисел
  const formatNumber = (value) => {
    if (value === null || value === undefined) return 'N/A';
    const num = Number(value);
    return isNaN(num) ? 'N/A' : num.toFixed(2);
  };

  return (
    <>
      <thead>
        <tr className="table-active">
        <th className="text-center">Тикер</th>
          <th className="text-center">Базовый актив</th>
          <th className="text-center">Короткое название</th>
          <th className="text-center">Размер лота</th>
          <th className="text-center">Дата экспирации</th>
          <th className="text-center">Дата поставки</th>
          <th className="text-center">Гарантийное обеспечение</th>
          <th className="text-center">Минимальный шаг цены</th>
          <th className="text-center">Валюта (RUB/USD)</th>
          <th className="text-center">Цена предыдущего закрытия</th>
          <th className="text-center">Последняя цена</th>
          <th className="text-center">Цена открытия</th>
          <th className="text-center">Максимум дня</th>
          <th className="text-center">Минимум дня</th>
          <th className="text-center">Изменение(%)</th>
          <th className="text-center">Объем</th>
          <th className="text-center">Волатильность</th>
        </tr>
      </thead>
      <tbody>
        {futures.map((item) => {
          // Преобразуем значения в числа
          const last = Number(item.LAST);
          const prev = Number(item.PREVPRICE);
          const high = Number(item.HIGH);
          const low = Number(item.LOW);

          // Рассчитываем изменение цены
          const changePercent = !isNaN(last) && !isNaN(prev) && prev !== 0
            ? ((last - prev) / prev * 100)
            : null;

          // Рассчитываем волатильность
          const volatility = !isNaN(high) && !isNaN(low) && low !== 0
            ? ((high - low) / low * 100)
            : null;

          return (
            <tr key={`${item.SECID}-${item.BOARDID}`}>
              <td className="text-center">{item.SECID}</td>
              <td className="text-center">{item.SHORTNAME}</td>
              <td className="text-center">{item.ASSETCODE}</td>
              <td className="text-center">{item.LOTSIZE}</td>
              <td className="text-center">{item.EXPIRATION}</td>
              <td className="text-center">{item.SETTLEDATE}</td>
              <td className="text-center">{item.INITIALMARGIN}</td>
              <td className="text-center">{item.MINSTEP}</td>
              <td className="text-center">{item.CURRENCYID}</td>
              <td className="text-center">{formatNumber(item.PREVPRICE)}</td>
              <td className="text-center">{formatNumber(item.LAST)}</td>
              <td className="text-center">{formatNumber(item.OPEN)}</td>
              <td className="text-center">{formatNumber(item.HIGH)}</td>
              <td className="text-center">{formatNumber(item.LOW)}</td>
              <td className={changePercent !== null ? (changePercent >= 0 ? 'positive-change' : 'negative-change') : ''}>
                {changePercent !== null ? `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%` : 'N/A'}
              </td>
              <td className="text-center">{item.VOLUME || 'N/A'}</td>
              <td className="text-center">
                {volatility !== null ? `${volatility.toFixed(2)}%` : 'N/A'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
}

export default FuturesTable;