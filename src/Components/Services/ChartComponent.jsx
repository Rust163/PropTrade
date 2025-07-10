import React, { useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts'

function ChartComponent({ candleData }) {
  const chartContainerRef = useRef(null)
  const chart = useRef(null)
  const candleSeries = useRef(null)

  useEffect(() => {
    // Инициализация графика
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        backgroundColor: '#fff',
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#eee' },
        horzLines: { color: '#eee' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    })

    candleSeries.current = chart.current.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    })

    // Обработка ресайза
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length === 0) return
      const { width, height } = entries[0].contentRect
      chart.current.applyOptions({ width, height: Math.max(height, 300) })
    })

    resizeObserver.observe(chartContainerRef.current)

    return () => {
      resizeObserver.disconnect()
      if (chart.current) {
        chart.current.remove()
      }
    }
  }, [])

  /*useEffect(() => {
  if (!candleSeries.current || !candleData.length) return;
  
  candleSeries.current.setData(candleData.map(item => ({
    time: item.time,
    open: item.open,
    high: item.high,
    low: item.low,
    close: item.close
  })));
  
  chart.current.timeScale().fitContent();
}, [candleData]);*/

  useEffect(() => {
    if (!candleSeries.current || !candleData.length) return

    try {
      // Преобразуем данные в нужный формат в зависимости от типа времени
      const formattedData = candleData.map((item) => {
        // Если время в секундах (минутные таймфреймы)
        if (typeof item.time === 'number') {
          return {
            time: item.time,
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
          }
        }
        // Если время в формате YYYY-MM-DD (дневные+ таймфреймы)
        return {
          time: item.time,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }
      })

      candleSeries.current.setData(formattedData)
      chart.current.timeScale().fitContent()
    } catch (error) {
      console.error('Ошибка обновления графика:', error)
    }
  }, [candleData])

  return (
    <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />
  )
}

export default ChartComponent
