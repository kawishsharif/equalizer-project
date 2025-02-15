import React from 'react';
import './styles/globals.css';
import InteractiveEqualizer from './components/equalizer/InteractiveEqualizer';

function App() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Interactive Equalizer
        </h1>
        <p className="text-gray-600 mt-2">
          Drag the points to adjust gain, use sliders to control band width
        </p>
      </header>
      <main>
        <InteractiveEqualizer />
      </main>
    </div>
  );
}

export default App;