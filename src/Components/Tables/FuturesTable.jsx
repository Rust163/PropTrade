import React from "react";

function FuturesTable({
  futures = [],
  errorFutures,
  onRowDoubleClick,
  loadingFutures,
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
            <tr key={`${item.SECID}-${item.BOARDID}`}
            onDoubleClick={() =>{
              console.log('Double click on:', item); // Для отладки
              if(item && item.SECID){
                console.log('SECID exists:', item.SECID);
              onRowDoubleClick(item); // Передаём только тикер
            } else{
              console.error('invalid item structure:', item);
            }
            }} /*onRowDoubleClick(item)}*/
            style={{cursor: 'pointer'}}>
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