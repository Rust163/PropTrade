import React from 'react'
import PropTypes from 'prop-types'

function DropdownTimeframeBtn({
  selectedInstrument,
  timeframe,
  setTimeframe,
  isOpen,
  setIsOpen,
  options,
}) {
  return (
    <div className="dropdown me-2" style={{ display: 'inline-block' }}>
      <button
        className="btn btn-secondary dropdown-toggle btn-sm"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={!selectedInstrument}
      >
        {options.find((t) => t.value === timeframe)?.label ||
          'Выберите таймфрейм'}
      </button>
      <div
        className={`dropdown-menu ${isOpen ? 'show' : ''}`}
        style={{ minWidth: 'auto' }}
      >
        {options.map((option) => (
          <button
            key={option.value}
            className="dropdown-item"
            onClick={() => {
              setTimeframe(option.value)
              setIsOpen(false)
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

DropdownTimeframeBtn.propTypes = {
  selectedInstrument: PropTypes.string,
  timeframe: PropTypes.number.isRequired,
  setTimeframe: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default DropdownTimeframeBtn
