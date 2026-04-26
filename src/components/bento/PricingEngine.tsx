'use client';

import React, { useState } from 'react';
import { calculateFinalPrice, PriceItem } from '@/lib/engine/pricing';

/**
 * PricingEngine Component (Bento Grid Style)
 * UI Pure OLED Black (#000000) & Electric Green (#39FF14)
 * Bordes +30px para uso táctil.
 */

interface PricingEngineProps {
  item: PriceItem;
  globalMultiplier: number;
  onUpdateManualPrice: (newPrice: number | null) => void;
  onUpdateMultiplier: (newMultiplier: number) => void;
}

export function PricingEngine({ item, globalMultiplier, onUpdateManualPrice, onUpdateMultiplier }: PricingEngineProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localPrice, setLocalPrice] = useState<string>(item.price_manual_wilson?.toString() || '');
  
  const finalPrice = calculateFinalPrice(item, globalMultiplier);
  const isOverrideActive = item.price_manual_wilson !== null && item.price_manual_wilson !== undefined;

  const handleSavePrice = () => {
    const val = parseFloat(localPrice);
    onUpdateManualPrice(isNaN(val) ? null : val);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-[#000000] border border-gray-800 rounded-[30px] shadow-2xl text-white font-sans max-w-sm mx-auto">
      {/* Header Info */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold tracking-tight leading-tight">{item.name}</h3>
          <p className="text-xs text-gray-500 mt-1">Ref BCCM: {item.price_official_bccm.toFixed(2)} €</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isOverrideActive ? 'bg-[#39FF14]/20 text-[#39FF14]' : 'bg-gray-800 text-gray-400'}`}>
          {isOverrideActive ? 'WILSON' : 'BCCM'}
        </div>
      </div>

      {/* Price Edit Section */}
      <div className="bg-gray-900 rounded-[24px] p-5 flex flex-col gap-3">
        <label className="text-xs text-gray-400 font-medium uppercase tracking-widest">Precio Manual (€)</label>
        {isEditing ? (
          <div className="flex gap-2">
            <input 
              type="number" 
              value={localPrice}
              onChange={(e) => setLocalPrice(e.target.value)}
              className="flex-1 bg-black border border-[#39FF14] text-[#39FF14] rounded-[16px] px-4 py-3 text-lg font-bold focus:outline-none"
              placeholder={item.price_official_bccm.toString()}
              autoFocus
            />
            <button 
              onClick={handleSavePrice}
              className="bg-[#39FF14] text-black font-black px-6 py-3 rounded-[16px] active:scale-95 transition-transform"
            >
              OK
            </button>
          </div>
        ) : (
          <div 
            onClick={() => setIsEditing(true)}
            className="text-3xl font-black text-[#39FF14] cursor-pointer"
          >
            {isOverrideActive ? `${item.price_manual_wilson!.toFixed(2)} €` : 'Añadir...'}
          </div>
        )}
      </div>

      {/* Global Multiplier Adjuster */}
      <div className="bg-gray-900 rounded-[24px] p-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Coef. Global</p>
          <p className="text-xl font-bold text-white mt-1">x {globalMultiplier.toFixed(2)}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onUpdateMultiplier(Math.max(0.1, globalMultiplier - 0.05))}
            className="w-12 h-12 flex items-center justify-center bg-black border border-gray-700 text-white rounded-[16px] text-2xl font-medium active:scale-90 transition-transform"
          >
            -
          </button>
          <button 
            onClick={() => onUpdateMultiplier(globalMultiplier + 0.05)}
            className="w-12 h-12 flex items-center justify-center bg-black border border-gray-700 text-[#39FF14] rounded-[16px] text-2xl font-medium active:scale-90 transition-transform"
          >
            +
          </button>
        </div>
      </div>

      {/* Total Result */}
      <div className="mt-4 text-right">
        <p className="text-xs text-gray-500 uppercase tracking-widest">Precio Final Calculado</p>
        <p className="text-5xl font-black text-white mt-1">{finalPrice.toFixed(2)} €</p>
      </div>
    </div>
  );
}
