import {React, useMemo} from "react";

function MyFavoriteToolsTable({allInstruments}){
    const favorites = useMemo(() => {
        return [
          ...allInstruments.stocks.filter(item => item.isFavorite),
          ...allInstruments.futures.filter(item => item.isFavorite),
          ...allInstruments.currencies.filter(item => item.isFavorite)
        ];
      }, [allInstruments]);
    return(
        <>
            <thead>
            <tr className="table-active" >
            
            <th className="text-center">Тикер</th>
            <th className="text-center">Название</th>
            <th className="text-center">Цена</th>
            <th className="text-center">Цена предыдущего закрытия</th>
            <th className="text-center">Цена открытия</th>
            <th className="text-center">Максимум дня</th>
            <th className="text-center">Минимум дня</th>
            <th className="text-center">Изменение</th>
            <th className="text-center">Размер лота</th>
            <th className="text-center">Объем</th>
            <th className="text-center">Гарантийное обеспечение(для фьючерсов)</th>
            <th className="text-center">Волатильность</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </>
    )
}
export default MyFavoriteToolsTable;