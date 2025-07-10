import React from 'react'

const TIMEFRAME_OPTIONS = [
  { value: 10, label: '10 мин' },
  { value: 60, label: '1 час' },
  { value: 24, label: '1 день' },
  { value: 7, label: '1 неделя' },
  { value: 31, label: '1 месяц' },
]

function TimeframeSelector({ timeframe, onChange }) {
  return (
    <select
      className="form-select form-select-sm"
      value={timeframe}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ width: '120px' }}
    >
      {TIMEFRAME_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
export default TimeframeSelector
