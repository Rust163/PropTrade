import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChartComponent from './ChartComponent'
import mmvbApi from './mmvbApi'

function ChartPopup() {
  const { secid } = useParams()
  const [candleData, setCandleData] = useState([])
  const [timeframe, setTimeframe] = useState(24) // По умолчанию дневной таймфрейм

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date()
      const fromDate = new Date()
      fromDate.setMonth(today.getMonth() - 1) // 1 месяц истории

      const response = await mmvbApi.getCandles(
        secid,
        fromDate.toISOString().split('T')[0],
        today.toISOString().split('T')[0],
        timeframe
      )

      // Преобразование данных как в PriceCharts.jsx
      const candles = response.candles.data.map(/* ... */)
      setCandleData(candles)
    }

    fetchData()
  }, [secid, timeframe])

  return (
    <div style={{ padding: '20px', width: '100vw', height: '100vh' }}>
      <h2>График {secid}</h2>
      <div style={{ height: 'calc(100vh - 100px)' }}>
        <ChartComponent candleData={candleData} />
      </div>
    </div>
  )
}

export default ChartPopup
