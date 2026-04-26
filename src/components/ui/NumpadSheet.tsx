'use client';

import React from 'react';
import { Delete, Check, X } from 'lucide-react';

interface NumpadSheetProps {
  isOpen: boolean;
  title: string;
  value: string;
  onClose: () => void;
  onChange: (value: string) => void;
}

export function NumpadSheet({ isOpen, title, value, onClose, onChange }: NumpadSheetProps) {
  if (!isOpen) return null;

  const handleNumber = (num: string) => {
    let newValue = value;
    if (value === '0' && num !== ',') {
      newValue = num;
    } else {
      if (num === ',') {
        if (!value.includes('.')) {
          newValue = value + '.';
        }
      } else {
        const parts = value.split('.');
        if (parts[1] && parts[1].length >= 2) return;
        newValue = value + num;
      }
    }
    onChange(newValue);
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
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1c1e] border-t border-zinc-800 rounded-t-[32px] p-8 pb-14 z-50 animate-in slide-in-from-bottom-full duration-500">
        
        <div className="flex justify-between items-end mb-10">
          <div className="flex flex-col">
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest ml-1">{title}</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-7xl font-black text-white tracking-tighter">{value.replace('.', ',')}</span>
              <span className="text-xl text-zinc-500 font-bold uppercase tracking-widest">m</span>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-zinc-800 rounded-full text-zinc-500 mb-2">
            <X size={20} />
          </button>
        </div>

        {/* Numpad Grid */}
        <div className="grid grid-cols-3 gap-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(num)}
              className="h-20 flex items-center justify-center text-4xl font-bold bg-[#2d3036] rounded-[24px] active:bg-primary active:text-black active:scale-95 transition-all text-zinc-200"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleNumber(',')}
            className="h-20 flex items-center justify-center text-5xl font-black bg-[#2d3036] rounded-[24px] active:bg-primary active:text-black active:scale-95 transition-all text-zinc-600"
          >
            ,
          </button>
          <button
            onClick={() => handleNumber('0')}
            className="h-20 flex items-center justify-center text-4xl font-bold bg-[#2d3036] rounded-[24px] active:bg-primary active:text-black active:scale-95 transition-all text-zinc-200"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="h-20 flex items-center justify-center bg-zinc-800 text-zinc-600 rounded-[24px] active:text-red-400 active:scale-95 transition-all"
          >
            <Delete size={32} />
          </button>
        </div>

        <button 
          onClick={onClose}
          className="mt-10 w-full h-20 fab-google flex items-center justify-center gap-4 active:scale-95 transition-all"
        >
          <span className="font-bold uppercase tracking-widest text-sm">Confirmar</span>
          <Check strokeWidth={4} size={28} />
        </button>
      </div>
    </>
  );
}
