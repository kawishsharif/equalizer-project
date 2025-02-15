import React, { useState, useRef, useEffect } from 'react';

const Slider = ({ value, onValueChange, min, max, step = 1 }) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const getPercentage = (value) => {
    return ((value - min) / (max - min)) * 100;
  };

  const getValueFromPosition = (position) => {
    const percentage = position;
    const value = ((max - min) * percentage) / 100 + min;
    const steppedValue = Math.round(value / step) * step;
    return Math.min(max, Math.max(min, steppedValue));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateValue(e);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    updateValue(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateValue = (e) => {
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const position = ((e.clientX - rect.left) / rect.width) * 100;
    const newValue = getValueFromPosition(position);
    onValueChange([newValue]);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={sliderRef}
      className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
      onMouseDown={handleMouseDown}
    >
      <div className="bg-gray-200 relative w-full rounded-full h-1">
        <div
          className="absolute bg-blue-500 rounded-full h-full"
          style={{ width: `${getPercentage(value[0])}%` }}
        />
        <div
          className="absolute w-4 h-4 bg-white shadow-lg rounded-full -mt-1.5 transform -translate-x-1/2"
          style={{ left: `${getPercentage(value[0])}%` }}
        />
      </div>
    </div>
  );
};

export default Slider;