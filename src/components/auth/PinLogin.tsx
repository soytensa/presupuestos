'use client';

import React, { useState, useEffect } from 'react';

/**
 * PinLogin Component
 * Estética Bento OLED: Botones grandes, bordes +30px, feedback táctil.
 */

interface PinLoginProps {
  onSuccess: () => void;
  correctPin: string;
}

export function PinLogin({ onSuccess, correctPin }: PinLoginProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleNumberClick = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      
      if (newPin.length === 4) {
        if (newPin === correctPin) {
          onSuccess();
        } else {
          setError(true);
          setTimeout(() => {
            setPin('');
            setError(false);
          }, 500);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-black text-[#39FF14] tracking-tighter uppercase mb-2">
          presupuestos
        </h1>
        <p className="text-gray-500 text-xs uppercase tracking-widest font-medium">
          Acceso Wilson Torrez
        </p>
      </div>

      {/* Pin Indicators */}
      <div className="flex gap-4 mb-12">
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
              pin.length > i 
                ? 'bg-[#39FF14] border-[#39FF14] scale-125' 
                : 'border-gray-800 scale-100'
            } ${error ? 'bg-red-500 border-red-500 animate-bounce' : ''}`}
          />
        ))}
      </div>

      {/* Number Pad (Bento Style) */}
      <div className="grid grid-cols-3 gap-4 max-w-[320px] w-full">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num)}
            className="aspect-square flex items-center justify-center text-2xl font-bold bg-gray-900 border border-gray-800 rounded-[30px] active:bg-[#39FF14] active:text-black active:scale-95 transition-all"
          >
            {num}
          </button>
        ))}
        <div /> {/* Empty space */}
        <button
          onClick={() => handleNumberClick('0')}
          className="aspect-square flex items-center justify-center text-2xl font-bold bg-gray-900 border border-gray-800 rounded-[30px] active:bg-[#39FF14] active:text-black active:scale-95 transition-all"
        >
          0
        </button>
        <button
          onClick={handleDelete}
          className="aspect-square flex items-center justify-center text-sm font-bold bg-gray-900/50 border border-gray-800 text-gray-400 rounded-[30px] active:bg-red-500/20 active:text-red-500 transition-all"
        >
          BORRAR
        </button>
      </div>

      <p className="mt-12 text-[10px] text-gray-700 uppercase tracking-widest">
        Sistema de Seguridad v0.1.0
      </p>
    </div>
  );
}
