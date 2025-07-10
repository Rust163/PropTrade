import React, { useEffect, useState } from 'react'
import ChartComponent from './ChartComponent'
import mmvbApi from './mmvbApi' // Убедитесь, что путь правильный

function ChartWindow({ stock, timeframe, onTimeframeChange }) {
  const [candleData, setCandleData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Функция для расчета начальной даты в зависимости от таймфрейма
  const getStartDate = (timeframe) => {
    const endDate = new Date()
    const startDate = new Date()

    switch (timeframe) {
      case 1: // 1 минута
      case 5: // 5 минут
      case 10: // 10 минут
      case 15: // 15 минут
      case 30: // 30 минут
      case 60: // 1 час
        startDate.setMonth(endDate.getMonth() - 3) // 3 месяца истории
        break
      case 24: // 1 день
        startDate.setFullYear(endDate.getFullYear() - 5) // 5 лет
        break
      case 7: // 1 неделя
        startDate.setFullYear(endDate.getFullYear() - 10) // 10 лет
        break
      case 31: // 1 месяц
        startDate.setFullYear(endDate.getFullYear() - 20) // 20 лет
        break
      default:
        startDate.setFullYear(endDate.getFullYear() - 1) // По умолчанию 1 год
    }

    return startDate
  }

  useEffect(() => {
    const fetchCandleData = async () => {
      try {
        setIsLoading(true)
        const toDate = new Date()
        const fromDate = getStartDate(timeframe)

        const response = await mmvbApi.getCandles(
          stock.SECID,
          fromDate.toISOString().split('T')[0],
          toDate.toISOString().split('T')[0],
          timeframe
        )

        setCandleData(processCandleData(response))
      } catch (error) {
        console.error('Ошибка загрузки данных:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCandleData()
  }, [stock.SECID, timeframe])

  // Функция обработки данных (добавьте в тот же файл)
  const processCandleData = (response) => {
    if (!response.candles?.data?.length) return []

    return response.candles.data
      .map((item) => {
        const columns = response.candles.columns
        const candle = {}
        columns.forEach((col, index) => {
          candle[col] = item[index]
        })

        const timestamp = candle.begin ? new Date(candle.begin) : new Date()

        return {
          time: [1, 5, 10, 15, 30, 60].includes(timeframe)
            ? timestamp.getTime() / 1000
            : timestamp.toISOString().split('T')[0],
          open: parseFloat(candle.open),
          high: parseFloat(candle.high),
          low: parseFloat(candle.low),
          close: parseFloat(candle.close),
          volume: candle.volume ? parseFloat(candle.volume) : 0,
        }
      })
      .filter(Boolean)
  }

  return (
    <div className="chart-window-container">
      <h2>
        {stock.SHORTNAME} ({stock.SECID})
      </h2>
      {isLoading ? (
        <div>Загрузка исторических данных...</div>
      ) : (
        <ChartComponent
          candleData={candleData}
          timeframe={timeframe}
          key={`${stock.SECID}-${timeframe}`}
        />
      )}
    </div>
  )
}

export default ChartWindow
