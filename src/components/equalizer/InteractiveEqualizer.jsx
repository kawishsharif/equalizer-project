import React, { useState, useRef, useEffect } from 'react';
import Slider from '../ui/Slider';  // Updated import path
import { frequencyToX, gainToY, xToFrequency, yToGain } from '../../utils/frequency';
import { FREQUENCY_BANDS, GAIN_RANGE, WIDTH_RANGE } from '../../utils/constants';

const InteractiveEqualizer = () => {
  const [bands, setBands] = useState(
    FREQUENCY_BANDS.map(band => ({
      ...band,
      gain: 0,
      width: 1
    }))
  );

  const [selectedBand, setSelectedBand] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef(null);

  // Generate the curve path
  const generatePath = () => {
    const points = bands.map(band => ({
      x: frequencyToX(band.freq),
      y: gainToY(band.gain)
    }));

    let path = `M 0 150`;
    points.forEach((point, i) => {
      if (i === 0) {
        path += ` L ${point.x} ${point.y}`;
      } else {
        const prev = points[i - 1];
        const cp1x = prev.x + (point.x - prev.x) / 3;
        const cp2x = prev.x + (point.x - prev.x) * 2/3;
        path += ` C ${cp1x} ${prev.y} ${cp2x} ${point.y} ${point.x} ${point.y}`;
      }
    });
    path += ` L 800 150`;
    return path;
  };

  // Handle mouse/touch events
  const handlePointerDown = (index) => {
    setSelectedBand(index);
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || selectedBand === null) return;

    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const newGain = Math.max(GAIN_RANGE.MIN, 
                            Math.min(GAIN_RANGE.MAX, 
                                   yToGain(y)));
    
    setBands(bands.map((band, i) => 
      i === selectedBand ? { ...band, gain: newGain } : band
    ));
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setSelectedBand(null);
  };

  // Update width for selected band
  const updateWidth = (newWidth, index) => {
    setBands(bands.map((band, i) => 
      i === index ? { ...band, width: newWidth[0] } : band
    ));
  };

  useEffect(() => {
    const svg = svgRef.current;
    svg.addEventListener('lostpointercapture', handlePointerUp);
    return () => {
      svg.removeEventListener('lostpointercapture', handlePointerUp);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <svg 
          ref={svgRef}
          width="800" 
          height="300" 
          className="w-full" 
          viewBox="0 0 800 300"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{ touchAction: 'none' }}
        >
          {/* Grid lines */}
          {[-24, -18, -12, -6, 0, 6, 12, 18, 24].map(db => (
            <g key={db}>
              <line 
                x1="0" 
                y1={gainToY(db)} 
                x2="800" 
                y2={gainToY(db)} 
                stroke="#eee" 
                strokeWidth="1"
              />
              <text 
                x="-5" 
                y={gainToY(db)} 
                textAnchor="end" 
                alignmentBaseline="middle" 
                className="text-xs fill-gray-500"
              >
                {db}dB
              </text>
            </g>
          ))}
          
          {/* Frequency labels */}
          {[20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000].map(freq => (
            <text 
              key={freq} 
              x={frequencyToX(freq)} 
              y="280" 
              textAnchor="middle" 
              className="text-xs fill-gray-500"
            >
              {freq >= 1000 ? `${freq/1000}k` : freq}
            </text>
          ))}

          {/* EQ Curve */}
          <path
            d={generatePath()}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
          />

          {/* Draggable points */}
          {bands.map((band, i) => (
            <circle
              key={i}
              cx={frequencyToX(band.freq)}
              cy={gainToY(band.gain)}
              r="6"
              fill={selectedBand === i ? '#2563eb' : '#3b82f6'}
              stroke="white"
              strokeWidth="2"
              style={{ cursor: 'pointer' }}
              onPointerDown={() => handlePointerDown(i)}
            />
          ))}
        </svg>
      </div>

      {/* Band controls */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {bands.map((band, i) => (
          <div key={i} className="p-3 bg-gray-50 rounded">
            <div className="text-sm font-medium mb-2">
              {band.label}
            </div>
            <div className="mb-2">
              <label className="text-xs text-gray-500">Width</label>
              <Slider
                value={[band.width]}
                min={WIDTH_RANGE.MIN}
                max={WIDTH_RANGE.MAX}
                step={WIDTH_RANGE.STEP}
                onValueChange={(value) => updateWidth(value, i)}
              />
            </div>
            <div className="text-xs text-gray-500">
              Gain: {band.gain.toFixed(1)}dB
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveEqualizer;