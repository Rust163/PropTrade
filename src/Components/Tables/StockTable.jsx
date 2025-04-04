import React from "react";

function StockTable({ 
    stock,
    error,
    loading,
    selectedTradeMode, 
    selectedListLevel, 
    tradeModes, 
    listLevel, 
    setSelectedTradeMode, 
    setSelectedListLevel,
    hoveredHeaderListLevel,
    setHoveredHeaderListLevel,
    hoveredHeader,
    setHoveredHeader}){
      if (loading) return <div>Загрузка...</div>;
      if (error) return <div>Ошибка: {error}</div>;
      if (!stock.length) return <div>Нет данных</div>;
    return(
    <>
      
            <thead>
            <tr className="table-active" >
            <th>Тикер</th>
            <th>Название</th>
            <th
              onMouseEnter={() => setHoveredHeaderListLevel('listLevel')}
              onMouseLeave={() => setHoveredHeaderListLevel(null) }
              style={{position: "sticky", cursor: "pointer"}}
            >Уровень листинга (эшелон) ▼ <br /> {selectedListLevel}
            {hoveredHeaderListLevel === "listLevel" && (
              <div className="boardId-dropdown-meny">
                {listLevel.map(mode => (
                  <div className="selecter-dropdown-menu"
                    key={mode}
                    onClick={() => {
                      setSelectedListLevel(mode);
                      setHoveredHeaderListLevel(null);
                    }}
                  >
                    {mode}
                  </div>
                ))}
              </div>
            )}</th>
            <th
              onMouseEnter={() => setHoveredHeader('tradeMode')}
              onMouseLeave={() => setHoveredHeader(null)}
              style={{position: "sticky", cursor: "pointer"}}
            >Режим торгов ▼ <br />{selectedTradeMode}
            {hoveredHeader === "tradeMode" && (
              <div className="boardId-dropdown-meny">
                {tradeModes.map(mode => (
                  <div className="selecter-dropdown-menu"
                    key={mode}
                    onClick={() => {
                      setSelectedTradeMode(mode);
                      setHoveredHeader(null);
                    }}
                  >
                    {mode}
                  </div>
                ))}
              </div>
            )}</th>
            <th>Цена</th>
            <th>Цена предыдущего закрытия</th>
            <th>Цена открытия</th>
            <th>Максимум дня</th>
            <th>Минимум дня</th>
            <th>Изменение</th>
            <th>Размер лота</th>
            <th>Тип ценной бумаги</th>
            <th>Статус бумаги</th>
            <th>Объем</th>
            <th>Волатильность</th>
            </tr>
          </thead>
            <tbody style={{textAlign: "center"}}>
            {stock
          .filter(item => selectedTradeMode === tradeModes[0] || item.BOARDID === selectedTradeMode)
          .filter(item => selectedListLevel === listLevel[0] || item.LISTLEVEL === selectedListLevel)
          .map((item) => (
            <tr key={`${item.SECID}-${item.BOARDID}`}>
              <td className="text-center ml-10">{item.SECID}</td>
              <td className="text-center ml-10">{item.SHORTNAME}</td>
              <td className="text-center ml-10">{item.LISTLEVEL}</td>
              <td className="text-center ml-10"><span style={{
                  backgroundColor: item.BOARDID === 'TQBR' ? '#e6f0ff' : '#fff0e6',
                  color: item.BOARDID === 'TQBR' ? '#0066ff' : '#ff6600',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {item.BOARDID}
                </span></td>
              <td className="text-center price-cell ml-10">{item.LAST?.toFixed(2)}</td>
              <td className="text-center ml-10">{item.PREVPRICE}</td>
              <td className="text-center ml-10">{item.OPEN?.toFixed(2)}</td>
              <td className="text-center ml-10">{item.HIGH?.toFixed(2)}</td>
              <td className="text-center ml-10">{item.LOW?.toFixed(2)}</td>
              <td className={item.LASTCHANGE >= 0 ? 'positive-change' : 'negative-change'}>
                {item.LASTCHANGE >= 0 ? '+' : ''}{item.LASTCHANGE}%
              </td>
              <td className="text-center">{item.LOTSIZE}</td>
              <td className="text-center">{item.SECTYPE}</td>
              <td className="text-center">{item.STATUS}</td>
              <td style={{ fontFamily: 'fantasy' }}>
                {item.VOLUME ? (item.VOLUME / 1000000).toFixed(2) + 'M' : '-'}
              </td>
              <td className="text-center">{item.HIGH && item.LOW ? ((item.HIGH - item.LOW) /item.PREVPRICE * 100).toFixed(2) + '%' : 'N/A'}</td>
            </tr>
              ))}
          </tbody>
          
    </>
    )
}
export default StockTable;