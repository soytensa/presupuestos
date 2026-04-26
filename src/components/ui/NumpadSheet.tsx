import React from 'react';
import { Check, Delete } from 'lucide-react';

interface NumpadSheetProps {
  isOpen: boolean;
  value: string;
  onClose: () => void;
  onChange: (val: string) => void;
  title: string;
}

export function NumpadSheet({ isOpen, value, onClose, onChange, title }: NumpadSheetProps) {
  if (!isOpen) return null;

  const handleNumber = (num: string) => {
    // Usamos el punto internamente para que JavaScript pueda hacer los cálculos
    const inputNum = num === ',' ? '.' : num;

    if (value === '0') {
      onChange(inputNum === '.' ? '0.' : inputNum);
    } else {
      // Evitar múltiples comas
      if (inputNum === '.' && value.includes('.')) return;
      
      // Límite máximo de 2 decimales
      if (value.includes('.') && inputNum !== '.') {
        const decimals = value.split('.')[1];
        if (decimals && decimals.length >= 2) return;
      }

      onChange(value + inputNum);
    }
  };

  const handleDelete = () => {
    if (value.length <= 1) {
      onChange('0');
    } else {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-900 rounded-t-[32px] p-6 pb-12 z-50 animate-in slide-in-from-bottom-full duration-300 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        
        <div className="flex justify-between items-end mb-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#39FF14] font-bold uppercase tracking-widest">{title}</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-5xl font-black text-white tracking-tighter">{value.replace('.', ',')}</span>
              <span className="text-xl text-zinc-600 font-bold">m</span>
            </div>
          </div>
        </div>

        {/* Numpad Grid */}
        <div className="grid grid-cols-3 gap-3">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(num)}
              className="h-16 flex items-center justify-center text-2xl font-bold bg-zinc-900/50 border border-zinc-800 rounded-[20px] active:bg-white active:text-black active:scale-95 transition-all"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleNumber(',')}
            className="h-16 flex items-center justify-center text-3xl font-black bg-zinc-900/50 border border-zinc-800 rounded-[20px] active:bg-[#39FF14] active:text-black active:scale-95 transition-all text-[#39FF14]"
          >
            ,
          </button>
          <button
            onClick={() => handleNumber('0')}
            className="h-16 flex items-center justify-center text-2xl font-bold bg-zinc-900/50 border border-zinc-800 rounded-[20px] active:bg-white active:text-black active:scale-95 transition-all"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="h-16 flex items-center justify-center bg-zinc-900/30 border border-zinc-900 text-zinc-500 rounded-[20px] active:text-red-500 active:scale-95 transition-all"
          >
            <Delete size={24} />
          </button>
        </div>

        <button 
          onClick={onClose}
          className="mt-6 w-full h-16 bg-[#39FF14] text-black rounded-[20px] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-[0_0_20px_rgba(57,255,20,0.2)]"
        >
          <span className="font-black uppercase tracking-widest text-sm">Confirmar</span>
          <Check strokeWidth={3} size={20} />
        </button>
      </div>
    </>
  );
}
