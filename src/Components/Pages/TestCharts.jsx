
import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';

function TestCharts() {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для загрузки данных с API Московской биржи
  const fetchStockData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://iss.moex.com/iss/engines/stock/markets/shares/securities/GAZP/candles.json?from=2024-01-01&till=2024-03-01&interval=24'
      );
      const data = await response.json();
      
      // Преобразуем данные в нужный формат
      return data.candles.data.map(item => ({
        time: item[0].split(' ')[0], // Оставляем только дату без времени
        open: item[1],
        high: item[2],
        low: item[3],
        close: item[4],
        volume: item[5]
      }));
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 1. Инициализация графика
    if (!chartContainerRef.current) return;

    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        backgroundColor: '#ffffff',
        textColor: '#333',
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: '#eee' },
      },
    });

    // 2. Добавляем свечной ряд
    candleSeriesRef.current = chartRef.current.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    // 3. Загружаем и устанавливаем реальные данные
    fetchStockData().then(data => {
      if (data.length > 0) {
        candleSeriesRef.current.setData(data);
      }
    });

    // 4. Добавляем объемы (дополнительный график внизу)
    const volumeSeries = chartRef.current.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '', // Отдельная шкала
      scaleMargins: {
        top: 0.8, // Оставляем 20% сверху
        bottom: 0,
      },
    });

    // 5. Очистка при размонтировании
    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, []);

  if (loading) return <div>Загрузка данных...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>График акций Газпрома (GAZP)</h2>
      <p>Данные с Московской биржи за январь-март 2024</p>
      
      <div
        ref={chartContainerRef}
        style={{
          width: '100%',
          height: '500px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          marginTop: '20px'
        }}
      />
      
      <div style={{ marginTop: '20px', color: '#666' }}>
        <small>Данные обновляются с задержкой 15 минут</small>
      </div>
    </div>
  );
}
export default TestCharts;