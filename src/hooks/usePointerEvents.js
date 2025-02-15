import { useEffect, useCallback } from 'react';
import { GAIN_RANGE } from '../utils/constants';
import { yToGain } from '../utils/frequency';

export const usePointerEvents = (
  svgRef,
  { selectedBand, isDragging, setIsDragging, updateBandGain }
) => {
  const handlePointerMove = useCallback(
    (e) => {
      if (!isDragging || selectedBand === null) return;

      const svg = svgRef.current;
      const rect = svg.getBoundingClientRect();
      const y = e.clientY - rect.top;
      
      // Calculate the relative position within SVG viewBox
      const viewBoxHeight = 300;
      const relativeY = (y / rect.height) * viewBoxHeight;
      
      updateBandGain(selectedBand, relativeY, viewBoxHeight);
    },
    [isDragging, selectedBand, updateBandGain]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    svg.addEventListener('lostpointercapture', handlePointerUp);
    
    return () => {
      svg.removeEventListener('lostpointercapture', handlePointerUp);
    };
  }, [handlePointerUp]);

  return {
    handlePointerMove,
    handlePointerUp
  };
};

export default usePointerEvents;