import React, { useState, useRef, useEffect } from 'react';

const OrderBookWidget = ({ stockInfo, onClose, onDoubleClick}) => {
  // Состояния компонента
  const [width, setWidth] = useState(320);
  const [height, setHeight] = useState(500);
  const [isResizing, setIsResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });
  const [selectedPrice, setSelectedPrice] = useState(null);
  const containerRef = useRef(null);
  const lastClickTime = useRef(0);
  const [position, setPosition] = useState({ 
    x: Math.random() * 200 + 20, 
    y: Math.random() * 200 + 20 
  });
  const [isDragging, setIsDragging] = useState(false);

  // Стиль для элемента изменения размера
  const resizerStyle = {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '20px',
    height: '20px',
    background: '#2a2a3e',
    cursor: 'nwse-resize',
    borderTopLeftRadius: '5px'
  };

  // Обработчик двойного клика
  const handleClick = (e) => {
    const now = Date.now();
    if (now - lastClickTime.current < 300) { // 300ms для двойного клика
      handleDoubleClick();
      lastClickTime.current = 0;
    } else {
      lastClickTime.current = now;
    }
  };

  const handleDoubleClick = () => {
    console.log('Widget double clicked:', stockInfo?.SECID); // Для отладки
    if (onDoubleClick && stockInfo?.SECID) {
      onDoubleClick(stockInfo.SECID);
    }
  };
  // Обработчики изменения размера
  const startResize = (e) => {
    setIsResizing(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartSize({ width, height });
    e.preventDefault();
  };

  const handleResize = (e) => {
    if (!isResizing) return;
    
    const newWidth = Math.max(250, startSize.width + (e.clientX - startPos.x));
    const newHeight = Math.max(300, startSize.height + (e.clientY - startPos.y));
    
    setWidth(newWidth);
    setHeight(newHeight);
  };

  const stopResize = () => {
    setIsResizing(false);
  };

  // Обработчики перетаскивания
  const handleMouseDown = (e) => {
    setIsDragging(true);
    const absPos = {
      x: window.screenX + e.clientX,
      y: window.screenY + e.clientY
    };
    setStartPos({
      x: absPos.x - position.x,
      y: absPos.y - position.y
    });
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const absPos = {
      x: window.screenX + e.clientX,
      y: window.screenY + e.clientY
    };
    setPosition({
      x: absPos.x - startPos.x,
      y: absPos.y - startPos.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  // Эффекты
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', stopResize);
      return () => {
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', stopResize);
      };
    }
  }, [isResizing]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${width}px`,
        height: `${height}px`,
        transition: 'all 0.3s ease',
        fontFamily: "'Roboto', sans-serif",
        background: '#1a1a2e',
        borderRadius: '10px',
        overflow: 'hidden',
        color: '#e6e6e6',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        border: '1px solid #2a2a3e',
        zIndex: 3000,
        cursor: 'grab'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
    >
      {/* Заголовок */}
      <div style={{ 
        padding: '10px',
        background: '#2a2a3e',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          {stockInfo?.SECID} - {stockInfo?.SHORTNAME}
        </div>
        <button 
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '18px'
          }}
        >
          ×
        </button>
      </div>

      {/* Тело стакана */}
      <div style={{ 
        height: `calc(100% - 120px)`,
        overflowY: 'auto',
        padding: '10px'
      }}>
        <div style={{ textAlign: 'center', color: '#888' }}>
          Стакан для {stockInfo?.SECID}
        </div>
      </div>

      {/* Элемент изменения размера */}
      <div
        style={resizerStyle}
        onMouseDown={startResize}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M20 20L0 20L20 0L20 20Z" fill="#e6e6e6"/>
        </svg>
      </div>
    </div>
  );
};

export default OrderBookWidget;