import React, {useEffect, useState} from "react";
import '../../styles/PriceCharts.css';
import StockTable from "../Tables/StockTable";
import FuturesTable from "../Tables/FuturesTable";
import CurrencyTable from "../Tables/CurrencyTable";
import {useStockData} from "../../Hooks/useStockData";
import {useFuturesData} from "../../Hooks/useFuturesData";
import {useCurrencyData} from "../../Hooks/useCurrencyData";
import OrderBookWidget from '../Pages/OrderBookWidget';


/*https://iss.moex.com/iss/engines/futures/markets/forts/securities.json список фьючерсов */
/*https://iss.moex.com/iss/engines/stock/markets/shares/securities.json список акций*/
/*https://iss.moex.com/iss/engines/currency/markets/selt/securities.json список валютных пар */
/*https://iss.moex.com/iss/engines/futures/markets/options/securities.json список опционов */

function PriceCharts(){
  const {stock, loading, refetch} = useStockData();
  const {futures, loadingFutures, refetchFutures} = useFuturesData()
  const {currency, loadingCurrency, refetchCurrency} = useCurrencyData();
  const {options, setOptions} = useState([]);
  const [error, setError] = useState(null);
  const [hoveredHeader, setHoveredHeader] = useState(null);
  const [selectedTradeMode, setSelectedTradeMode] = useState("Все режимы");
  const [hoveredHeaderListLevel, setHoveredHeaderListLevel] = useState(null);
  const [selectedListLevel, setSelectedListLevel] = useState("Все эшелоны");
  const [selectedStock, setSelectedStock] = useState(null);
  const [doubleClick, setDoubleClick] = useState(null);
  const [showOrderBook, setShowOrderBook] = useState(false);
  const [widgets, setWidgets] = useState([]);
  const [activeWidget, setActiveWidget] = useState(null);
const [availableInstruments, setAvailableInstruments] = useState([
    { SECID: 'SBER', SHORTNAME: 'Сбербанк', LAST: 280.50, BID: 280.45, ASK: 280.55 },
    { SECID: 'GAZP', SHORTNAME: 'Газпром', LAST: 160.30, BID: 160.25, ASK: 160.35 },
    { SECID: 'YNDX', SHORTNAME: 'Яндекс', LAST: 4200.00, BID: 4190.00, ASK: 4210.00 }
  ]);

  

  const openNewWidget = (instrumentId) => {
    const instrument = availableInstruments.find(i => i.SECID === instrumentId);
    if (!instrument) return;

    setWidgets(prev => [
      ...prev,
      {
        id: Date.now(), // Уникальный ID для каждого стакана
        instrument
      }
    ]);
  };

  const closeWidget = (id) => {
    setWidgets(prev => prev.filter(w => w.id !== id));
  };
  
  const tradeModes = [
    "Все режимы",
    "TQBR",
    "TQTF",
    "SPEQ",
    "TQIF",
    "SMAL"
  ];

  const listLevel = [
    "Все эшелоны",
    "1 эшелон",
    "2 эшелон",
    "3 эшелон"
  ];

    const [activeTab, setActiveTab] = useState("Акции");
    console.log("Данные акций:", stock); // Проверка данных
    console.log("Данные фьючерсов:", futures);
    console.log("Данные валюты:", currency);


if (loading) return <div className="loading loading-stocks">Загружаем рынки ценных бумаг...</div>;


    return(
<>       
<nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
  <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Название инструмента</a>
  <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <input className="form-control form-control-dark w-100" type="text" placeholder="Поиск" aria-label="Search"/>
  <ul className="navbar-nav px-3">
    <li className="nav-item text-nowrap">
      <a className="nav-link" href="#">Найти</a>
    </li>
  </ul>
</nav>

<div className="container-fluid">
  <div className="row">
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active link-secondary ff-text" aria-current="page" href="#">
              <span data-feather="home"></span>
              Фондовый рынок
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link link-secondary" href="#">
              <span data-feather="file"></span>
              Срочный рынок
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link link-secondary" href="#">
              <span data-feather="shopping-cart"></span>
              Сырьевой рынок
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link link-secondary" href="#">
              <span data-feather="users"></span>
              Валюта
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link link-secondary" href="#">
              <span data-feather="users"></span>
              Опционы
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link link-secondary" href="#">
              <span data-feather="bar-chart-2"></span>
              Криптовалюта
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link link-secondary" href="#">
              <span data-feather="layers"></span>
              Индексы
            </a>
          </li>
        </ul>

        
      </div>
    </nav>

    <main className="col-md-12 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">График цены</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group mr-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar"></span>
            This week
          </button>
        </div>
      </div>

      <canvas className="my-4 w-100 charts-img" id="myChart" width="900" height="380"></canvas>

      <h2>{activeTab} 
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}><button type="button" className="btn btn-sm btn-outline-secondary" hidden>Добавить инструмент</button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setActiveTab("Акции")}>Акции</button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setActiveTab("Фьючерсы")}>Фьючерсы</button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setActiveTab("Валюта")}>Валюта</button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setActiveTab("Валюта")}>Опционы</button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setActiveTab("Криптовалюта")}>Криптовалюта</button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setActiveTab("Избранное")}>Избранное</button>
        </div>
      </h2>
      {showOrderBook && selectedStock &&(
            <div style={{flex: 1}}>
              <OrderBookWidget 
                stockInfo={selectedStock}
                onClose={() => setShowOrderBook(false)}
                />
            </div>
          )}
      <div className="stock-table-container">
        <table className="stock-table" >
          {activeTab === "Акции" && 
          <StockTable
          stock={stock}
          loading={loading}
          doubleClick={doubleClick}
          selectedTradeMode={selectedTradeMode}
          selectedListLevel={selectedListLevel}
          tradeModes={tradeModes}
          listLevel={listLevel}
          setSelectedTradeMode={setSelectedTradeMode}
          setSelectedListLevel={setSelectedListLevel}
          hoveredHeader={hoveredHeader}
          setHoveredHeader={setHoveredHeader}
          hoveredHeaderListLevel={hoveredHeaderListLevel}
          setHoveredHeaderListLevel={setHoveredHeaderListLevel}
          />
          }
          {activeTab === "Фьючерсы" && 
          <FuturesTable
          futures={futures}
          loadingFutures={loadingFutures}
          errorFutures={error} 
          />
          }
          {activeTab === "Валюта" && 
          <CurrencyTable 
            currency={currency}
            loadingCurrency={loadingCurrency}
            errorCurrency={error}
          />
          }
          {showOrderBook && selectedStock && (
        <div>
          {widgets.map(widget => (
        <OrderBookWidget
          key={widget.id}
          stockInfo={widget.stockInfo}
          onClose={() => closeWidget(widget.id)}
          onDoubleClick={openNewWidget}
          isActive={activeWidget === widget.id}
        />
      ))}
        </div>
      )}
        </table>
        <table>
        <thead>
          <th>Объем</th>
          <th>Цена</th>
        </thead>
        <tbody>
          <td>45632</td>
          <td>126.56</td>
        </tbody>
      </table>
      </div>
      
    </main>
    
  </div>
</div>
</>
    );
  }
export default PriceCharts;