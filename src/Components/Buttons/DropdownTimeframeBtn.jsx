/*import React from "react";
function DropdownTimeframeBtn(){
    return(
        <>
            <div className="dropdown me-2" style={{ display: 'inline-block' }}>
  <button 
    className="btn btn-secondary dropdown-toggle"
    type="button"
    onClick={() => setIsTimeframeDropdownOpen(!isTimeframeDropdownOpen)}
    disabled={!selectedInstrument}
  >
    {TIMEFRAME_OPTIONS.find(t => t.value === timeframe)?.label || 'Выберите таймфрейм'}
  </button>
  <div 
    className={`dropdown-menu ${isTimeframeDropdownOpen ? 'show' : ''}`}
    style={{ minWidth: 'auto' }}
  >
    {TIMEFRAME_OPTIONS.map(option => (
      <button
        key={option.value}
        className="dropdown-item"
        onClick={() => {
          setTimeframe(option.value);
          setIsTimeframeDropdownOpen(false);
        }}
      >
        {option.label}
      </button>
    ))}
  </div>
</div>
        </>
    )
}
export default DropdownTimeframeBtn;*/