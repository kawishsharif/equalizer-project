import { useState, useCallback } from 'react';
import { FREQUENCY_BANDS } from '../utils/constants';
import { yToGain } from '../utils/frequency';

export const useEqualizerState = () => {
  const [bands, setBands] = useState(
    FREQUENCY_BANDS.map(band => ({
      ...band,
      gain: 0,
      width: 1
    }))
  );

  const [selectedBand, setSelectedBand] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const updateBandGain = useCallback((index, y, height) => {
    const newGain = yToGain(y, height);
    setBands(prevBands => 
      prevBands.map((band, i) => 
        i === index ? { ...band, gain: newGain } : band
      )
    );
  }, []);

  const updateBandWidth = useCallback((index, width) => {
    setBands(prevBands => 
      prevBands.map((band, i) => 
        i === index ? { ...band, width } : band
      )
    );
  }, []);

  const resetBands = useCallback(() => {
    setBands(FREQUENCY_BANDS.map(band => ({
      ...band,
      gain: 0,
      width: 1
    })));
  }, []);

  return {
    bands,
    selectedBand,
    isDragging,
    setSelectedBand,
    setIsDragging,
    updateBandGain,
    updateBandWidth,
    resetBands
  };
};

export default useEqualizerState;