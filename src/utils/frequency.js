// src/utils/frequency.js
export const frequencyToX = (freq, width = 800) => {
    const minFreq = Math.log10(20);
    const maxFreq = Math.log10(20000);
    const x = (Math.log10(freq) - minFreq) / (maxFreq - minFreq);
    return x * width;
  };
  
  export const xToFrequency = (x, width = 800) => {
    const minFreq = Math.log10(20);
    const maxFreq = Math.log10(20000);
    const freq = Math.pow(10, minFreq + (x / width) * (maxFreq - minFreq));
    return Math.round(freq);
  };
  
  export const gainToY = (gain, height = 300) => {
    const centerY = height / 2;
    const scale = height / 48; // -24dB to +24dB range
    return centerY - (gain * scale);
  };
  
  export const yToGain = (y, height = 300) => {
    const centerY = height / 2;
    const scale = height / 48;
    return -((y - centerY) / scale);
  };