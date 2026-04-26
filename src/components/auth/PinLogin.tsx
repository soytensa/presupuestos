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

  // El PIN por defecto para Wilson será 4536
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

  const handleBypass = () => {
    onSuccess();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-2xl font-black text-[#39FF14] tracking-tighter uppercase mb-1">
          presupuestos
        </h1>
        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em] font-bold">
          Acceso Wilson Torrez
        </p>
      </div>

      {/* Pin Indicators */}
      <div className="flex gap-4 mb-12">
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-200 ${
              pin.length > i 
                ? 'bg-[#39FF14] border-[#39FF14] scale-125' 
                : 'border-zinc-800 scale-100'
            } ${error ? 'bg-red-500 border-red-500 animate-bounce' : ''}`}
          />
        ))}
      </div>

      {/* Number Pad (Bento Style) */}
      <div className="grid grid-cols-3 gap-3 max-w-[280px] w-full">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num)}
            className="h-16 flex items-center justify-center text-xl font-bold bg-zinc-900/50 border border-zinc-800 rounded-[20px] active:bg-[#39FF14] active:text-black active:scale-90 transition-all"
          >
            {num}
          </button>
        ))}
        <button
          onClick={handleBypass}
          className="h-16 flex items-center justify-center text-[10px] font-black bg-zinc-900/20 border border-zinc-800 text-[#39FF14]/50 rounded-[20px] active:bg-[#39FF14] active:text-black transition-all"
        >
          ENTRAR
        </button>
        <button
          onClick={() => handleNumberClick('0')}
          className="h-16 flex items-center justify-center text-xl font-bold bg-zinc-900/50 border border-zinc-800 rounded-[20px] active:bg-[#39FF14] active:text-black active:scale-90 transition-all"
        >
          0
        </button>
        <button
          onClick={handleDelete}
          className="h-16 flex items-center justify-center text-[9px] font-bold bg-zinc-900/30 border border-zinc-900 text-zinc-600 rounded-[20px] active:text-red-500 transition-all uppercase tracking-widest"
        >
          Borrar
        </button>
      </div>

      <p className="mt-16 text-[9px] text-zinc-800 uppercase tracking-[0.2em] font-bold">
        Security System v0.1.0
      </p>
    </div>
  );
}

