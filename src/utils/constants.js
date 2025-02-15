// src/utils/constants.js
export const FREQUENCY_BANDS = [
    { freq: 60, label: '60 Hz' },
    { freq: 170, label: '170 Hz' },
    { freq: 310, label: '310 Hz' },
    { freq: 600, label: '600 Hz' },
    { freq: 1000, label: '1 kHz' },
    { freq: 3000, label: '3 kHz' },
    { freq: 6000, label: '6 kHz' },
    { freq: 12000, label: '12 kHz' },
    { freq: 14000, label: '14 kHz' },
    { freq: 16000, label: '16 kHz' }
  ];
  
  export const GAIN_RANGE = {
    MIN: -24,
    MAX: 24,
    STEP: 0.5
  };
  
  export const WIDTH_RANGE = {
    MIN: 0.1,
    MAX: 2.0,
    STEP: 0.1
  };