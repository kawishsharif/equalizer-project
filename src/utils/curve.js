import { frequencyToX, gainToY } from './frequency';

export const generateCurvePath = (bands, width = 800, height = 300) => {
  const points = bands.map(band => ({
    x: frequencyToX(band.freq, width),
    y: gainToY(band.gain, height),
    width: band.width
  }));

  let path = `M 0 ${height/2}`;
  
  points.forEach((point, i) => {
    if (i === 0) {
      path += ` L ${point.x} ${point.y}`;
    } else {
      const prev = points[i - 1];
      const widthFactor = (point.width + prev.width) / 2;
      
      // Calculate control points with width influence
      const cp1x = prev.x + (point.x - prev.x) / 3 * widthFactor;
      const cp2x = prev.x + (point.x - prev.x) * 2/3 * widthFactor;
      
      path += ` C ${cp1x} ${prev.y} ${cp2x} ${point.y} ${point.x} ${point.y}`;
    }
  });

  path += ` L ${width} ${height/2}`;
  return path;
};

export const calculateFrequencyResponse = (bands, frequency) => {
  let response = 0;
  
  bands.forEach(band => {
    const freqRatio = Math.log2(frequency / band.freq);
    const bandwidthOctaves = band.width;
    const gain = band.gain;
    
    // Calculate band's influence using a bell curve
    const influence = gain * Math.exp(-(freqRatio * freqRatio) / (2 * bandwidthOctaves * bandwidthOctaves));
    response += influence;
  });
  
  return response;
};