import React, {useEffect, useState, useRef} from "react";
import '../../styles/PriceCharts.css';
import StockTable from "../Tables/StockTable";
import FuturesTable from "../Tables/FuturesTable";
import CurrencyTable from "../Tables/CurrencyTable";
import {useStockData} from "../../Hooks/useStockData";
import {useFuturesData} from "../../Hooks/useFuturesData";
import {useCurrencyData} from "../../Hooks/useCurrencyData";
import OrderBookWidget from '../Pages/OrderBookWidget';
import ChartComponent from "../Services/ChartComponent";
import mmvbApi from "../Services/mmvbApi";


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
  const [selectedStockForChart, setSelectedStockForChart] = useState(null);
  const [candleData, setCandleData] = useState([]);
  const [loadingChart, setLoadingChart] = useState(false);
  const chartContainerRef = useRef(null);
  const chart = useRef(null);
  const candleSeries = useRef(null);
  const [selectedInterval, setSelectedInterval] = useState(24);


const fetchCandleData = async (security, interval = selectedInterval) => {
  setLoadingChart(true);
  try {
    const today = new Date();
    const fromDate = new Date();
    
    // Установка периода в зависимости от таймфрейма
    if ([10, 60].includes(interval)) {
      fromDate.setDate(today.getDate() - 1); // Для минутных данных берем 1 день
    } else if (interval === 24) {
      fromDate.setMonth(today.getMonth() - 1);
    } else if (interval === 7) {
      fromDate.setMonth(today.getMonth() - 6);
    } else if (interval === 31) {
      fromDate.setFullYear(today.getFullYear() - 2);
    }

    const response = await mmvbApi.getCandles(
      security,
      fromDate.toISOString().split('T')[0],
      today.toISOString().split('T')[0],
      interval
    );

    if (!response.candles?.data?.length) {
      throw new Error(`Нет данных для ${security} за выбранный период`);
    }

    // Преобразование данных с особой обработкой времени для минутных интервалов
    const candles = response.candles.data.map(item => {
      const columns = response.candles.columns;
      const candle = {};
      columns.forEach((col, index) => {
        candle[col] = item[index];
      });

      // Особое форматирование времени для минутных данных
      let timestamp;
      if ([10, 60].includes(interval)) {
        // Для минутных интервалов используем поле 'begin' и преобразуем в формат 'YYYY-MM-DD HH:MM:SS'
        timestamp = candle.begin ? new Date(candle.begin) : new Date();
      } else {
        // Для дневных и выше интервалов используем только дату
        timestamp = candle.end ? new Date(candle.end) : new Date();
      }

      // Проверка всех обязательных полей
      if (!candle.open || !candle.high || !candle.low || !candle.close) {
        console.warn('Пропущена свеча из-за отсутствия данных:', candle);
        return null;
      }

      return {
        time: [10, 60].includes(interval) 
          ? timestamp.getTime() / 1000 // Для минутных - timestamp в секундах
          : timestamp.toISOString().split('T')[0], // Для дневных+ - только дата
        open: parseFloat(candle.open),
        high: parseFloat(candle.high),
        low: parseFloat(candle.low),
        close: parseFloat(candle.close),
        volume: candle.volume ? parseFloat(candle.volume) : 0
      };
    }).filter(Boolean);

    if (candles.length === 0) {
      throw new Error('Нет корректных данных для отображения');
    }

    setCandleData(candles);
    setError(null);

  } catch (error) {
    console.error('Ошибка загрузки:', error);
    setError(error.message);
    setCandleData([]);
  } finally {
    setLoadingChart(false);
  }
};

// Обновим обработчик клика по строке таблицы
const handleRowClick = (stock) => {
  setSelectedStock(stock);
  setSelectedStockForChart(stock.SECID);
  fetchCandleData(stock.SECID, selectedInterval);
  
};

useEffect(() => {
  if (selectedStockForChart) {
    fetchCandleData(selectedStockForChart, selectedInterval);
  }
}, [selectedInterval]);

useEffect(() => {
  if (!chart.current || !candleSeries.current) return;

  // Для минутных таймфреймов меняем отображение времени
  if ([10, 60].includes(selectedInterval)) {
    chart.current.applyOptions({
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time) => {
          const date = new Date(time * 1000);
          return date.toLocaleTimeString();
        }
      }
    });
  } else {
    chart.current.applyOptions({
      timeScale: {
        timeVisible: true,
        secondsVisible: false
      }
    });
  }
}, [selectedInterval]); 

const onRowDoubleClick = (stock) => {
  setShowOrderBook(true);
};
  

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
      <div className="timeframe-controls">
  <div className="btn-group btn-group-sm" role="group">
    <button 
      type="button" 
      className={`btn btn-outline-secondary ${selectedInterval === 10 ? 'active' : ''}`}
      onClick={() => setSelectedInterval(10)}
    >
      10 мин
    </button>
    <button 
      type="button" 
      className={`btn btn-outline-secondary ${selectedInterval === 60 ? 'active' : ''}`}
      onClick={() => setSelectedInterval(60)}
    >
      1 час
    </button>
    <button 
      type="button" 
      className={`btn btn-outline-secondary ${selectedInterval === 24 ? 'active' : ''}`}
      onClick={() => setSelectedInterval(24)}
    >
      1 день
    </button>
    <button 
      type="button" 
      className={`btn btn-outline-secondary ${selectedInterval === 7 ? 'active' : ''}`}
      onClick={() => setSelectedInterval(7)}
    >
      1 неделя
    </button>
    <button 
      type="button" 
      className={`btn btn-outline-secondary ${selectedInterval === 31 ? 'active' : ''}`}
      onClick={() => setSelectedInterval(31)}
    >
      1 месяц
    </button>
  </div>
</div>

      <div className="chart-section  style={{ width: '100%', height: '400px' }}">
  

  {/* Свечной график */}
  {selectedStockForChart && (
    <div className="candle-chart-container">
      <h4>
        {selectedStock.SHORTNAME} ({selectedStockForChart})
        {loadingChart && <span className="text-muted ml-2">Загрузка...</span>}
      </h4>
      
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : candleData.length > 0 ? (
        <ChartComponent 
          candleData={candleData} 
          key={selectedStockForChart} // Принудительное обновление при смене тикера
        />
      ) : (
        <div className="alert alert-info">Нет данных для отображения</div>
      )}
    </div>
  )}
  
      </div>
      
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
          onRowDoubleClick={onRowDoubleClick}
          onRowClick = {handleRowClick}
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